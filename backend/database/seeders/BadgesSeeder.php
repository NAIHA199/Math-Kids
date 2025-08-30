<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BadgesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('badges')->insert([
            [
                'name' => 'Hoàn thành bài học đầu tiên',
                'description' => 'Nhận được khi hoàn thành 1 bài học',
                'category' => 'learning',
                'requirement' => '1 bài học',
                'color' => 'from-green-400 to-blue-500',
                'icon' => 'FaBook',
            ],
            [
                'name' => 'Chuỗi 3 ngày',
                'description' => 'Đăng nhập 3 ngày liên tiếp',
                'category' => 'streak',
                'requirement' => '3 ngày liên tiếp',
                'color' => 'from-yellow-400 to-orange-500',
                'icon' => 'FaFire',
            ]
        ]);
    }
}
