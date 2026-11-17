<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

$u = current_user();
if (!$u) redirect(auth_url('login.php', ['next' => AUTH_PATH . '/account.php']));
lms_schema();
$next = isset($_GET['next']) || isset($_POST['next']) ? safe_next($_GET['next'] ?? $_POST['next']) : '';
$must = must_change($u);
$msg = ''; $err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $cur = (string)($_POST['current'] ?? ''); $p = (string)($_POST['password'] ?? ''); $p2 = (string)($_POST['password2'] ?? '');
  if (!password_verify($cur, (string)$u['password_hash'])) $err = 'Your current password is incorrect.';
  elseif ($pp = password_problem($p)) $err = $pp;
  elseif ($p !== $p2) $err = 'The two new passwords don’t match.';
  elseif (password_verify($p, (string)$u['password_hash'])) $err = 'Choose a password that’s different from your old one.';
  else {
    q('UPDATE ifa_users SET password_hash = ?, must_change = 0 WHERE id = ?', [password_hash($p, PASSWORD_DEFAULT), $u['id']]);
    q('DELETE FROM ifa_sessions WHERE user_id = ? AND id <> ?', [$u['id'], $u['session_id']]);   // sign out other devices
    if ($next) redirect($next);
    $u['must_change'] = 0; $must = false;
    $msg = 'Password changed. You’ve been signed out on your other devices.';
  }
}
$areas = '';
foreach (PROTECTED_AREAS as $prefix => $a) $areas .= '<li>' . (can_enter($u, $a) ? '<a href="' . h($prefix) . '">' . h($a['name']) . '</a>' : h($a['name']) . ' <span class="pill">no access</span>') . '</li>';
page('Your account', '<div class="card"><span class="badge">Your account</span><h1>' . h($u['name'] ?: $u['username']) . '</h1>'
  . '<p class="muted">Username <b>' . h($u['username']) . '</b> · ' . h(ucfirst($u['role'])) . ' · <span class="pill ' . h($u['status']) . '">' . h($u['status']) . '</span></p>'
  . '<h2 style="margin-top:20px">Your spaces</h2><ul class="areas">' . $areas . '</ul></div>'
  . '<div class="card"><h2>Change password</h2>'
  . ($must ? '<p class="msg err">Please choose a new password to continue. Your old IfaLMS password was shared with the whole class, so it can no longer be used.</p>' : '')
  . ($msg ? '<p class="msg ok">' . h($msg) . '</p>' : '') . ($err ? '<p class="msg err">' . h($err) . '</p>' : '')
  . '<form method="post">' . csrf_field() . ($next ? '<input type="hidden" name="next" value="' . h($next) . '">' : '')
  . '<input type="text" name="username" value="' . h($u['username']) . '" autocomplete="username" hidden>'
  . '<label>Current password<input name="current" type="password" required autocomplete="current-password"></label>'
  . '<label>New password<input name="password" type="password" required autocomplete="new-password"></label>'
  . '<label>Repeat new password<input name="password2" type="password" required autocomplete="new-password"></label>'
  . '<button type="submit">Change password</button></form></div>');
