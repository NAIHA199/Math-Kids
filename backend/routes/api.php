<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Phân quyền theo role
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/student-home', [UsersController::class, 'studentHome'])->middleware('role:student');
    Route::get('/teacher-home', [UsersController::class, 'teacherHome'])->middleware('role:teacher');
    Route::get('/parent-home', [UsersController::class, 'parentHome'])->middleware('role:parent');
});
