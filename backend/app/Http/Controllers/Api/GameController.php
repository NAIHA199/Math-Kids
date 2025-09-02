<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    // Danh sách games
    public function index()
    {
        $games = Game::where('is_active', true)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $games
        ]);
    }

    // Chi tiết 1 game (theo slug)
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

        return response()->json([
            'success' => true,
            'data' => $game
        ]);

    }

}
