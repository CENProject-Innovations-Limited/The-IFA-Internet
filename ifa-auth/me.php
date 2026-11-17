<?php
/* Who is signed in? Used by IFA Internet pages (and IfaLMS in phase 2). */
declare(strict_types=1);
require __DIR__ . '/lib.php';

no_cache();
header('Content-Type: application/json; charset=utf-8');
$u = current_user();
if (!$u) { echo json_encode(['signedIn' => false]); exit; }
$areas = [];
foreach (PROTECTED_AREAS as $prefix => $a) if (can_enter($u, $a)) $areas[] = $prefix;
echo json_encode(['signedIn' => true, 'user' => ['username' => $u['username'], 'name' => $u['name'], 'role' => $u['role'], 'status' => $u['status'], 'program' => $u['program']], 'areas' => $areas], JSON_UNESCAPED_UNICODE);
