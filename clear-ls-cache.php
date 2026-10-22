<?php
// LiteSpeed cache purge script — run once via cPanel Terminal or Cron Job
$results = [];

// Method 1: lscmctl CLI tool (most reliable on LiteSpeed servers)
$lscmctl = '/usr/local/lsws/bin/lscmctl';
if (is_executable($lscmctl)) {
    $results[] = 'lscmctl: ' . shell_exec("$lscmctl purge '*'");
}

// Method 2: Purge via LiteSpeed HTTP admin API (common ports)
foreach ([7080, 8088, 8090] as $port) {
    $url = "http://127.0.0.1:$port/cache/purge?cmd=purgeall";
    $ctx = stream_context_create(['http' => ['timeout' => 3]]);
    $r = @file_get_contents($url, false, $ctx);
    if ($r !== false) {
        $results[] = "Admin port $port: " . substr($r, 0, 80);
    }
}

// Method 3: WordPress LiteSpeed Cache plugin purge (if plugin active)
$wp = '/home/cenpeokc/public_html/wp-load.php';
if (file_exists($wp)) {
    define('ABSPATH', dirname($wp) . '/');
    // Signal LSCache to purge all
    @file_put_contents(dirname($wp) . '/.lscache/.LSC_PRELOAD_ENABLE', '');
    $results[] = 'WordPress path found — LSCache signal sent';
}

// Method 4: Delete any accessible cache files
foreach (glob('/home/cenpeokc/public_html/.lscache/*') ?: [] as $f) {
    @unlink($f);
    $results[] = "Deleted: $f";
}

echo "LiteSpeed Cache Purge Results:\n";
echo implode("\n", $results ?: ['No direct purge method available on this server.']);
echo "\n\nDone at: " . date('Y-m-d H:i:s') . "\n";
