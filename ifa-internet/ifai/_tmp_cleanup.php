<?php
$base = '/home/cenpeokc/toe.cenproject.org/ifai/';
$files = ['_tmp_slug_update.php','_tmp_slug_check.php','_tmp_flush_perma.php'];
foreach ($files as $f) {
    $path = $base . $f;
    echo $f . ': ' . (file_exists($path) ? (unlink($path) ? 'deleted' : 'FAILED') : 'not found') . "\n";
}
// Self-destruct
unlink(__FILE__);
echo "_tmp_cleanup.php: self-deleted\n";
