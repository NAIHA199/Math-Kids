<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CompletionController;

//Route đăng nhập, đăng ký và đăng xuất
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

//Route quên và reset mật khẩu
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

//Route bài học 
Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{id}', [LessonController::class, 'show']);
Route::get('/lessons/{id}/full', [LessonController::class, 'getLessonFull']);

//Route bài tập 
Route::get('/exercises', [ExerciseController::class, 'index']);
Route::get('/exercises/{id}', [ExerciseController::class, 'show']);

// Progress/Complete (có thể bọc middleware auth:sanctum nếu bạn đã bật login)
Route::post('/completions/upsert', [CompletionController::class, 'upsert']);           // lưu tiến trình/điểm
Route::post('/completions/complete', [CompletionController::class, 'markComplete']);   // đánh dấu hoàn thành
Route::get('/completions/mine', [CompletionController::class, 'myCompletions']);       // danh sách completion của user
Route::get('/completions/{type}/{id}', [CompletionController::class, 'showForItem']);  // completion của 1 item