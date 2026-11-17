<?php
/* Guard for protected folders. Each protected folder's .htaccess sends every request here.
   The file is only sent if the visitor is signed in and allowed into that area. */
declare(strict_types=1);
require __DIR__ . '/lib.php';

const MIME = [
  'html' => 'text/html; charset=utf-8', 'htm' => 'text/html; charset=utf-8',
  'css' => 'text/css; charset=utf-8', 'js' => 'text/javascript; charset=utf-8', 'mjs' => 'text/javascript; charset=utf-8',
  'jsx' => 'text/javascript; charset=utf-8', 'json' => 'application/json; charset=utf-8', 'map' => 'application/json; charset=utf-8',
  'txt' => 'text/plain; charset=utf-8', 'md' => 'text/markdown; charset=utf-8', 'csv' => 'text/csv; charset=utf-8', 'xml' => 'application/xml; charset=utf-8',
  'png' => 'image/png', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'gif' => 'image/gif', 'webp' => 'image/webp', 'avif' => 'image/avif', 'svg' => 'image/svg+xml', 'ico' => 'image/x-icon',
  'woff' => 'font/woff', 'woff2' => 'font/woff2', 'ttf' => 'font/ttf', 'otf' => 'font/otf',
  'mp3' => 'audio/mpeg', 'wav' => 'audio/wav', 'ogg' => 'audio/ogg', 'm4a' => 'audio/mp4', 'mp4' => 'video/mp4', 'webm' => 'video/webm',
  'pdf' => 'application/pdf', 'wasm' => 'application/wasm', 'zip' => 'application/zip',
];

function not_found(): never { no_cache(); http_response_code(404); header('Content-Type: text/plain; charset=utf-8'); echo 'Not found'; exit; }

$uri = (string)($_SERVER['REQUEST_URI'] ?? '/');
$path = rawurldecode((string)parse_url($uri, PHP_URL_PATH));
if (str_contains($path, "\0")) not_found();
$area = area_for($path);
if (!$area) not_found();
if ($path === rtrim($area['prefix'], '/')) { $qs = parse_url($uri, PHP_URL_QUERY); redirect($area['prefix'] . ($qs ? '?' . $qs : '')); }

$u = current_user();
if (must_change($u) && $u['status'] === 'approved') {   // old shared IfaLMS password: choose a new one first
  $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
  if (str_ends_with($path, '/') || preg_match('/\.html?$/i', $path) || str_contains($accept, 'text/html')) redirect(auth_url('account.php', ['must' => 1, 'next' => $uri]));
}
if (!can_enter($u, $area)) {
  $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
  $isPage = str_ends_with($path, '/') || preg_match('/\.html?$/i', $path) || str_contains($accept, 'text/html');
  if ($isPage) redirect(auth_url('login.php', ['next' => $uri] + ($u ? ['denied' => 1] : [])));
  no_cache(); http_response_code($u ? 403 : 401); header('Content-Type: text/plain; charset=utf-8'); echo $u ? 'Forbidden' : 'Sign in required'; exit;
}

// Map the web path to a real file inside this area only.
$docRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? '')) ?: realpath(__DIR__ . '/..');
$areaRoot = realpath($docRoot . $area['prefix']);
if (!$areaRoot) not_found();
$file = $docRoot . $path;
if (str_ends_with($path, '/') || is_dir($file)) $file = rtrim($file, '/') . '/index.html';
$real = realpath($file);
if (!$real || !is_file($real) || !str_starts_with($real, $areaRoot . DIRECTORY_SEPARATOR)) not_found();
$base = basename($real);
$ext = strtolower(pathinfo($real, PATHINFO_EXTENSION));
if ($base[0] === '.' || !isset(MIME[$ext])) not_found();   // never send .htaccess, PHP or unknown files

header('Content-Type: ' . MIME[$ext]);
header('X-Content-Type-Options: nosniff');
header('X-LiteSpeed-Cache-Control: no-cache');

if ($ext === 'html' || $ext === 'htm') {
  no_cache();
  header('X-Frame-Options: SAMEORIGIN');
  $html = (string)file_get_contents($real);
  $info = ['username' => $u['username'], 'name' => $u['name'] ?: $u['username'], 'role' => $u['role'], 'program' => $u['program'], 'logout' => auth_url('logout.php'), 'account' => auth_url('account.php')];
  $bridge = ['username' => $u['username'], 'name' => $u['name'] ?: $u['username']];
  $js = 'window.IFA_USER=' . json_encode($info, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) . ';';
  if ($area['bridge']) $js .= 'try{' . json_encode(array_values($area['bridge'])) . '.forEach(function(k){localStorage.setItem(k,' . json_encode(json_encode($bridge, JSON_UNESCAPED_UNICODE), JSON_HEX_TAG | JSON_HEX_AMP) . ')})}catch(e){}';
  $tag = '<script>' . $js . '</script>';
  $html = preg_match('/<head[^>]*>/i', $html) ? preg_replace('/<head[^>]*>/i', '$0' . $tag, $html, 1) : $tag . $html;
  header('Content-Length: ' . strlen($html));
  echo $html;
  exit;
}

// Other files: private caching, with revalidation.
$mtime = filemtime($real) ?: time();
$etag = '"' . substr(sha1($real . $mtime . filesize($real)), 0, 20) . '"';
header('Cache-Control: private, max-age=3600');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $mtime) . ' GMT');
header('ETag: ' . $etag);
if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) { http_response_code(304); exit; }
header('Content-Length: ' . filesize($real));
readfile($real);
