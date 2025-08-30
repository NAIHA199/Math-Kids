<?php
namespace App\Service;

use App\Models\Result;
use App\Models\Completion;
use Carbon\Carbon;

class ResultService
{
    // Cập nhật tiến trình học tập
    public function updateProgress(User $user, string $type)
    {
        // Tìm kết quả hiện tại của người dùng
        $result = Result::firstOrCreate(['user_id' => $user->id], [
            'stars' => 0,
            'level' => 1,
            'streak_days' => 0,
            'lessons_completed'   => 0,
            'exercises_completed' => 0,
            'games_completed'     => 0,
            'last_updated'        => Carbon::now(),
        ]);
        // Tăng số sao lên 1
        $result->stars += 1;

        //kiểm tra level
        if ($result->stars >= 100) {
            $result->level += floor($result->stars / 100);
            $result->stars = $result->stars % 100; // giữ lại số sao bị dư khi lên level và sẽ được chuyển sang level tiếp theo
        }
        // Cập nhật tiến trình dựa trên type
        switch ($type) {
            case 'lesson':
                $result->lessons_completed += 1;
                break;
            case 'exercise':
                $result->exercises_completed += 1;
                break;
            case 'game':
                $result->games_completed += 1;
                break;
        }

        //Cập nhật streak
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        if ($result->last_updated->isSameDay($today)) {
            // Đã cập nhật trong ngày hôm nay, không thay đổi streak
        } elseif ($result->last_updated->isSameDay($yesterday)) {
            // Cập nhật vào ngày hôm qua, tăng streak
            $result->streak_days += 1;
        } else {
            // Không cập nhật trong hai ngày liên tiếp, reset streak
            $result->streak_days = 1;
        }
        $result->save();
        return $result;
    }

    //Báo cáo tiến độ của học sinh

    public function getLearningReport(User $student): array
    {
        $completions = Completion::where('user_id', $student->id)->get();

        // Tính toán các thông tin cần thiết cho báo cáo
        $return = [
            'lessons_completed'   => $completions->where('completable_type', 'Lesson')->count(),
            'exercises_completed' => $completions->where('completable_type', 'Exercise')->count(),
            'games_completed'     => $completions->where('completable_type', 'Game')->count(),
            'average_score'       => round($completions->avg('score'), 2),
            'stars_total'         => $completions->sum('stars'),
        ];

    }
}
