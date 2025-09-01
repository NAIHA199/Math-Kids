<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\CompletionController;
use App\Http\Controllers\Api\ProgressController;;
use App\Http\Controllers\Api\RewardController;

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
    Route::put('/user/update', [UsersController::class, 'update']);
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
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/completions/upsert', [CompletionController::class, 'upsert']);// Lưu hoặc cập nhật tiến trình
    Route::post('/completions/complete', [CompletionController::class, 'markComplete']);//  Đánh dấu hoàn thành
    Route::get('/completions/mine', [CompletionController::class, 'myCompletions']);// Lấy danh sách completion của user hiện tại
    Route::get('/completions/{type}/{id}', [CompletionController::class, 'showForItem']);// Lấy completion cho 1 bài học/bài tập cụ thể
});


//Route cho reward ( lấy data từ lesson, exercise, games)
Route::middleware(['auth:sanctum'])->group(function () {
    //Route::post('/lessons/complete', [CompletionController::class, 'completeLesson']);
    //Route::post('/games/complete',   [CompletionController::class, 'completeGame']);

    Route::get('/rewards/summary',   [RewardController::class, 'summary']); // response progress + achievement
    Route::post('/results/update', [ResultController::class, 'updateProgress']); // Cập nhật khi hs làm xong bài học/bài tập thì tăng sao, level
    Route::get('/results/{user}', [ResultController::class, 'show']); // Trả báo cáo cho ph/gv
});