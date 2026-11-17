<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

if (MAIL_FROM === '') {
  page('Forgot your password?', '<div class="card"><span class="badge">Password help</span><h1>Forgot your password?</h1><p class="muted">Ask your IFA Academy instructor for a new sign-in link. It lets you choose a new password in one step.</p><p><a class="btn btn--ghost" href="' . h(auth_url('login.php')) . '">Back to sign in</a></p></div>');
  exit;
}
$sent = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $email = trim((string)($_POST['email'] ?? ''));
  if (filter_var($email, FILTER_VALIDATE_EMAIL) && !too_many_attempts('reset:' . strtolower($email))) {
    record_failure('reset:' . strtolower($email));   // also limits how often reset emails can be requested
    $u = q("SELECT * FROM ifa_users WHERE LOWER(email) = LOWER(?) AND status = 'approved'", [$email])->fetch();
    if ($u) {
      $url = make_link((int)$u['id'], 'reset', 3600);
      $body = "Hello " . ($u['name'] ?: $u['username']) . ",\r\n\r\nUse this link within one hour to choose a new password for " . ACADEMY . ":\r\n\r\n$url\r\n\r\nYour username is: {$u['username']}\r\n\r\nIf you didn't ask for this, you can ignore this email.\r\n";
      @mail($u['email'], 'Reset your ' . ACADEMY . ' password', $body, 'From: ' . MAIL_FROM . "\r\nContent-Type: text/plain; charset=utf-8");
    }
  }
  $sent = true;   // same message either way, so nobody can test which emails are registered
}
page('Forgot your password?', '<div class="card"><span class="badge">Password help</span><h1>Forgot your password?</h1>'
  . ($sent ? '<p class="msg ok">If that email belongs to an approved student, a reset link is on its way. It works for one hour. Check your spam folder too.</p>'
           : '<p class="muted">Enter the email address on your IFA Academy account and we’ll send you a link to choose a new password.</p><form method="post">' . csrf_field() . '<label>Email<input name="email" type="email" required autocomplete="email" autofocus></label><button type="submit">Send reset link</button></form>')
  . '<p class="small" style="margin:16px 0 0"><a href="' . h(auth_url('login.php')) . '">Back to sign in</a></p></div>');
