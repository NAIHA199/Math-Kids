<?php

namespace App\Service;

use App\Models\Achievement;
use App\Models\User;
use App\Models\Result;
use App\Models\Reward;
use Illuminate\Support\Facades\Auth;
class RewardService
{
    public function getRewardSummary(User $user): array // gọi api summary lấy tóm tắt phần thưởng
    {
        $user = Auth::user();
        //Lấy result của học sinh để hiển thị progress
        $progress = Result::where('user_id', $user->id)->first();

        // Nếu chưa có result thì khởi tạo mặc định
        if (!$progress) {
            $progress = Result::create([
                'user_id' => $user->id,
                'stars' => 0,
                'level' => 1,
                'lesson_completed' => 0,
                'exercises_completed' => 0,
                'games_completed' => 0,
                'streak_days' => 0,
            ]);
        }

        // Lấy danh sách phần thưởng
        $rewards = Reward::all()->map(function ($reward) use ($progress, $user) {
            // parse requirement (vd: "stars >= 500")
            $earned = $this->getAchievement($reward->requirement, $progress);

            return [
                'id' => $reward->id,
                'name' => $reward->name,
                'category' => $reward->category,
                'description' => $reward->description,
                'requirement' => $reward->requirement,
                'earned' => $earned,
                'earnedDate' => $earned ? now()->toDateString() : null,
            ];
        });

        return [
            'achievements' => $progress, // chuyển progress thành achievements
            'badges' => $rewards, // chuyển achievement thành badges để phù hợp với frontend
        ];
    }

    // Hàm tính toán thành tựu (Achievement) cho các mốc thưởng khác nhau
    private function getAchievement(string $requirement, $progress): bool
    {
        // Map progress thành array
        $data = [
            'stars' => $progress->stars,
            'level' => $progress->level,
            'lesson_completed' => $progress->lesson_completed,
            'exercises_completed' => $progress->exercises_completed,
            'games_completed' => $progress->games_completed,
            'streak_days' => $progress->streak_days,
        ];

        // Parse requirement: ví dụ "stars >= 500"
        foreach ($data as $field => $value) {
            $requirement = str_replace($field, $value, $requirement);
        }

        try {
            return eval("return {$requirement};"); // ⚠️ chỉ dùng cho nội bộ
        } catch (\Throwable $e) {
            return false;
        }
    }
}
