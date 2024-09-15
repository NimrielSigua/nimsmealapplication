<?php
$localServerIP = gethostbyname(gethostname());

if ($localServerIP) {
    echo json_encode(['localServerIP' => $localServerIP]);
} else {
    echo json_encode(['error' => 'Failed to retrieve local server IP address']);
}
?>