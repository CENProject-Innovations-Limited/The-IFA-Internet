<?php
/* IFA Academy sign-in — shared code. Not a page: included by the other files. */
declare(strict_types=1);

if (!is_file(__DIR__ . '/config.php')) {
  http_response_code(503);
  header('Content-Type: text/html; charset=utf-8');
  echo '<!doctype html><meta charset="utf-8"><title>Setup needed</title><body style="font-family:system-ui;background:#04070f;color:#ecf0fa;padding:40px"><h1>Setup needed</h1><p>Copy <code>config.sample.php</code> to <code>config.php</code> in the <code>ifa-auth</code> folder and fill in your database details, then open <code>install.php</code>.</p>';
  exit;
}
require __DIR__ . '/config.php';

const ROLES = ['student', 'premium', 'admin'];
const STATUSES = ['pending', 'approved', 'suspended'];
const PROGRAMS = ['adults', 'kids', 'professionals'];
const COOKIE = 'ifa_auth';
const CSRF_COOKIE = 'ifa_csrf';
const MAX_FAILS_USER = 8;   // per username in 15 minutes
const MAX_FAILS_IP = 25;    // per IP address in 15 minutes

/* ── Database ─────────────────────────────────────────────────────── */
function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;
  $pdo = new PDO(DB_DSN, DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);
  if (is_sqlite()) $pdo->exec('PRAGMA foreign_keys = ON');
  return $pdo;
}
function is_sqlite(): bool { return str_starts_with(DB_DSN, 'sqlite:'); }
function q(string $sql, array $args = []): PDOStatement { $st = db()->prepare($sql); $st->execute($args); return $st; }
function now(): string { return gmdate('Y-m-d H:i:s'); }
function later(int $seconds): string { return gmdate('Y-m-d H:i:s', time() + $seconds); }

/* ── Helpers ──────────────────────────────────────────────────────── */
function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function is_https(): bool { return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https') || str_starts_with(SITE_URL, 'https://'); }
function client_ip(): string { return substr($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0', 0, 45); }
function token(): string { return bin2hex(random_bytes(32)); }
function thash(string $t): string { return hash('sha256', $t); }
function set_cookie(string $name, string $value, int $expires): void {
  setcookie($name, $value, ['expires' => $expires, 'path' => '/', 'secure' => is_https(), 'httponly' => true, 'samesite' => 'Lax']);
}
function no_cache(): void {
  header('Cache-Control: private, no-store, max-age=0');
  header('Pragma: no-cache');
  header('X-LiteSpeed-Cache-Control: no-cache');
}
function redirect(string $to): never { no_cache(); header('Location: ' . $to, true, 302); exit; }
function auth_url(string $page, array $params = []): string { return AUTH_PATH . '/' . $page . ($params ? '?' . http_build_query($params) : ''); }
/* Only allow returning to a path on this site (never another domain). */
function safe_next(?string $next): string {
  $next = (string)$next;
  if ($next === '' || $next[0] !== '/' || str_starts_with($next, '//') || str_contains($next, '\\') || preg_match('/[\r\n]/', $next)) return '/';
  return $next;
}

/* ── CSRF (double-submit cookie) ──────────────────────────────────── */
function csrf_token(): string {
  static $t = null; if ($t) return $t;
  $t = $_COOKIE[CSRF_COOKIE] ?? '';
  if (!preg_match('/^[a-f0-9]{64}$/', $t)) { $t = token(); set_cookie(CSRF_COOKIE, $t, 0); }
  return $t;
}
function csrf_field(): string { return '<input type="hidden" name="csrf" value="' . h(csrf_token()) . '">'; }
function csrf_check(): void {
  $c = $_COOKIE[CSRF_COOKIE] ?? ''; $f = $_POST['csrf'] ?? '';
  if (!$c || !$f || !hash_equals($c, $f)) { http_response_code(400); page('Please try again', '<div class="card"><h1>Please try again</h1><p class="muted">Your form expired. Go back, reload the page and submit it again.</p></div>'); exit; }
}

/* ── Sessions (stored in the database, so suspension takes effect at once) ── */
function current_user(): ?array {
  static $user = false;
  if ($user !== false) return $user;
  $user = null;
  $t = $_COOKIE[COOKIE] ?? '';
  if (!preg_match('/^[a-f0-9]{64}$/', $t)) return null;
  try {
    $row = q('SELECT u.*, s.id AS session_id FROM ifa_sessions s JOIN ifa_users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?', [thash($t), now()])->fetch();
  } catch (PDOException $e) { return null; }   // tables not created yet (during install)
  if (!$row) return null;
  $user = $row;
  return $user;
}
function start_session(int $userId): void {
  $t = token();
  q('INSERT INTO ifa_sessions (token_hash, user_id, created_at, expires_at, ip, user_agent) VALUES (?,?,?,?,?,?)',
    [thash($t), $userId, now(), later(SESSION_DAYS * 86400), client_ip(), substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 250)]);
  q('UPDATE ifa_users SET last_login_at = ? WHERE id = ?', [now(), $userId]);
  set_cookie(COOKIE, $t, time() + SESSION_DAYS * 86400);
  if (random_int(1, 20) === 1) q('DELETE FROM ifa_sessions WHERE expires_at < ?', [now()]);
}
function end_session(): void {
  $t = $_COOKIE[COOKIE] ?? '';
  if ($t) q('DELETE FROM ifa_sessions WHERE token_hash = ?', [thash($t)]);
  set_cookie(COOKIE, '', time() - 3600);
}
function end_all_sessions(int $userId): void { q('DELETE FROM ifa_sessions WHERE user_id = ?', [$userId]); }
function require_admin(): array {
  $u = current_user();
  if (!$u) redirect(auth_url('login.php', ['next' => AUTH_PATH . '/admin.php']));
  if ($u['role'] !== 'admin' || $u['status'] !== 'approved') { http_response_code(403); page('Admins only', '<div class="card"><h1>Admins only</h1><p class="muted">This page is for IFA Academy administrators.</p><p><a class="btn" href="/">Go to the IFA Internet</a></p></div>'); exit; }
  return $u;
}

/* ── Sign-in throttling ───────────────────────────────────────────── */
function too_many_attempts(string $username): bool {
  $since = gmdate('Y-m-d H:i:s', time() - 900);
  $u = (int)q('SELECT COUNT(*) FROM ifa_login_attempts WHERE username = ? AND attempted_at > ?', [strtolower($username), $since])->fetchColumn();
  $i = (int)q('SELECT COUNT(*) FROM ifa_login_attempts WHERE ip = ? AND attempted_at > ?', [client_ip(), $since])->fetchColumn();
  return $u >= MAX_FAILS_USER || $i >= MAX_FAILS_IP;
}
function record_failure(string $username): void {
  q('INSERT INTO ifa_login_attempts (username, ip, attempted_at) VALUES (?,?,?)', [strtolower($username), client_ip(), now()]);
  if (random_int(1, 20) === 1) q('DELETE FROM ifa_login_attempts WHERE attempted_at < ?', [gmdate('Y-m-d H:i:s', time() - 86400)]);
}
function clear_failures(string $username): void { q('DELETE FROM ifa_login_attempts WHERE username = ?', [strtolower($username)]); }

/* ── One-time links (invite & reset) ──────────────────────────────── */
function make_link(int $userId, string $purpose, int $seconds): string {
  q('UPDATE ifa_tokens SET used_at = ? WHERE user_id = ? AND used_at IS NULL', [now(), $userId]);
  $t = token();
  q('INSERT INTO ifa_tokens (token_hash, user_id, purpose, created_at, expires_at) VALUES (?,?,?,?,?)', [thash($t), $userId, $purpose, now(), later($seconds)]);
  return SITE_URL . auth_url('set-password.php', ['t' => $t]);
}
function find_link(string $t): ?array {
  if (!preg_match('/^[a-f0-9]{64}$/', $t)) return null;
  $r = q('SELECT t.*, u.username, u.name FROM ifa_tokens t JOIN ifa_users u ON u.id = t.user_id WHERE t.token_hash = ? AND t.used_at IS NULL AND t.expires_at > ?', [thash($t), now()])->fetch();
  return $r ?: null;
}

/* ── Access rules ─────────────────────────────────────────────────── */
function area_for(string $path): ?array {
  foreach (PROTECTED_AREAS as $prefix => $area) {
    if (str_starts_with($path, $prefix) || $path === rtrim($prefix, '/')) return $area + ['prefix' => $prefix];
  }
  return null;
}
function can_enter(?array $u, array $area): bool { return $u && $u['status'] === 'approved' && !must_change($u) && in_array($u['role'], $area['roles'], true); }
function valid_username(string $u): bool { return (bool)preg_match('/^[a-z0-9][a-z0-9._-]{1,31}$/', $u); }
/* "Taiwo A." → "taiwo.a" — the same rule IfaLMS usernames were converted with. */
function norm_username(string $u): string {
  $u = strtolower(trim($u));
  $u = preg_replace('/[^a-z0-9._-]+/', '.', $u);
  return trim((string)$u, '._-');
}
/* Must the user choose a new password before going anywhere? (old shared IfaLMS passwords) */
function must_change(?array $u): bool { return $u && !empty($u['must_change']); }

/* Tables added for IfaLMS (phase 2). Safe to run many times. */
function lms_schema(): void {
  static $done = false; if ($done) return; $done = true;
  $tail = is_sqlite() ? '' : ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci';
  $fk = is_sqlite() ? 'INTEGER NOT NULL' : 'INT UNSIGNED NOT NULL';
  db()->exec("CREATE TABLE IF NOT EXISTS ifa_lms (
    user_id $fk PRIMARY KEY,
    data MEDIUMTEXT NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ifa_users(id) ON DELETE CASCADE
  )$tail");
  try { db()->query('SELECT must_change FROM ifa_users LIMIT 1'); }
  catch (PDOException $e) { db()->exec('ALTER TABLE ifa_users ADD must_change TINYINT NOT NULL DEFAULT 0'); }
}
function password_problem(string $p): ?string {
  if (strlen($p) < 8) return 'Use at least 8 characters.';
  if (strlen($p) > 200) return 'That password is too long.';
  if (!preg_match('/[A-Za-z]/', $p) || !preg_match('/[0-9]/', $p)) return 'Use both letters and numbers.';
  return null;
}

/* ── Page shell ───────────────────────────────────────────────────── */
function page(string $title, string $body, bool $wide = false): void {
  no_cache();
  header('Content-Type: text/html; charset=utf-8');
  header('X-Frame-Options: DENY');
  header('Referrer-Policy: same-origin');
  header('X-Content-Type-Options: nosniff');
  $u = current_user();
  $who = $u ? '<span class="who">Signed in as <b>' . h($u['name'] ?: $u['username']) . '</b> · <a href="' . h(auth_url('account.php')) . '">Account</a>' . ($u['role'] === 'admin' ? ' · <a href="' . h(auth_url('admin.php')) . '">Admin</a>' : '') . ' · <a href="' . h(auth_url('logout.php')) . '">Log out</a></span>' : '';
  echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex">',
       '<title>', h($title), ' · ', h(ACADEMY), '</title>',
       '<link rel="icon" href="/src/assets/itoe_favicon.png">',
       '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
       '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap">',
       '<style>', STYLE, '</style></head><body><div class="ground" aria-hidden="true"></div>',
       '<header class="top"><a class="brand" href="/"><img src="/src/assets/itoe_logo.png" alt="The IFA Internet" height="28" onerror="this.remove()"><span>', h(ACADEMY), '</span></a>', $who, '</header>',
       '<main class="', $wide ? 'wide' : 'narrow', '">', $body, '</main></body></html>';
}
const STYLE = <<<'CSS'
:root{--void:#04070f;--panel:#0b1226;--line:rgba(150,170,230,.14);--line2:rgba(150,170,230,.28);--text:#ecf0fa;--text2:#aab4cd;--text3:#6e7997;--gold:#f5c518;--red:#e03050;--orange:#f0920c;--jade:#00c87c;color-scheme:dark}
*{box-sizing:border-box}html{background:var(--void)}body{margin:0;background:var(--void);color:var(--text);font-family:"IBM Plex Sans",system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
.ground{position:fixed;inset:0;z-index:-1;background:radial-gradient(50rem 30rem at 85% -10%,rgba(240,146,12,.1),transparent 60%),linear-gradient(rgba(150,170,230,.05) 1px,transparent 1px) 0 0/24px 24px,linear-gradient(90deg,rgba(150,170,230,.05) 1px,transparent 1px) 0 0/24px 24px,var(--void)}
a{color:var(--gold)}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px max(20px,env(safe-area-inset-right,0px)) 14px max(20px,env(safe-area-inset-left,0px));border-bottom:1px solid var(--line);background:rgba(4,7,15,.8)}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text);font-weight:600;font-size:.92rem}
.who{font-size:.86rem;color:var(--text2)}.who b{color:var(--text)}
main{margin:0 auto;padding:clamp(28px,6vw,64px) max(20px,env(safe-area-inset-right,0px)) 60px max(20px,env(safe-area-inset-left,0px))}
main.narrow{max-width:520px}main.wide{max-width:1180px}
.card{position:relative;background:var(--panel);border:1px solid var(--line2);border-radius:20px;padding:30px 28px;box-shadow:0 30px 80px -30px rgba(0,0,0,.8)}
.card::before{content:"";position:absolute;left:26px;right:26px;top:-1px;height:3px;border-radius:0 0 3px 3px;background:linear-gradient(90deg,var(--gold),var(--orange),var(--red))}
.card+.card{margin-top:22px}
h1{margin:0 0 6px;font-family:"Space Grotesk",sans-serif;font-size:1.9rem;line-height:1.15}
h2{margin:0 0 12px;font-family:"Space Grotesk",sans-serif;font-size:1.25rem}
.badge{display:inline-flex;align-items:center;gap:8px;font-family:"IBM Plex Mono",monospace;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);border:1px solid rgba(240,146,12,.45);border-radius:999px;padding:6px 12px;background:rgba(240,146,12,.08);margin-bottom:14px}
.muted{color:var(--text2)}.small{font-size:.86rem}
form{display:flex;flex-direction:column;gap:14px;margin-top:18px}
label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.88rem;color:var(--text2)}
input,select,textarea{width:100%;font:inherit;font-size:1rem;color:#fff;background:rgba(0,0,0,.35);border:1.5px solid var(--line2);border-radius:10px;padding:11px 13px}
textarea{min-height:140px;font-family:"IBM Plex Mono",monospace;font-size:.88rem}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--orange);box-shadow:0 0 0 3px rgba(240,146,12,.25)}
.btn,button{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;font:inherit;font-weight:700;font-size:.96rem;padding:12px 18px;border-radius:10px;border:0;background:var(--gold);color:#1b1300;text-decoration:none}
.btn--ghost,button.ghost{background:rgba(255,255,255,.04);color:var(--text);border:1px solid var(--line2);font-weight:600}
button.small,.btn.small{padding:6px 10px;font-size:.8rem}
button.warn{background:rgba(224,48,80,.14);color:#ffb3ba;border:1px solid rgba(224,48,80,.5)}
.msg{padding:11px 14px;border-radius:10px;font-size:.92rem}
.msg.err{background:rgba(224,48,80,.14);border:1.5px solid rgba(224,48,80,.45);color:#ffb3ba}
.msg.ok{background:rgba(0,200,124,.12);border:1.5px solid rgba(0,200,124,.45);color:#9ff0cf}
.areas{display:flex;flex-direction:column;gap:6px;margin:14px 0 0;padding:0;list-style:none}
.areas li{font-size:.88rem;color:var(--text2);padding:8px 12px;border-radius:9px;border:1px solid var(--line);background:rgba(4,7,15,.5)}
.areas li.here{border-color:rgba(240,146,12,.6);color:var(--text)}
.copy{display:flex;gap:8px;align-items:stretch}.copy input{font-family:"IBM Plex Mono",monospace;font-size:.8rem}
table{width:100%;border-collapse:collapse;font-size:.88rem}
th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-family:"IBM Plex Mono",monospace;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);font-weight:500}
.tbl{overflow-x:auto;border:1px solid var(--line);border-radius:12px}
.pill{display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:.7rem;padding:2px 8px;border-radius:999px;border:1px solid var(--line2)}
.pill.approved{color:var(--jade);border-color:rgba(0,200,124,.5)}.pill.pending{color:var(--orange);border-color:rgba(240,146,12,.5)}.pill.suspended{color:#ff8ea2;border-color:rgba(224,48,80,.5)}
.row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.row form{display:inline;margin:0}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media (max-width:640px){.grid2{grid-template-columns:1fr}}
.inline-form{display:inline-flex;gap:6px;margin:0;flex-direction:row}
.inline-form select{padding:5px 8px;font-size:.8rem;width:auto}
CSS;
