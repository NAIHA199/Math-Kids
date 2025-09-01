<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Grade;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy danh sách grade_id hiện có
        $gradeIds = Grade::pluck('id')->toArray();

        if (empty($gradeIds)) {
            $gradeIds[] = Grade::create(['name' => 'Grade 1'])->id;
        }

        $users = [
            ['fullName' => 'Prof. Alexandre Marquardt', 'email' => 'bking@example.org', 'username' => 'mclaughlin.roslyn', 'role' => 'student'],
            ['fullName' => 'Danielle Abbott IV', 'email' => 'stamm.brenda@example.net', 'username' => 'zulauf.raymond', 'role' => 'student'],
            ['fullName' => 'Winston Schaefer', 'email' => 'napoleon43@example.org', 'username' => 'brown.justen', 'role' => 'parent'],
            ['fullName' => 'Caleigh Gutmann', 'email' => 'torphy.cooper@example.net', 'username' => 'humberto.cruickshank', 'role' => 'teacher'],
        ];

        foreach ($users as $user) {
            User::create([
                'fullName' => $user['fullName'],
                'email' => $user['email'],
                'username' => $user['username'],
                'password' => Hash::make('password123'),
                'remember_token' => str()->random(10),
                'role' => $user['role'],
                'grade_id' => $gradeIds[array_rand($gradeIds)], // Random grade id hợp lệ
            ]);
        }
    }
}
