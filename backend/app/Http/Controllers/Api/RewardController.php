<?php

namespace App\Http\Controllers\Api;

use App\Services\RewardService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ResultService;
use Illuminate\Support\Facades\Auth;
class RewardController extends Controller
{
    //Khai báo RewardService
    protected $rewardService;
    protected $resultService;

    public function __construct(RewardService $rewardService, ResultService $resultService)
    {
        $this->rewardService = $rewardService;
        $this->resultService = $resultService;
    }


    // API lấy tổng quan của phần thưởng bao gồm: progress(sao, level, streak) + achievement

    public function summary()
    {
        $user = Auth::user();
        $summary = $this->rewardService->getRewardSummary($user);
        return response()->json([
            'achievements' => $summary['achievements'],
            'badges' => $summary['badges'],
        ]);
    }

    public function index()
    {
        $user = Auth::user();
        $this->rewardService->checkAndAwardAchievements($user);
        $summary = $this->rewardService->getRewardSummary($user);

        return response()->json($summary);
    }

    // Chi tiết reward
    public function show($id)
    {
        $reward = Reward::where('is_active', true)->find($id);

        if (!$reward) {
            return response()->json([
                'success' => false,
                'message' => 'Reward not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $reward
        ]);
    }

    /*// Đổi reward
    public function claim(Request $request, $id)
    {
        $reward = Reward::where('is_active', true)->find($id);

        if (!$reward) {
            return response()->json([
                'success' => false,
                'message' => 'Reward not found'
            ], 404);
        }

        $user = User::find(auth()->id());

        // Kiểm tra điểm
        if ($user->total_points < $reward->points_required) {
            return response()->json([
                'success' => false,
                'message' => 'Not enough points'
            ], 400);
        }

        // Kiểm tra tồn kho
        if ($reward->stock <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Reward out of stock'
            ], 400);
        }

        try {
            // Trừ điểm
            $user->total_points -= $reward->points_required;
            $user->save();

            // Giảm tồn kho
            $reward->stock -= 1;
            $reward->save();

            // Ghi nhận đổi thưởng
            $userReward = UserReward::create([
                'user_id' => auth()->id(),
                'reward_id' => $reward->id,
                'points_used' => $reward->points_required,
                'claimed_at' => now(),
                'status' => 'claimed'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Reward claimed successfully',
                'data' => $userReward
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to claim reward',
                'error' => $e->getMessage()
            ], 500);
        }
    }*/


    /*// Lịch sử đổi thưởng của user
    public function history()
    {
        $userRewards = UserReward::where('user_id', auth()->id())
            ->with('reward')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $userRewards
        ]);
    }
    */

}
