<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reward;

class RewardSeeder extends Seeder
{
    public function run(): void
    {
        $rewards = [
            // Học tập
            [
                'name' => 'Hoàn thành 10 bài học',
                'category' => 'learning',
                'description' => 'Nhận được khi hoàn thành 10 bài học',
                'field' => 'lesson_completed',
                'value' => 10,
            ],
            [
                'name' => 'Hoàn thành 20 bài tập',
                'category' => 'learning',
                'description' => 'Nhận được khi hoàn thành 20 bài tập',
                'field' => 'exercises_completed',
                'value' => 20,
            ],

            // Thành tích
            [
                'name' => 'Đạt 500 sao',
                'category' => 'achievement',
                'description' => 'Tích lũy đủ 500 sao',
                'field' => 'stars',
                'value' => 500,
            ],
            [
                'name' => 'Cấp độ 5',
                'category' => 'achievement',
                'description' => 'Đạt cấp độ 5',
                'field' => 'level',
                'value' => 5,
            ],

            // Chuỗi ngày
            [
                'name' => 'Chuỗi 7 ngày',
                'category' => 'streak',
                'description' => 'Duy trì streak 7 ngày học liên tiếp',
                'field' => 'streak_days',
                'value' => 7,
            ],
            [
                'name' => 'Chuỗi 30 ngày',
                'category' => 'streak',
                'description' => 'Duy trì streak 30 ngày học liên tiếp',
                'field' => 'streak_days',
                'value' => 30,
            ],

            // Trò chơi
            [
                'name' => 'Vua trò chơi',
                'category' => 'games',
                'description' => 'Hoàn thành 4 mini game',
                'field' => 'games_completed',
                'value' => 4,
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
