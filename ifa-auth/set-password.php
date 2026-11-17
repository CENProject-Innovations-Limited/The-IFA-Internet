<?php
/* One-time link from an admin (invite) or from "forgot password" (reset). */
declare(strict_types=1);
require __DIR__ . '/lib.php';

$t = (string)($_GET['t'] ?? $_POST['t'] ?? '');
$link = find_link($t);
if (!$link) {
  http_response_code(410);
  page('Link expired', '<div class="card"><span class="badge">Set your password</span><h1>This link has expired</h1><p class="muted">Sign-in links work once and expire. Ask your IFA Academy instructor for a new one, or use <a href="' . h(auth_url('forgot.php')) . '">Forgot your password?</a></p></div>');
  exit;
}
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $p = (string)($_POST['password'] ?? ''); $p2 = (string)($_POST['password2'] ?? '');
  if ($pp = password_problem($p)) $err = $pp;
  elseif ($p !== $p2) $err = 'The two passwords don’t match.';
  else {
    lms_schema();
    q('UPDATE ifa_users SET password_hash = ?, must_change = 0 WHERE id = ?', [password_hash($p, PASSWORD_DEFAULT), $link['user_id']]);
    q('UPDATE ifa_tokens SET used_at = ? WHERE id = ?', [now(), $link['id']]);
    end_all_sessions((int)$link['user_id']);   // sign out anywhere the old password was used
    clear_failures($link['username']);
    redirect(auth_url('login.php', ['set' => 1]));
  }
}
page('Set your password', '<div class="card"><span class="badge">' . ($link['purpose'] === 'invite' ? 'Welcome' : 'Reset password') . '</span>'
  . '<h1>' . ($link['purpose'] === 'invite' ? 'Welcome, ' . h($link['name'] ?: $link['username']) : 'Choose a new password') . '</h1>'
  . '<p class="muted">Your username is <b>' . h($link['username']) . '</b>. Choose a password with at least 8 characters, using letters and numbers.</p>'
  . ($err ? '<p class="msg err">' . h($err) . '</p>' : '')
  . '<form method="post">' . csrf_field() . '<input type="hidden" name="t" value="' . h($t) . '">'
  . '<input type="text" name="username" value="' . h($link['username']) . '" autocomplete="username" hidden>'
  . '<label>New password<input name="password" type="password" required autocomplete="new-password" autofocus></label>'
  . '<label>Repeat password<input name="password2" type="password" required autocomplete="new-password"></label>'
  . '<button type="submit">Save password</button></form></div>');
