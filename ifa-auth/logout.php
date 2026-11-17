<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

end_session();
no_cache();
header('Content-Type: text/html; charset=utf-8');
// Also clear the apps' own remembered sign-ins in this browser, then go to the sign-in page.
$keys = ['ifalens_user', 'ifanote_pro_user', 'ileAro_session', 'ifakids_session'];
foreach (PROTECTED_AREAS as $a) foreach ($a['bridge'] as $k) $keys[] = $k;
$to = auth_url('login.php', ['bye' => 1]);
echo '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing out…</title><body style="background:#04070f">',
     '<script>try{', json_encode(array_values(array_unique($keys))), '.forEach(function(k){localStorage.removeItem(k)})}catch(e){}location.replace(', json_encode($to), ');</script>',
     '<noscript><meta http-equiv="refresh" content="0;url=', h($to), '"></noscript>';
