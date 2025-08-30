<?php
$user = User::create([
    'name' => $data['name'],
    'email' => $data['email'],
    'password' => Hash::make($data['password']),
    'userType' => $data['userType'], // lưu trực tiếp
    'avatar' => $data['avatar'] ?? null,
]);
?>
