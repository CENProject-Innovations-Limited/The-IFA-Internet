<?php
/* Admin: add students, approve, suspend, change access level, and create sign-in links. */
declare(strict_types=1);
require __DIR__ . '/lib.php';
$me = require_admin();
lms_schema();

const INVITE_SECONDS = 7 * 86400;
const RESET_SECONDS = 2 * 86400;
$notice = ''; $error = ''; $links = [];

function make_username(string $name): string {
  $base = strtolower(preg_replace('/[^a-z0-9]+/i', '.', iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $name) ?: $name));
  $base = trim(preg_replace('/\.+/', '.', $base), '.');
  if (strlen($base) < 3) $base = 'student';
  $base = substr($base, 0, 28); $u = $base; $n = 1;
  while (q('SELECT 1 FROM ifa_users WHERE username = ?', [$u])->fetchColumn()) $u = $base . (++$n);
  return $u;
}
function add_user(string $name, string $username, string $email, string $program, string $role): array {
  $name = trim($name); $username = strtolower(trim($username)); $email = trim($email);
  $program = in_array($program, PROGRAMS, true) ? $program : 'adults';
  $role = in_array($role, ROLES, true) ? $role : 'student';
  if ($name === '' && $username === '') throw new RuntimeException('Each student needs a name or a username.');
  if ($username === '') $username = make_username($name);
  if (!valid_username($username)) throw new RuntimeException("“{$username}” isn’t a valid username (3–32 lowercase letters, numbers, . - _).");
  if (q('SELECT 1 FROM ifa_users WHERE username = ?', [$username])->fetchColumn()) throw new RuntimeException("The username “{$username}” is already taken.");
  if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) throw new RuntimeException("“{$email}” isn’t a valid email address.");
  q('INSERT INTO ifa_users (username, name, email, password_hash, role, status, program, created_at) VALUES (?,?,?,?,?,?,?,?)',
    [$username, $name ?: $username, $email ?: null, null, $role, 'approved', $program, now()]);
  $id = (int)db()->lastInsertId();
  return ['name' => $name ?: $username, 'username' => $username, 'url' => make_link($id, 'invite', INVITE_SECONDS), 'kind' => 'Welcome link (7 days)'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $act = $_POST['act'] ?? '';
  $id = (int)($_POST['id'] ?? 0);
  $target = $id ? q('SELECT * FROM ifa_users WHERE id = ?', [$id])->fetch() : null;
  $self = $target && (int)$target['id'] === (int)$me['id'];
  try {
    if ($act === 'add') {
      $links[] = add_user($_POST['name'] ?? '', $_POST['username'] ?? '', $_POST['email'] ?? '', $_POST['program'] ?? '', $_POST['role'] ?? '');
      $notice = 'Student added. Send them the welcome link below so they can choose a password.';
    } elseif ($act === 'bulk') {
      $lines = preg_split('/\r\n|\r|\n/', (string)($_POST['rows'] ?? '')); $errs = [];
      foreach ($lines as $i => $line) {
        if (trim($line) === '' || str_starts_with(trim($line), '#')) continue;
        $c = array_map('trim', str_getcsv($line));
        try { $links[] = add_user($c[0] ?? '', $c[1] ?? '', $c[2] ?? '', strtolower($c[3] ?? ''), strtolower($c[4] ?? '')); }
        catch (RuntimeException $e) { $errs[] = 'Line ' . ($i + 1) . ': ' . $e->getMessage(); }
      }
      $notice = count($links) . ' student' . (count($links) === 1 ? '' : 's') . ' added.';
      if ($errs) $error = implode("\n", $errs);
    } elseif ($target && $act === 'status' && in_array($_POST['value'] ?? '', STATUSES, true)) {
      if ($self) throw new RuntimeException('You can’t change your own status.');
      q('UPDATE ifa_users SET status = ? WHERE id = ?', [$_POST['value'], $id]);
      if ($_POST['value'] !== 'approved') end_all_sessions($id);
      $notice = $target['username'] . ' is now ' . $_POST['value'] . '.';
    } elseif ($target && $act === 'role' && in_array($_POST['value'] ?? '', ROLES, true)) {
      if ($self) throw new RuntimeException('You can’t change your own access level.');
      q('UPDATE ifa_users SET role = ? WHERE id = ?', [$_POST['value'], $id]);
      $notice = $target['username'] . ' is now ' . $_POST['value'] . '.';
    } elseif ($target && $act === 'program' && in_array($_POST['value'] ?? '', PROGRAMS, true)) {
      q('UPDATE ifa_users SET program = ? WHERE id = ?', [$_POST['value'], $id]);
      $notice = $target['username'] . ' moved to the ' . $_POST['value'] . ' program.';
    } elseif ($target && $act === 'link') {
      $invite = !$target['password_hash'];
      $links[] = ['name' => $target['name'], 'username' => $target['username'], 'url' => make_link($id, $invite ? 'invite' : 'reset', $invite ? INVITE_SECONDS : RESET_SECONDS), 'kind' => $invite ? 'Welcome link (7 days)' : 'Password reset link (48 hours)'];
      $notice = 'New sign-in link created. Any older link for ' . $target['username'] . ' no longer works.';
    } elseif ($target && $act === 'signout') {
      end_all_sessions($id);
      $notice = $target['username'] . ' has been signed out on all devices.';
    } elseif ($target && $act === 'delete') {
      if ($self) throw new RuntimeException('You can’t delete your own account.');
      if (($_POST['confirm'] ?? '') !== $target['username']) throw new RuntimeException('To delete, type the username exactly.');
      q('DELETE FROM ifa_users WHERE id = ?', [$id]);
      $notice = $target['username'] . ' was deleted.';
    }
  } catch (RuntimeException $e) { $error = $e->getMessage(); }
}

$f = trim((string)($_GET['q'] ?? '')); $fs = (string)($_GET['status'] ?? '');
$sql = 'SELECT * FROM ifa_users WHERE 1=1'; $args = [];
if ($f !== '') { $sql .= ' AND (LOWER(name) LIKE ? OR LOWER(username) LIKE ? OR LOWER(COALESCE(email,\'\')) LIKE ?)'; $like = '%' . strtolower($f) . '%'; array_push($args, $like, $like, $like); }
if (in_array($fs, STATUSES, true)) { $sql .= ' AND status = ?'; $args[] = $fs; }
$sql .= " ORDER BY CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END, name";
$users = q($sql, $args)->fetchAll();
$counts = ['all' => 0, 'pending' => 0, 'approved' => 0, 'suspended' => 0];
foreach (q('SELECT status, COUNT(*) c FROM ifa_users GROUP BY status')->fetchAll() as $r) { $counts[$r['status']] = (int)$r['c']; $counts['all'] += (int)$r['c']; }
$noPw = (int)q('SELECT COUNT(*) FROM ifa_users WHERE password_hash IS NULL')->fetchColumn();

$opt = fn(array $list, string $cur) => implode('', array_map(fn($v) => '<option value="' . h($v) . '"' . ($v === $cur ? ' selected' : '') . '>' . h(ucfirst($v)) . '</option>', $list));
$form = fn(string $act, int $id, string $inner, string $cls = 'inline-form') => '<form method="post" class="' . $cls . '">' . csrf_field() . '<input type="hidden" name="act" value="' . $act . '"><input type="hidden" name="id" value="' . $id . '">' . $inner . '</form>';

$body = '<div class="card"><span class="badge">Admin</span><h1>IFA Academy students</h1>'
  . '<p class="muted">' . $counts['all'] . ' accounts · ' . $counts['approved'] . ' approved · ' . $counts['pending'] . ' pending · ' . $counts['suspended'] . ' suspended' . ($noPw ? ' · <b>' . $noPw . ' haven’t set a password yet</b>' : '') . '</p>'
  . ($notice ? '<p class="msg ok">' . h($notice) . '</p>' : '') . ($error ? '<p class="msg err" style="white-space:pre-line">' . h($error) . '</p>' : '');

if ($links) {
  $all = implode("\n", array_map(fn($l) => $l['name'] . ' (username: ' . $l['username'] . '): ' . $l['url'], $links));
  $body .= '<h2 style="margin-top:20px">Sign-in links to send</h2><p class="small muted">Each link works once. Send it privately (email, SMS or WhatsApp). The student opens it and chooses their own password.</p><div class="tbl"><table><thead><tr><th>Student</th><th>Link</th></tr></thead><tbody>';
  foreach ($links as $i => $l) $body .= '<tr><td><b>' . h($l['name']) . '</b><br><span class="small muted">' . h($l['username']) . ' · ' . h($l['kind']) . '</span></td><td><div class="copy"><input id="l' . $i . '" readonly value="' . h($l['url']) . '"><button type="button" class="small ghost" data-copy="l' . $i . '">Copy</button></div></td></tr>';
  $body .= '</tbody></table></div><label style="margin-top:14px">All links as text<textarea id="lall" readonly>' . h($all) . '</textarea></label><button type="button" class="small ghost" data-copy="lall" style="margin-top:8px">Copy all</button>';
}
$body .= '</div>';

$body .= '<div class="card"><h2>Students</h2><form method="get" class="row" style="margin:0 0 14px;flex-direction:row"><input name="q" placeholder="Search name, username or email" value="' . h($f) . '" style="flex:1;min-width:180px"><select name="status" style="width:auto"><option value="">All</option>' . $opt(STATUSES, $fs) . '</select><button type="submit" class="ghost">Filter</button></form>'
  . '<div class="tbl"><table><thead><tr><th>Student</th><th>Status</th><th>Access</th><th>Program</th><th>Last sign-in</th><th>Actions</th></tr></thead><tbody>';
foreach ($users as $x) {
  $id = (int)$x['id']; $self = $id === (int)$me['id'];
  $body .= '<tr><td><b>' . h($x['name']) . '</b>' . ($self ? ' <span class="pill">you</span>' : '') . '<br><span class="small muted">' . h($x['username']) . ($x['email'] ? ' · ' . h($x['email']) : '') . ($x['password_hash'] ? (!empty($x['must_change']) ? ' · <span style="color:var(--orange)">must choose a new password</span>' : '') : ' · <span style="color:var(--orange)">no password yet</span>') . '</span></td>'
    . '<td><span class="pill ' . h($x['status']) . '">' . h($x['status']) . '</span>' . ($self ? '' : '<div class="row" style="margin-top:6px">'
      . ($x['status'] !== 'approved' ? $form('status', $id, '<input type="hidden" name="value" value="approved"><button class="small">Approve</button>') : '')
      . ($x['status'] !== 'suspended' ? $form('status', $id, '<input type="hidden" name="value" value="suspended"><button class="small warn">Suspend</button>') : '') . '</div>') . '</td>'
    . '<td>' . ($self ? h(ucfirst($x['role'])) : $form('role', $id, '<select name="value" onchange="this.form.submit()">' . $opt(ROLES, $x['role']) . '</select><noscript><button class="small ghost">Save</button></noscript>')) . '</td>'
    . '<td>' . $form('program', $id, '<select name="value" onchange="this.form.submit()">' . $opt(PROGRAMS, $x['program']) . '</select><noscript><button class="small ghost">Save</button></noscript>') . '</td>'
    . '<td class="small muted">' . ($x['last_login_at'] ? h(substr($x['last_login_at'], 0, 16)) . ' UTC' : 'Never') . '</td>'
    . '<td><div class="row">' . $form('link', $id, '<button class="small ghost">' . ($x['password_hash'] ? 'Reset link' : 'Welcome link') . '</button>')
      . $form('signout', $id, '<button class="small ghost">Sign out</button>')
      . ($self ? '' : '<details><summary class="small" style="cursor:pointer;color:#ff8ea2">Delete</summary>' . $form('delete', $id, '<input name="confirm" placeholder="type ' . h($x['username']) . '" style="width:140px;padding:5px 8px;font-size:.8rem"><button class="small warn">Delete</button>') . '</details>')
      . '</div></td></tr>';
}
if (!$users) $body .= '<tr><td colspan="6" class="muted">No students match.</td></tr>';
$body .= '</tbody></table></div></div>';

$body .= '<div class="grid2" style="margin-top:22px">'
  . '<div class="card"><h2>Add one student</h2><form method="post">' . csrf_field() . '<input type="hidden" name="act" value="add">'
  . '<label>Full name<input name="name" required></label>'
  . '<label>Username (optional — made from the name if blank)<input name="username" autocapitalize="none"></label>'
  . '<label>Email (optional)<input name="email" type="email"></label>'
  . '<div class="grid2"><label>Program<select name="program">' . $opt(PROGRAMS, 'adults') . '</select></label><label>Access<select name="role">' . $opt(ROLES, 'student') . '</select></label></div>'
  . '<button type="submit">Add student and create welcome link</button></form></div>'
  . '<div class="card"><h2>Add many students</h2><p class="small muted" style="margin:0">One student per line: <b>name, username, email, program, access</b>. Only the name is required. Program is <i>adults</i>, <i>kids</i> or <i>professionals</i>; access is <i>student</i>, <i>premium</i> or <i>admin</i>.</p>'
  . '<form method="post">' . csrf_field() . '<input type="hidden" name="act" value="bulk">'
  . '<textarea name="rows" placeholder="Adewale Okafor, adewale, adewale@example.com, adults&#10;Tayo Adeleke, tayo, , kids&#10;Ngozi Adeyemi"></textarea>'
  . '<button type="submit">Add students and create welcome links</button></form></div></div>';

$body .= '<div class="card"><h2>Protected pages</h2><ul class="areas">';
foreach (PROTECTED_AREAS as $prefix => $a) $body .= '<li><a href="' . h($prefix) . '">' . h($a['name']) . '</a> · <span class="small">' . h(implode(', ', $a['roles'])) . '</span></li>';
$body .= '</ul></div>';
$body .= '<script>document.addEventListener("click",function(e){var b=e.target.closest("[data-copy]");if(!b)return;var el=document.getElementById(b.dataset.copy);var done=function(){b.textContent="Copied";setTimeout(function(){b.textContent=b.dataset.copy==="lall"?"Copy all":"Copy"},1500)};if(navigator.clipboard){navigator.clipboard.writeText(el.value).then(done,function(){el.select();document.execCommand("copy");done()})}else{el.select();document.execCommand("copy");done()}});</script>';
page('Admin', $body, true);
