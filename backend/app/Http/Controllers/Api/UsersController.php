<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function studentHome(): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to student home',
            'data' => [
                'role' => 'student',
                'features' => [
                    'lessons', 'games', 'rewards', 'progress'
                ]
            ]
        ]);
    }

    public function teacherHome(): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to teacher home',
            'data' => [
                'role' => 'teacher',
                'features' => [
                    'classes', 'assignments', 'students', 'reports'
                ]
            ]
        ]);
    }

    public function parentHome(): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to parent home',
            'data' => [
                'role' => 'parent',
                'features' => [
                    'children', 'progress', 'reports', 'notifications'
                ]
            ]
        ]);
    }
}
