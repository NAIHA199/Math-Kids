<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Completion;
use Carbon\Carbon;

class CompletionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = 1; // Giả sử user id = 1, bạn có thể thay đổi sau

        // 1. Chưa hoàn thành (lesson)
        Completion::create([
            'user_id'          => $userId,
            'completable_type' => 'lesson',
            'completable_id'   => 1,
            'progress'         => 20,
            'score'            => null,
            'status'           => 'in_progress',
            'stars'            => 0,
            'completed_at'     => null,
        ]);

        // 2. Hoàn thành 100% (lesson)
        Completion::create([
            'user_id'          => $userId,
            'completable_type' => 'lesson',
            'completable_id'   => 2,
            'progress'         => 100,
            'score'            => 100,
            'status'           => 'completed',
            'stars'            => 1,
            'completed_at'     => Carbon::now(),
        ]);

        // 3. Đang làm dở (exercise)
        Completion::create([
            'user_id'          => $userId,
            'completable_type' => 'exercise',
            'completable_id'   => 3,
            'progress'         => 50,
            'score'            => 40,
            'status'           => 'in_progress',
            'stars'            => 0,
            'completed_at'     => null,
        ]);

        // 4. Game đang chơi dở
        Completion::create([
            'user_id'          => $userId,
            'completable_type' => 'game',
            'completable_id'   => 1,
            'progress'         => 60,
            'score'            => 70,
            'status'           => 'in_progress',
            'stars'            => 0,
            'completed_at'     => null,
        ]);

        // 5. Game đã hoàn thành
        Completion::create([
            'user_id'          => $userId,
            'completable_type' => 'game',
            'completable_id'   => 2,
            'progress'         => 100,
            'score'            => 100,
            'status'           => 'completed',
            'stars'            => 1,
            'completed_at'     => Carbon::now(),
        ]);
    }
}
