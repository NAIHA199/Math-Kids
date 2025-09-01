<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Grade;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $grades = Grade::all();

        foreach ($grades as $grade) {
            for ($i = 1; $i <= 2; $i++) {
                Lesson::create([
                    'title' => "Bài học $i - {$grade->name}",
                    'grade_id' => $grade->id,
                    'subject' => 'Toán',
                    'description' => "Mô tả bài học $i cho {$grade->name}",
                ]);
            }
        }
    }
}
