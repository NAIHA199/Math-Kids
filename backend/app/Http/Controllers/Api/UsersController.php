<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class UsersController extends Controller
{
    public function studentHome(Request $request): JsonResponse
    {

        return response()->json([
            'message' => 'Welcome to student home',
            'data' => [
                'role' => $request->user()->role,
                'user' => $request->user()
            ]
        ]);
    }

    public function teacherHome(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to teacher home',
            'data' => [
                'role' => $request->user()->role,
                'user' => $request->user()
            ]
        ]);
    }

    public function parentHome(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to parent home',
            'data' => [
                'role' => $request->user()->role,
                'user' => $request->user()
            ]
        ]);

    }
}
