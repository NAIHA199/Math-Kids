<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {

        if (!Auth::check()) { // Kiểm tra user đã đăng nhập chưa
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        // check role khi gọi API (chặn request gian lận như thay đổi role hoặc fake token trong localStorage)
        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['message' => 'You do not have permission'], 403);
        }

        return $next($request);
    }

}
