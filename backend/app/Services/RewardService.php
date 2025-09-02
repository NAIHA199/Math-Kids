<?php

namespace App\Services;

use App\Models\Reward;
use App\Models\User;
use App\Models\Result;
use App\Models\StudentAchievement;
use App\Models\Completion;
class RewardService
{


    public function getSummary(int $userId)
    {
        // 1. Lấy tổng số sao từ completions
        $totalStars = Completion::where('user_id', $userId)->sum('stars');

        // 2. Tính level (ví dụ: mỗi 50 sao = 1 level)
        $level = intdiv($totalStars, 50);

        // 3. Tính streak (ngày liên tiếp)
        $streak = Completion::where('user_id', $userId)
            ->where('created_at', '>=', now()->subDays(7))
            ->distinct('created_at')
            ->count();

        // 4. Lấy các badges (huy hiệu), luôn hiện tất cả
        $unlockedRewardIds = StudentAchievement::where('user_id', $userId)
            ->pluck('reward_id') // hoặc reward_id nếu bạn dùng bảng rewards
            ->toArray();

        $badges = Reward::all()->map(function ($reward) use ($unlockedRewardIds) {
            return [
                'id' => $reward->id,
                'name' => $reward->name,
                'description' => $reward->description,
                'image_url' => $reward->image_url,
                'is_unlocked' => in_array($reward->id, $unlockedRewardIds),
            ];
        });

        return [
            'achievements' => [
                'stars' => $totalStars,
                'level' => $level,
                'streak_days' => $streak,
            ],
            'badges' => $badges,
        ];
    }
    /**
     * HÀM QUAN TRỌNG: KIỂM TRA VÀ TRAO PHẦN THƯỞNG
     * Hàm này được gọi bởi ResultService sau khi tiến trình của học sinh được cập nhật.
     */
    public function checkAndAwardAchievements(User $user): void
    {
        // 1. Lấy thành tích mới nhất của học sinh từ bảng 'results'
        $progress = Result::where('user_id', $user->id)->first();

        // Nếu học sinh chưa có dòng nào trong bảng results, không làm gì cả
        if (!$progress) {
            return;
        }

        // 2. Lấy ID của tất cả các huy hiệu mà học sinh này ĐÃ CÓ
        $existingRewardIds = StudentAchievement::where('user_id', $user->id)
            ->pluck('reward_id');

        // 3. Lấy tất cả các huy hiệu tiềm năng mà học sinh CHƯA CÓ
        $potentialRewards = Reward::whereNotIn('id', $existingRewardIds)->get();

        // 4. Lặp qua từng huy hiệu tiềm năng để xem học sinh có đủ điều kiện không
        foreach ($potentialRewards as $reward) {
            $isEligible = false;

            // 5. Kiểm tra điều kiện một cách AN TOÀN bằng switch case
            switch ($reward->type) {
                case 'STARS':
                    if ($progress->stars >= $reward->condition_value) {
                        $isEligible = true;
                    }
                    break;
                case 'LEVEL':
                    if ($progress->level >= $reward->condition_value) {
                        $isEligible = true;
                    }
                    break;
                case 'GAMES_COMPLETED':
                    if ($progress->games_completed >= $reward->condition_value) {
                        $isEligible = true;
                    }
                    break;
                // Em có thể dễ dàng thêm các loại điều kiện khác ở đây trong tương lai
                // case 'LESSONS_COMPLETED': ...
                // case 'STREAK_DAYS': ...
            }

            // 6. Nếu đủ điều kiện, "trao thưởng" bằng cách lưu vào database
            if ($isEligible) {
                StudentAchievement::create([
                    'user_id' => $user->id,
                    'reward_id' => $reward->id,
                    'unlocked_at' => now(),
                ]);
            }
        }
    }

    /**
     * HÀM HIỂN THỊ: Lấy dữ liệu phần thưởng để hiển thị cho Frontend
     * Hàm này chỉ đọc dữ liệu đã được xử lý, không tính toán gì nặng.
     */
    public function getRewardSummary(User $user): array
    {

        $progress = Result::firstOrCreate(['user_id' => $user->id]);

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
