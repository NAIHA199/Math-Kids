<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

/*// Phân quyền theo role
Route::group(['prefix' => 'student', 'middleware' => ['auth:sanctum', 'role:student']], function () {
    Route::get('/home', [UsersController::class, 'studentHome']);
});

Route::group(['prefix' => 'teacher', 'middleware' => ['auth:sanctum', 'role:teacher']], function () {
    Route::get('/home', [UsersController::class, 'teacherHome']);
});

Route::group(['prefix' => 'parent', 'middleware' => ['auth:sanctum', 'role:parent']], function () {
    Route::get('/home', [UsersController::class, 'parentHome']);
});
*/