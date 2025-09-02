<?php

// database/seeders/GameSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder {
    public function run(): void {
        $games = [
            [
                'slug' => 'meteorite-guardian',
                'icon' => '☄️',
                'name' => 'Vệ Binh Thiên Thạch',
                'description' => 'Bắn thiên thạch chứa đáp án đúng để bảo vệ hành tinh.',
                'min_points' => 100,
                'is_active' => true
            ],
            [
                'slug' => 'space-race',
                'icon' => '🚀',
                'name' => 'Cuộc Đua Xuyên Không',
                'description' => 'Trả lời đúng để tăng tốc phi thuyền và về đích trước.',
                'min_points' => 100,
                'is_active' => true
            ],
            [
                'slug' => 'galaxy-defense',
                'icon' => '🗼',
                'name' => 'Phòng Tuyến Ngân Hà',
                'description' => 'Xây tháp phòng thủ chiến lược để chặn các đợt quái vật.',
                'min_points' => 100,
                'is_active' => true
            ],
            [
                'slug' => 'math-plane-shooter',
                'icon' => '✈️',
                'name' => 'Bắn Máy Bay Toán Học',
                'description' => 'Điều khiển máy bay và bắn hạ kẻ địch bằng các phép toán.',
                'min_points' => 100,
                'is_active' => true
            ],
        ];

        foreach ($games as $game) {
            Game::updateOrCreate(['slug' => $game['slug']], $game);
        }
    }
}
