<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;
use App\Models\Lesson;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = Lesson::all();

        foreach ($lessons as $lesson) {
            for ($i = 1; $i <= 2; $i++) {
                Exercise::create([
                    'lesson_id' => $lesson->id,
                    'title' => "Bài tập $i của {$lesson->title}",
                    'type' => 'multiple-choice',
                    'description' => "Mô tả bài tập $i",
                    'questions' => json_encode([
                        ['q' => '2+2=?', 'options' => [3, 4, 5], 'answer' => 4],
                        ['q' => '3+5=?', 'options' => [7, 8, 9], 'answer' => 8]
                    ]),
                ]);
            }
        }
    }
}
