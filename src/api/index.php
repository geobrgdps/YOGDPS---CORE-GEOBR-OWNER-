<?php
/**
 * YOGDPS API Gateway
 *
 * This layer is intentionally storage-agnostic. Supabase will be connected
 * behind these handlers later, keeping the public API stable.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

function respond(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$action = $_GET['action'] ?? 'health';
$method = $_SERVER['REQUEST_METHOD'];

switch ($action) {
    case 'health':
        respond(['ok' => true, 'service' => 'yogdps-api', 'version' => '0.1.0', 'backend' => 'pending-supabase']);
    case 'config':
        respond(['ok' => true, 'platform' => 'YOGDPS', 'gdps_api' => 'v1', 'storage' => 'supabase-pending']);
    case 'levels':
        if ($method === 'GET') respond(['ok' => true, 'levels' => [], 'message' => 'Connect the data layer to enable levels.']);
        respond(['ok' => false, 'error' => 'DATA_LAYER_NOT_CONNECTED'], 503);
    case 'projects':
        if ($method === 'GET') respond(['ok' => true, 'projects' => []]);
        if (in_array($method, ['POST','PUT','DELETE'], true)) respond(['ok' => false, 'error' => 'DATA_LAYER_NOT_CONNECTED'], 503);
        respond(['ok' => false, 'error' => 'METHOD_NOT_ALLOWED'], 405);
    default:
        respond(['ok' => false, 'error' => 'UNKNOWN_ACTION'], 404);
}
