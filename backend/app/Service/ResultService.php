<?php
namespace App\Service;

use App\Models\Result;
use App\Models\Completion;
use Carbon\Carbon;
use App\Models\User;

class ResultService
{
    // HÀM CẬP NHẬT TIẾN TRÌNH HỌC TẬP
    public function updateProgress(int $userId): Result
    {
        //Lấy data hoàn thành btap của hs từ completion
        $completions = Completion::where('user_id', $userId)
            ->where('status','completed')
            ->get();

        //Tính tổng các dữ liệu
        $lessonCompleted = $completions->where('completable_type', 'Lesson')->count();
        $exerciseCompleted = $completions->where('completable_type', 'Exercise')->count();
        $gameCompleted = $completions->where('completable_type', 'Game')->count();
        $totalStars = $completions->sum('stars');


        //Tính level: 100 sao = 1 level
        $level = max(1, floor($totalStars / 100) + 1);


        //Tính streak
        $streak = $this->caculateStreak($userId);

        //Cập nhật hoặc tạo mới
        $result = Result::updateOrCreate(
            ['user_id' => $userId],
            [
                'stars' => $totalStars,
                'level' => $level,
                'lesson_completed' => $lessonCompleted,
                'exercises_completed' => $exerciseCompleted,
                'games_completed' => $gameCompleted,
                'streak_days' => $streak,
                'last_updated' => Carbon::now()
            ]
        );
        return $result;
    }

    // HÀM TÍNH TOÁN STREAK: kiểm tra ngày completed_at có liên tiếp không
    public function calculateStreak(int $userId): int
    {
        $days = Completion::where('user_id', $userId)
            ->where('status', 'completed')
            ->orderBy('completed_at','desc')
            ->pluck('completed_at')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->unique()
            ->value();

        if (!$days) {
            return 0;
        }

        $streak = 1;
        $currentDate = Carbon::today();

        foreach ($days as $day) {
            if ($day === $currentDate->toDateString()) {
                //Hôm nay có vào học --> giữ nguyên streak
            } elseif ($day === $currentDate->copy()->subDay()->toDateString()) {
                $streak++;
                $currentDate = $currentDate->subDay();
            } else {
                break; // đứt chuỗi
            }
        }

        return $streak;
    }

    //BÁO CÁO TIẾN ĐỘ HỌC TẬP
    public function getLearningReport(User $student): array
    {
        /*
        //lấy data của completions
        $completions = Completion::where('user_id', $student->id)->get();

        // Tính toán các thông tin cần thiết cho báo cáo
        $return = [
            'lessons_completed'   => $completions->where('completable_type', 'Lesson')->count(),
            'exercises_completed' => $completions->where('completable_type', 'Exercise')->count(),
            'games_completed'     => $completions->where('completable_type', 'Game')->count(),
            'average_score'       => round($completions->avg('score'), 2),
            'stars_total'         => $completions->sum('stars'),
        ];
        return $return->toArray();*/

        // lấy data từ result
        $result = Result::where('user_id', $student->id)->first();

        if (!$result) {
            return  [
                'stars' => 0,
                'level' => 1,
                'streak_days' => 0,
                'lessons_completed' => 0,
                'exercises_completed' => 0,
                'games_completed' => 0,
            ];
        }

        return $result->toArray();

    }
}
