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
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\ResultController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\ReportController;
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
//Route Grade
Route::get('/grades', [GradeController::class, 'index']);
//Route bài học

Route::get('/lessons/{id}/sections', [LessonController::class, 'getLessonWithSections']);
Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{id}', [LessonController::class, 'show']);
Route::get('/lessons/{id}/full', [LessonController::class, 'getLessonFull']);  // API này cần cho frontend
Route::get('/lessons/{lessonId}/sections', [LessonController::class, 'getLessonWithSections']);



//Route bài tập
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/exercises', [ExerciseController::class, 'index']);
    Route::post('/exercises', [ExerciseController::class, 'store']);
    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show']);
    Route::put('/exercises/{exercise}', [ExerciseController::class, 'update']);
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'destroy']);});
    Route::post('/exercises/create-seeder', [ExerciseController::class, 'createFromSeeder'])
    ->middleware('auth:sanctum'); // nếu dùng auth

//Route game
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/games', [GameController::class, 'index']);
    Route::get('/games/{id}', [GameController::class, 'show']);
    Route::post('/games/{game}/complete', [GameController::class, 'complete']);//Route::post('/games/{id}/complete', [GameController::class, 'saveResult']);
    //Route::get('/games/history', [GameController::class, 'history']);
    //Route::get('/games/{id}/leaderboard', [GameController::class, 'leaderboard']);
});

// Progress/Complete (có thể bọc middleware auth:sanctum nếu bạn đã bật login)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/completions/upsert', [CompletionController::class, 'upsert']);// Lưu hoặc cập nhật tiến trình
    Route::post('/completions/complete', [CompletionController::class, 'markComplete']);//  Đánh dấu hoàn thành
    Route::get('/completions/mine', [CompletionController::class, 'myCompletions']);// Lấy danh sách completion của user hiện tại
    Route::get('/completions/{type}/{id}', [CompletionController::class, 'showForItem']);// Lấy completion cho 1 bài học/bài tập cụ thể
});




//Route cho reward ( lấy data từ lesson, exercise, games)
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/rewards', [RewardController::class, 'index']);
    Route::get('/rewards/summary',   [RewardController::class, 'summary']); // response progress + achievement
    Route::post('/results/update', [ResultController::class, 'updateProgress']); // Cập nhật khi hs làm xong bài học/bài tập thì tăng sao, level
    Route::get('/results/{user}', [ResultController::class, 'show']); // Trả báo cáo cho ph/gv
});

//Route báo cáo (dành cho giáo viên)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/report/summary', [ReportController::class, 'summary']);
    Route::get('/report/class-progress', [ReportController::class, 'classProgress']);
    Route::get('/report/leaderboard', [ReportController::class, 'leaderboard']);
});


