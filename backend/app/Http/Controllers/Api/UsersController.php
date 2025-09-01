<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function AdminHome (Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Welcome to Admin',
            'data' => [
                'role' => $request->user()->role,
                'user' => $request->user()
            ]
        ]);
    }
    
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
    
    public function update(Request $request): JsonResponse
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $request->user()->id,
            'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id,
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Update user information
        $user = $request->user();
        $user->fullName = $request->fullName;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->save();
        
        return response()->json([
            'message' => 'User information updated successfully',
            'user' => $user
        ]);
    }
}