<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;


class ForgotPasswordController extends Controller
{
    //gửi email reset mk cho người dùng
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email does not exist.'], 404);
        }

        // tạo lại token (lấy random)
        $token = Str::random(60);

        //Lưu token vào DB
        DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => Hash::make($token),
            'created_at' => now()
        ]);

        // Gửi email reset mật khẩu
        Mail::raw("Click here to reset your password: " .
            url("http://localhost:3000/reset-password?token=$token&email=" . $request($user->email)),
            function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Reset Password Notification');

            }
        );




        return response()->json(['message' => 'Sent email reset password.']);
    }

    // Reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6'
        ]);

        $email = $request->email;
        $token = $request->token;

        $passwordReset = DB::table('password_resets')
            ->where('email', $email)
            ->where('token', $token)
            ->first();

        if (!$passwordReset || !Hash::check($token, $passwordReset->token)) {
            return response()->json(['message' => 'Invalid token or email.'], 400);
        }

        //Cập nhật lại pass mới
        $user = User::where('email', $email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        //Xóa token reset
        DB::table('password_resets')->where('email', $email)->delete();

        return response()->json(['message' => 'Password has been reset successfully.']);
    }

}
