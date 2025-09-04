<?php

namespace App\Services;

use App\Models\Reward;
use App\Models\User;
use App\Models\Result;
use App\Models\StudentAchievement;
use App\Models\Completion;
class RewardService
{



    /**
     * HÀM QUAN TRỌNG: KIỂM TRA VÀ TRAO PHẦN THƯỞNG
     * Hàm này được gọi bởi ResultService sau khi tiến trình của học sinh được cập nhật.
     */
    public function checkAndAwardAchievements(User $user): void
    {
        // 1. Lấy thành tích mới nhất của học sinh từ bảng 'results'
        $progress = Result::where('user_id', $user->id)->latest()->first();

        // Nếu học sinh chưa có dòng nào trong bảng results, không làm gì cả
        if (!$progress) {
            return;
        }

        // 2. Lấy ID của tất cả các huy hiệu mà học sinh này ĐÃ CÓ
        $existingRewardIds = StudentAchievement::where('user_id', $user->id)
            ->pluck('reward_id')
            ->toArray();

        // 3. Lấy tất cả các huy hiệu mà học sinh CHƯA CÓ
        $potentialRewards = Reward::whereNotIn('id', $existingRewardIds)->get();

        // 4. Lặp qua từng huy hiệu để xem học sinh có đủ điều kiện không
        foreach ($potentialRewards as $reward) {
        $field = $reward->field;
        $value = $reward->value;

            // 6. Nếu đủ điều kiện, "trao thưởng" bằng cách lưu vào database
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
     * HÀM HIỂN THỊ: Lấy dữ liệu phần thưởng để hiển thị cho Frontend
     * Hàm này chỉ đọc dữ liệu đã được xử lý, không tính toán gì nặng.
     */
    public function getRewardSummary(User $user): array
    {

        $progress = Result::where('user_id', $user->id)->latest()->first();


        $allRewards = Reward::all();

        $this->checkAndAwardAchievements($user);

        $unlockedRewardIds = StudentAchievement::where('user_id', $user->id)
            ->pluck('reward_id')
            ->toArray();

        $allBadges = Reward::all()->map(function ($reward) use ($unlockedRewardIds) {
            return [
                'id' => $reward->id,
                'name' => $reward->name,
                'description' => $reward->description,
                'image_url' => $reward->image_url,
                'is_unlocked' => in_array($reward->id, $unlockedRewardIds),

            ];
        });

        return [
            'achievements' => $progress, // Gồm stars, level...
            'badges' => $allBadges,       // Danh sách huy hiệu và trạng thái
        ];
    }
}
