<?php
/* IfaLMS ⇄ server bridge (JSON). IfaLMS (/ifa-lms/) calls this for sign-in,
   student accounts, enrolments, IGA scores and course progress.
   GET  lms.php?a=state
   POST lms.php?a=login|logout|password|progress|save_users|save_progress|import   (JSON body, X-IFA-CSRF header) */
declare(strict_types=1);
require __DIR__ . '/lib.php';

no_cache();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function out(array $data, int $code = 200): never {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}
function fail(string $msg, int $code = 400): never { out(['ok' => false, 'error' => $msg], $code); }

try { lms_schema(); }
catch (PDOException $e) { fail('The IFA Academy database isn’t set up yet. Please contact your instructor.', 503); }

$a = (string)($_GET['a'] ?? 'state');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$in = [];
if ($method === 'POST') {
  $c = $_COOKIE[CSRF_COOKIE] ?? ''; $hdr = $_SERVER['HTTP_X_IFA_CSRF'] ?? '';
  if (!$c || !$hdr || !hash_equals($c, $hdr)) fail('Your session expired. Please reload the page.', 400);
  $raw = file_get_contents('php://input', false, null, 0, 2_000_000);
  $in = json_decode((string)$raw, true);
  if (!is_array($in)) $in = [];
} elseif ($a !== 'state') fail('Use POST.', 405);

/* ── Shapes ───────────────────────────────────────────────────────── */
function lms_data(int $id): array {
  $r = q('SELECT data FROM ifa_lms WHERE user_id = ?', [$id])->fetchColumn();
  $d = $r ? json_decode((string)$r, true) : null;
  return is_array($d) ? $d : [];
}
function save_data(int $id, array $d): void {
  $json = json_encode($d, JSON_UNESCAPED_UNICODE);
  if (strlen($json) > 1_000_000) throw new RuntimeException('That’s too much data for one student.');
  if (q('SELECT 1 FROM ifa_lms WHERE user_id = ?', [$id])->fetchColumn()) q('UPDATE ifa_lms SET data = ?, updated_at = ? WHERE user_id = ?', [$json, now(), $id]);
  else q('INSERT INTO ifa_lms (user_id, data, updated_at) VALUES (?,?,?)', [$id, $json, now()]);
}
function lms_user(array $r, array $d): array {
  return [
    'id' => 's' . $r['id'],
    'username' => $r['username'],
    'name' => $r['name'] ?: $r['username'],
    'role' => $r['role'] === 'admin' ? 'admin' : 'student',
    'premium' => $r['role'] === 'premium',
    'status' => $r['status'] === 'approved' ? 'approved' : 'pending',
    'suspended' => $r['status'] === 'suspended',
    'program' => $r['role'] === 'admin' ? null : $r['program'],
    'joinDate' => (string)($d['joinDate'] ?? substr((string)$r['created_at'], 0, 10)),
    'enrolled' => array_values(array_filter((array)($d['enrolled'] ?? []), 'is_string')),
    'igaScores' => (object)(is_array($d['igaScores'] ?? null) ? $d['igaScores'] : []),
    'hasPassword' => !empty($r['password_hash']),
  ];
}
function state(?array $u = null): array {
  $u = $u ?? current_user();
  if (!$u || $u['status'] === 'suspended') return ['ok' => true, 'signedIn' => false, 'csrf' => csrf_token()];
  $rows = $u['role'] === 'admin'
    ? q('SELECT u.*, l.data AS lms FROM ifa_users u LEFT JOIN ifa_lms l ON l.user_id = u.id ORDER BY u.id')->fetchAll()
    : q('SELECT u.*, l.data AS lms FROM ifa_users u LEFT JOIN ifa_lms l ON l.user_id = u.id WHERE u.id = ?', [$u['id']])->fetchAll();
  $users = []; $progress = [];
  foreach ($rows as $r) {
    $d = $r['lms'] ? (json_decode((string)$r['lms'], true) ?: []) : [];
    $users[] = lms_user($r, $d);
    if (!empty($d['progress']) && is_array($d['progress'])) $progress['s' . $r['id']] = $d['progress'];
  }
  $me = lms_user($u, lms_data((int)$u['id'])) + ['mustChange' => must_change($u)];
  return ['ok' => true, 'signedIn' => true, 'csrf' => csrf_token(), 'me' => $me, 'users' => $users, 'progress' => (object)$progress];
}
function me_or_401(): array {
  $u = current_user();
  if (!$u || $u['status'] === 'suspended') fail('Please sign in again.', 401);
  return $u;
}
function admin_or_403(): array {
  $u = me_or_401();
  if ($u['role'] !== 'admin' || $u['status'] !== 'approved') fail('Admins only.', 403);
  return $u;
}
function sid(mixed $id): int { return preg_match('/^s(\d+)$/', (string)$id, $m) ? (int)$m[1] : 0; }
function clean_iga(mixed $x): array {
  $o = [];
  if (is_array($x)) foreach ($x as $k => $v) if (is_string($k) && strlen($k) <= 40 && is_numeric($v)) $o[$k] = max(0, min(100, (float)$v));
  return $o;
}
function clean_ids(mixed $x): array {
  $o = [];
  if (is_array($x)) foreach ($x as $v) if (is_string($v) && preg_match('/^[A-Za-z0-9_-]{1,40}$/', $v)) $o[] = $v;
  return array_values(array_unique($o));
}
function clean_progress(mixed $p): array {
  if (!is_array($p)) return [];
  $mats = [];
  foreach ((array)($p['completedMaterials'] ?? []) as $k => $v) if (is_string($k) && strlen($k) <= 60 && $v) $mats[$k] = true;
  $p['completedMaterials'] = (object)$mats;
  return $p;
}
function check_username(string $u, int $exceptId = 0): string {
  $n = norm_username($u);
  if (!valid_username($n)) throw new RuntimeException("“{$u}” can’t be used as a username (2–32 letters, numbers, . - _).");
  if (q('SELECT 1 FROM ifa_users WHERE username = ? AND id <> ?', [$n, $exceptId])->fetchColumn()) throw new RuntimeException("The username “{$n}” is already taken.");
  return $n;
}

/* ── Actions ──────────────────────────────────────────────────────── */
switch ($a) {

case 'state':
  out(state());

case 'login': {
  $typed = (string)($in['username'] ?? ''); $password = (string)($in['password'] ?? '');
  $username = norm_username($typed);
  if (too_many_attempts($username)) fail('Too many sign-in attempts. Please wait 15 minutes and try again.', 429);
  $row = $username !== '' ? q('SELECT * FROM ifa_users WHERE username = ?', [$username])->fetch() : false;
  $hash = $row['password_hash'] ?? null;
  $ok = password_verify($password, $hash ?: '$2y$10$2HKQi/7Fs55DfNkE7ZdE5.dPxfuqalZctHvSAkdRo.7sbOi3snP.u');
  if (!$row || !$hash || !$ok) { record_failure($username); fail('Invalid username or password.', 401); }
  if ($row['status'] === 'suspended') fail('This account is suspended. Please contact your IFA Academy instructor.', 403);
  clear_failures($username);
  if (password_needs_rehash($hash, PASSWORD_DEFAULT)) q('UPDATE ifa_users SET password_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $row['id']]);
  end_session();
  start_session((int)$row['id']);
  out(state($row));   // current_user() is cached for this request, so pass the new user in
}

case 'logout':
  end_session();
  out(['ok' => true, 'signedIn' => false, 'csrf' => csrf_token()]);

case 'password': {
  $u = me_or_401();
  $cur = (string)($in['current'] ?? ''); $new = (string)($in['new'] ?? '');
  if (!password_verify($cur, (string)$u['password_hash'])) fail('Your current password is incorrect.');
  if ($pp = password_problem($new)) fail($pp);
  if (password_verify($new, (string)$u['password_hash'])) fail('Choose a password that’s different from your old one.');
  q('UPDATE ifa_users SET password_hash = ?, must_change = 0 WHERE id = ?', [password_hash($new, PASSWORD_DEFAULT), $u['id']]);
  q('DELETE FROM ifa_sessions WHERE user_id = ? AND id <> ?', [$u['id'], $u['session_id']]);
  $u['must_change'] = 0; $u['password_hash'] = 'x';
  out(state($u));
}

case 'progress': {   // a student saving their own course progress
  $u = me_or_401();
  if ($u['status'] !== 'approved') fail('Your account isn’t approved yet.', 403);
  $d = lms_data((int)$u['id']);
  $d['progress'] = clean_progress($in['progress'] ?? []);
  save_data((int)$u['id'], $d);
  out(['ok' => true]);
}

case 'save_users': {
  $me = admin_or_403(); $errors = [];
  foreach ((array)($in['remove'] ?? []) as $rid) {
    $id = sid($rid);
    if (!$id) continue;
    if ($id === (int)$me['id']) { $errors[] = 'You can’t remove your own account.'; continue; }
    q("DELETE FROM ifa_users WHERE id = ? AND role <> 'admin'", [$id]);
  }
  foreach ((array)($in['upsert'] ?? []) as $x) {
    if (!is_array($x)) continue;
    $label = (string)($x['name'] ?? $x['username'] ?? '?');
    try {
      $id = sid($x['id'] ?? '');
      $row = $id ? q('SELECT * FROM ifa_users WHERE id = ?', [$id])->fetch() : false;
      $name = trim(mb_substr((string)($x['name'] ?? ''), 0, 120));
      $program = in_array($x['program'] ?? '', PROGRAMS, true) ? $x['program'] : 'adults';
      $pw = trim((string)($x['password'] ?? ''));
      if ($pw !== '' && ($pp = password_problem($pw))) throw new RuntimeException("Password for {$label}: {$pp}");
      if ($row && $row['role'] === 'admin') {   // admins are managed on the admin page, only the name here
        if ($name !== '') q('UPDATE ifa_users SET name = ? WHERE id = ?', [$name, $id]);
        continue;
      }
      $status = ($x['status'] ?? '') === 'approved' ? 'approved' : 'pending';
      if ($row) {
        if ($status === 'pending' && $row['status'] === 'suspended') $status = 'suspended';
        $uname = check_username((string)($x['username'] ?? $row['username']), $id);
        q('UPDATE ifa_users SET name = ?, username = ?, program = ?, status = ? WHERE id = ?', [$name ?: $uname, $uname, $program, $status, $id]);
        if ($status !== 'approved' && $row['status'] === 'approved') end_all_sessions($id);
        if ($pw !== '') { q('UPDATE ifa_users SET password_hash = ?, must_change = 1 WHERE id = ?', [password_hash($pw, PASSWORD_DEFAULT), $id]); end_all_sessions($id); }
      } else {
        $uname = check_username((string)($x['username'] ?? ''));
        q('INSERT INTO ifa_users (username, name, email, password_hash, role, status, program, created_at, must_change) VALUES (?,?,?,?,?,?,?,?,?)',
          [$uname, $name ?: $uname, null, $pw !== '' ? password_hash($pw, PASSWORD_DEFAULT) : null, 'student', $status, $program, now(), $pw !== '' ? 1 : 0]);
        $id = (int)db()->lastInsertId();
      }
      $d = lms_data($id);
      if (array_key_exists('enrolled', $x)) $d['enrolled'] = clean_ids($x['enrolled']);
      if (array_key_exists('igaScores', $x)) $d['igaScores'] = clean_iga($x['igaScores']);
      if (!empty($x['joinDate']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)$x['joinDate'])) $d['joinDate'] = $x['joinDate'];
      save_data($id, $d);
    } catch (RuntimeException $e) { $errors[] = $e->getMessage(); }
  }
  out(['errors' => $errors] + state());
}

case 'save_progress': {
  admin_or_403();
  foreach ((array)($in['progress'] ?? []) as $rid => $p) {
    $id = sid($rid);
    if (!$id || !q('SELECT 1 FROM ifa_users WHERE id = ?', [$id])->fetchColumn()) continue;
    $d = lms_data($id);
    $d['progress'] = $p ? clean_progress($p) : (object)[];
    if (!$p) unset($d['igaScores']);   // "reset progress" in IfaLMS also clears the IGA trackers
    save_data($id, $d);
  }
  out(state());
}

case 'import': {   // one-time move of the accounts kept in the admin's browser (localStorage ifaLMS_v2)
  admin_or_403();
  $users = (array)($in['users'] ?? []); $prog = (array)($in['progress'] ?? []);
  $report = ['created' => [], 'updated' => [], 'skipped' => [], 'errors' => []];
  foreach ($users as $x) {
    if (!is_array($x) || ($x['role'] ?? '') !== 'student') continue;
    $typed = (string)($x['username'] ?? ''); $uname = norm_username($typed); $name = trim(mb_substr((string)($x['name'] ?? ''), 0, 120));
    if ($uname === 'guest') { $report['skipped'][] = "{$typed} (shared guest login)"; continue; }
    if (!valid_username($uname)) { $report['errors'][] = "“{$typed}”: can’t be used as a username"; continue; }
    $pw = (string)($x['password'] ?? '');
    $program = in_array($x['program'] ?? '', PROGRAMS, true) ? $x['program'] : 'adults';
    $status = ($x['status'] ?? '') === 'approved' ? 'approved' : 'pending';
    $row = q('SELECT * FROM ifa_users WHERE username = ?', [$uname])->fetch();
    if ($row && $row['role'] === 'admin') { $report['skipped'][] = "{$typed} (an admin has that username)"; continue; }
    if ($row) {
      $id = (int)$row['id'];
      if (!$row['password_hash'] && $pw !== '') q('UPDATE ifa_users SET password_hash = ?, must_change = 1 WHERE id = ?', [password_hash($pw, PASSWORD_DEFAULT), $id]);
      $report['updated'][] = $uname;
    } else {
      q('INSERT INTO ifa_users (username, name, email, password_hash, role, status, program, created_at, must_change) VALUES (?,?,?,?,?,?,?,?,?)',
        [$uname, $name ?: $uname, null, $pw !== '' ? password_hash($pw, PASSWORD_DEFAULT) : null, 'student', $status, $program, now(), $pw !== '' ? 1 : 0]);
      $id = (int)db()->lastInsertId();
      $report['created'][] = $uname;
    }
    $d = lms_data($id);
    $d['enrolled'] = array_values(array_unique(array_merge((array)($d['enrolled'] ?? []), clean_ids($x['enrolled'] ?? []))));
    $d['igaScores'] = clean_iga($x['igaScores'] ?? []) + clean_iga($d['igaScores'] ?? []);
    if (empty($d['joinDate']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)($x['joinDate'] ?? ''))) $d['joinDate'] = $x['joinDate'];
    $old = clean_progress($prog[(string)($x['id'] ?? '')] ?? []);
    $cur = clean_progress($d['progress'] ?? []);
    $d['progress'] = ['completedMaterials' => (object)((array)$cur['completedMaterials'] + (array)$old['completedMaterials'])];
    save_data($id, $d);
  }
  out(['report' => $report] + state());
}

default:
  fail('Unknown action.', 404);
}
