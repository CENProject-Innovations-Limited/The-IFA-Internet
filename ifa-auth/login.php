<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

$next = safe_next($_GET['next'] ?? $_POST['next'] ?? '/');
$area = area_for(parse_url($next, PHP_URL_PATH) ?: '/');
$u = current_user();
if ($u && $area && can_enter($u, $area)) redirect($next);
if ($u && must_change($u) && $u['status'] === 'approved') redirect(auth_url('account.php', ['must' => 1, 'next' => $next]));

$err = ''; $username = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $username = strtolower(trim((string)($_POST['username'] ?? '')));
  $password = (string)($_POST['password'] ?? '');
  if (too_many_attempts($username)) {
    $err = 'Too many sign-in attempts. Please wait 15 minutes and try again.';
  } else {
    $row = $username !== '' ? q('SELECT * FROM ifa_users WHERE username = ?', [$username])->fetch() : false;
    $hash = $row['password_hash'] ?? null;
    // Always run password_verify so response time doesn't reveal whether a username exists.
    $ok = password_verify($password, $hash ?: '$2y$10$2HKQi/7Fs55DfNkE7ZdE5.dPxfuqalZctHvSAkdRo.7sbOi3snP.u');
    if (!$row || !$hash || !$ok) {
      record_failure($username);
      $err = 'Incorrect username or password.';
    } elseif ($row['status'] === 'pending') {
      $err = 'Your account is pending approval. Please contact your IFA Academy instructor.';
    } elseif ($row['status'] === 'suspended') {
      $err = 'This account is suspended. Please contact your IFA Academy instructor.';
    } else {
      clear_failures($username);
      if (password_needs_rehash($hash, PASSWORD_DEFAULT)) q('UPDATE ifa_users SET password_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $row['id']]);
      end_session();
      start_session((int)$row['id']);
      if (must_change($row)) redirect(auth_url('account.php', ['must' => 1, 'next' => $next]));
      if ($area && !in_array($row['role'], $area['roles'], true)) redirect(auth_url('login.php', ['next' => $next, 'denied' => 1]));
      redirect($next === '/' && $row['role'] === 'admin' ? auth_url('admin.php') : $next);
    }
  }
}

$here = $area ? $area['prefix'] : '';
$list = '';
foreach (PROTECTED_AREAS as $prefix => $a) $list .= '<li class="' . ($prefix === $here ? 'here' : '') . '">' . h($a['name']) . '</li>';

$denied = isset($_GET['denied']) && $u;
$body = '<div class="card">'
  . '<span class="badge">' . ($area ? 'Premium · Students only' : 'Student sign-in') . '</span>'
  . '<h1>' . ($area ? h($area['name']) : 'Sign in') . '</h1>'
  . '<p class="muted">Sign in with your IFA Academy (IfaLMS) username and password.</p>'
  . ($denied ? '<p class="msg err">Your account doesn’t include access to this page. Please contact your IFA Academy instructor.</p>' : '')
  . ($u && $area && !$denied && $u['status'] !== 'approved' ? '<p class="msg err">Your account isn’t approved yet. Please contact your IFA Academy instructor.</p>' : '')
  . ($err ? '<p class="msg err" role="alert">' . h($err) . '</p>' : '')
  . (isset($_GET['bye']) ? '<p class="msg ok">You’re signed out.</p>' : '')
  . (isset($_GET['set']) ? '<p class="msg ok">Your password is set. Sign in to continue.</p>' : '')
  . '<form method="post" action="' . h(auth_url('login.php')) . '">' . csrf_field()
  . '<input type="hidden" name="next" value="' . h($next) . '">'
  . '<label>Username<input name="username" required autocomplete="username" autocapitalize="none" spellcheck="false" value="' . h($username) . '" autofocus></label>'
  . '<label>Password<input name="password" type="password" required autocomplete="current-password"></label>'
  . '<button type="submit">Sign in</button></form>'
  . '<p class="small muted" style="margin:16px 0 0"><a href="' . h(auth_url('forgot.php')) . '">Forgot your password?</a> · Not a student yet? <a href="/ifa-lms/">Enrol on IfaLMS</a></p>'
  . '</div>'
  . '<div class="card"><h2>Student spaces</h2><p class="small muted" style="margin:0">One sign-in opens all of these:</p><ul class="areas">' . $list . '</ul></div>';
page($area ? $area['name'] : 'Sign in', $body);
