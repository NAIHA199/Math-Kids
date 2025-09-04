<?php

namespace App\Services;

use App\Models\Completion;
use App\Models\Game;
use App\Models\Result;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Reward;
use App\Models\StudentAchievement;
class ResultService
{
    /**
     * Tính toán/lưu lại kết quả tổng hợp cho 1 user (recompute).
     * Trả về instance Result.
     */
    public function recomputeForUser(int $userId): Result
    {

        // Tổng số sao từ tất cả completions (games, lessons, exercises)
        $starsTotal = Completion::where('user_id', $userId)
            ->sum('stars');

        // Số game hoàn thành
        $gamesCompleted = Completion::where('user_id', $userId)
            ->where('completable_type', Game::class)
            ->where('status', 'completed')
            ->count();

        // **Quan trọng:** định nghĩa $level trước khi dùng (để tránh "Undefined variable")
        $level = intdiv($starsTotal, 50);

        // Tính streak (logic tạm thời: dựa trên hoạt động không phải game; có thể tùy chỉnh)
        $streak = $this->computeStreak($userId);

        $this->unlockRewards($userId, $starsTotal, $level, $streak, $gamesCompleted);
        // Lưu/update trong transaction
        return DB::transaction(function () use ($userId, $starsTotal, $level, $streak, $gamesCompleted) {
            $result = Result::firstOrNew(['user_id' => $userId]);

            $result->stars = $starsTotal;
            $result->level = $level;
            $result->streak_days = $streak;
            $result->games_completed = $gamesCompleted;
            $result->save();


            return $result;
        });
    }

    /**
     * Alias để ProgressService gọi (nếu ProgressService truyền object User).
     */
    public function updateProgress(User $user): Result
    {
        return $this->recomputeForUser($user->id);

    }

    /**
     * Tính streak dựa trên các completion "học" (không tính game).
     * Quy tắc hiện tại: đếm số ngày liên tiếp có activity; nếu gap > 24h thì dừng.
     */
    public function computeStreak(int $userId): int
    {
        // Lấy danh sách ngày (YYYY-MM-DD) có completed activity, loại trừ Game
        $dates = Completion::where('user_id', $userId)
            ->where('status', 'completed')
            ->where('completable_type', '!=', Game::class)
            ->pluck('completed_at')
            ->filter()
            ->map(function ($dt) {
                return Carbon::parse($dt)->setTimezone(config('app.timezone'))->toDateString();
            })
            ->unique()
            ->sortDesc()
            ->values();

        if ($dates->isEmpty()) {
            return 0;
        }

        $streak = 0;
        $previousDate = null;

        foreach ($dates as $dateString) {
            $date = Carbon::createFromFormat('Y-m-d', $dateString, config('app.timezone'))->startOfDay();

            if ($previousDate === null) {
                $previousDate = $date;
                $streak = 1;
                continue;
            }

            // Nếu khoảng cách giữa previousDate và current date <= 24 giờ -> tính tiếp
            $diffHours = $previousDate->diffInHours($date);

            if ($diffHours <= 24) {
                $streak++;
                $previousDate = $date;
            } else {
                break;
            }
        }

        return $streak;
    }



    protected function unlockRewards(
        int $userId,
        int $stars,
        int $level,
        int $streak,
        int $gamesCompleted
    ): void {
        $rewards = Reward::all();

        foreach ($rewards as $reward) {
            $requirement = $reward->requirement;
            $unlock = false;

            // ✅ Parse requirement
            if (str_starts_with($requirement, 'lesson_completed')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $this->countLessonsCompleted($userId) >= $target;
            }

            if (str_starts_with($requirement, 'exercises_completed')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $this->countExercisesCompleted($userId) >= $target;
            }

            if (str_starts_with($requirement, 'stars')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $stars >= $target;
            }

            if (str_starts_with($requirement, 'level')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $level >= $target;
            }

            if (str_starts_with($requirement, 'streak_days')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $streak >= $target;
            }

            if (str_starts_with($requirement, 'games_completed')) {
                $target = (int) filter_var($requirement, FILTER_SANITIZE_NUMBER_INT);
                $unlock = $gamesCompleted >= $target;
            }

            // ✅ Nếu user đạt điều kiện thì gán reward
            if ($unlock) {
                StudentReward::firstOrCreate(
                    [
                        'student_id' => $userId,
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
     * Tạo báo cáo đơn giản cho phụ huynh: achievements + recent completions
     */
    public function buildParentReport(int $userId): array
    {
        $result = Result::where('user_id', $userId)->first();
        $recent = Completion::where('user_id', $userId)
            ->orderByDesc('completed_at')
            ->limit(20)
            ->get(['completable_type', 'completable_id', 'status', 'stars', 'completed_at']);

        return [
            'achievements' => [
                'stars'  => $result->stars ?? 0,
                'level'  => $result->level ?? 0,
                'streak' => $result->streak_days ?? 0,
            ],
            'games_completed' => $result->games_completed ?? 0,
            'recent' => $recent,
        ];
    }


}
