<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reward;

class RewardSeeder extends Seeder
{
    public function run(): void
    {
        $rewards = [
            // Category: Học tập
            [
                'name' => 'Hoàn thành 10 bài học',
                'category' => 'learning',
                'description' => 'Nhận được khi hoàn thành 10 bài học',
                'requirement' => 'lesson_completed >= 10',
            ],
            [
                'name' => 'Hoàn thành 20 bài tập',
                'category' => 'learning',
                'description' => 'Nhận được khi hoàn thành 20 bài tập',
                'requirement' => 'exercises_completed >= 20',
            ],

            // Category: Thành tích
            [
                'name' => 'Đạt 500 sao',
                'category' => 'achievement',
                'description' => 'Tích lũy đủ 500 sao',
                'requirement' => 'stars >= 500',
            ],
            [
                'name' => 'Cấp độ 5',
                'category' => 'achievement',
                'description' => 'Đạt cấp độ 5',
                'requirement' => 'level >= 5',
            ],

            // Category: Chuỗi ngày
            [
                'name' => 'Chuỗi 7 ngày',
                'category' => 'streak',
                'description' => 'Duy trì streak 7 ngày học liên tiếp',
                'requirement' => 'streak_days >= 7',
            ],
            [
                'name' => 'Chuỗi 30 ngày',
                'category' => 'streak',
                'description' => 'Duy trì streak 30 ngày học liên tiếp',
                'requirement' => 'streak_days >= 30',
            ],

            // Category: Trò chơi
            [
                'name' => 'Hoàn thành 5 màn trò chơi',
                'category' => 'games',
                'description' => 'Nhận khi hoàn thành 5 mini game',
                'requirement' => 'games_completed >= 5',
            ],
            [
                'name' => 'Vua trò chơi',
                'category' => 'games',
                'description' => 'Hoàn thành 20 mini game',
                'requirement' => 'games_completed >= 20',
            ],
        ];

        foreach ($rewards as $reward) {
            Reward::updateOrCreate(
                ['name' => $reward['name']], // tránh seed trùng
                $reward
            );
        }
    }
}
