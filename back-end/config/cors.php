<?php
// cho phép front end (khác cổng) gọi api
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000','http://127.0.0.1:3000'], //địa chỉ frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Bật nếu dùng cookie/token
];
?>
