<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\UserGame;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    // Lấy danh sách games
    public function index()
    {
        $user = User::find(auth()->id());
        $games = Game::where('is_active', true)
            ->orderBy('min_points')
            ->get();

        // Thêm trạng thái có thể chơi được không
        $games = $games->map(function ($game) use ($user) {
            $game->can_play = $user->total_points >= $game->min_points;
            return $game;
        });

        return response()->json([
            'success' => true,
            'data' => $games
        ]);
    }

    // Chi tiết game
    public function show($slug)
    {
        $game = Game::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        $user = User::find(auth()->id());
        $game->can_play = $user->total_points >= $game->min_points;

        return response()->json([
            'success' => true,
            'data' => $game
        ]);
    }

    // Lưu kết quả game
    public function saveResult(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'score' => 'required|integer|min:0',
            'duration' => 'required|integer|min:1',
            'points_earned' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        try {
            // Lưu kết quả game
            $userGame = UserGame::create([
                'user_id' => auth()->id(),
                'game_id' => $game->id,
                'score' => $request->score,
                'duration' => $request->duration,
                'points_earned' => $request->points_earned
            ]);

            // Cộng điểm cho user
            $user = User::find(auth()->id());
            $user->total_points += $request->points_earned;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Game result saved successfully',
                'data' => $userGame
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save game result',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Lịch sử chơi game của user
    public function history()
    {
        $userGames = UserGame::where('user_id', auth()->id())
            ->with('game')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $userGames
        ]);
    }

    // Bảng xếp hạng cho một game
    public function leaderboard($id)
    {
        $leaderboard = UserGame::where('game_id', $id)
            ->with('user')
            ->orderBy('score', 'desc')
            ->orderBy('duration')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $leaderboard
        ]);
    }
}
// Thêm vào GameController
//private function calculatePoints($score, $duration, $difficulty = 'normal')
{
    // Hệ số độ khó
    $difficultyFactors = [
        'easy' => 0.7,
        'normal' => 1.0,
        'hard' => 1.5,
        'expert' => 2.0
    ];

    $difficultyFactor = $difficultyFactors[$difficulty] ?? 1.0;

    // Hệ số thời gian (thời gian càng ngắn điểm càng cao)
    $maxTime = 300; // 5 phút
    $timeFactor = max(0.5, 2 - ($duration / $maxTime));

    // Điểm cơ bản + điểm thưởng theo độ khó
    $basePoints = $score * 0.1;
    $bonusPoints = $score * $timeFactor * $difficultyFactor;

    return (int)($basePoints + $bonusPoints);
}

