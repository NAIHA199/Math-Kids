<?php

namespace App\Services;

use App\Models\Reward;
use App\Models\User;
use App\Models\Result;
use App\Models\StudentAchievement;
class RewardService
{
    /**
     * Kiểm tra và trao phần thưởng
     */
    public function checkAndAwardAchievements(User $user): void
    {
        $progress = Result::where('user_id', $user->id)->first();

        if (!$progress) {
            return;
        }

        $existingRewardIds = StudentAchievement::where('user_id', $user->id)
            ->pluck('reward_id')
            ->toArray();

        $potentialRewards = Reward::whereNotIn('id', $existingRewardIds)->get();

        foreach ($potentialRewards as $reward) {
            $field = $reward->field;   // ví dụ: "level", "stars", ...
            $value = $reward->value;   // ví dụ: 5, 500, ...

            if (isset($progress->$field) && $progress->$field >= $value) {
                StudentAchievement::firstOrCreate(
                    [
                        'user_id'   => $user->id,
                        'reward_id' => $reward->id,
                    ],
                    [
                        'awarded_at' => now(),
                    ]
                );
            }
        }
    }

    /**
     * Lấy dữ liệu hiển thị phần thưởng cho frontend
     */
    public function getRewardSummary(User $user): array
    {
        $progress = Result::firstOrCreate(['user_id' => $user->id]);

        // 🔥 gọi check để cập nhật trước khi trả về
        $this->checkAndAwardAchievements($user);

        $unlockedRewardIds = StudentAchievement::where('user_id', $user->id)
            ->pluck('reward_id')
            ->toArray();


        $allBadges = Reward::all()->map(function ($reward) use ($unlockedRewardIds, $user) {
            $achievement = StudentAchievement::where('user_id', $user->id)
            ->where('reward_id', $reward->id)
            ->first();
            return [
                'id' => $reward->id,
                'name' => $reward->name,
                'category' => $reward->category,
                'description' => $reward->description,
                'image_url' => $reward->image_url,
                'is_unlocked' => in_array($reward->id, $unlockedRewardIds),
                'awarded_at' => $achievement?->awarded_at,
            ];
        });

        return [
            'achievements' => $progress,
            'badges' => $allBadges,
        ];
    }
}
