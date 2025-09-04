<?php
// Nơi xử lý các logic yêu cầu liên quan đến xác thực (đăng ký, đăng nhập, lấy thông tin người dùng)
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{

    // Đăng ký (tạo user mới đưa dữ liệu vào db)
    public function register(RegisterRequest $request): JsonResponse
    {

        $user = User::create([
            'role' => $request->get('role'),
            'fullName' => $request->get('fullName'),
            'email' => $request->get('email'),
            'username' => $request->get('username'),
            'password' => Hash::make($request->get('password')),
            'parent_email' => $request->get('parent_email'),
        ]);

        // kiểm tra phụ huynh có tồn tại không
        if ($request->get('role') === 'student') {
            $parent = User::where('email', $request->get('parent_email'))
                ->where('role', 'parent')
                ->first();

            if (!$parent) {
                throw ValidationException::withMessages([
                    'parent_email' => 'Email phụ huynh chưa được đăng ký trong hệ thống.',
                ]);
            }
            // liên kết với phụ huynh
            $parent->children()->attach($user->id);
        }



        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(
            [
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        );

    }

    // Đăng nhập, kiểm tra thông tin trả về sanctum token cho front
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect username or password'], 401);
        }

        // chặn role sai từ lúc login
        if ($user->role !== $request->role) {
            return response()->json(['message' => 'Role does not match'], 403);
        }
        //Tạo token
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'fullName' => $user->fullName,
                'email' => $user->email
            ]
        ]);

    }

    // Lấy thông tin user đang đăng nhập từ token
    public function user(LoginRequest $request): JsonResponse
    {
        return response()->json(Auth::user());
    }

    // Đăng xuất, xóa token
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful'
        ]);
    }

}
