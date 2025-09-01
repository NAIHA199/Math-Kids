<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder {
    public function run(): void {
        $games = [
            [
                'code' => 'meteorite-guardian',
                'name' => 'Vệ Binh Thiên Thạch',
                'description' => 'Bắn thiên thạch chứa đáp án đúng để bảo vệ hành tinh.',

            ],
            [
                'code' => 'space-race',
                'name' => 'Cuộc Đua Xuyên Không',
                'description' => 'Trả lời đúng để tăng tốc phi thuyền và về đích trước.',

            ],
            [
                'code' => 'galaxy-defense',
                'name' => 'Phòng Tuyến Ngân Hà',
                'description' => 'Xây tháp phòng thủ chiến lược để chặn các đợt quái vật.',

            ],
            [
                'code' => 'math-plane-shooter',
                'name' => 'Bắn Máy Bay Toán Học',
                'description' => 'Điều khiển máy bay và bắn hạ kẻ địch bằng các phép toán.',

            ],
        ];

        foreach ($games as $game) {
            Game::updateOrCreate(['code' => $game['code']], $game);
        }
    }
}
