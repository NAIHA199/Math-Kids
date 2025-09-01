<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Section;
use App\Models\Lesson;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = Lesson::all();

        if ($lessons->isEmpty()) {
            $lessons = collect([
                Lesson::create(['title' => 'Default Lesson', 'subject' => 'Math', 'description' => 'Intro lesson'])
            ]);
        }

        foreach ($lessons as $lesson) {
            for ($i = 1; $i <= 3; $i++) {
                Section::create([
                    'lesson_id' => $lesson->id,
                    'title' => 'Section 1 for ' . $lesson->title,
                    'content' => 'This is the content for Section 1 in lesson ' . $lesson->title,
                    'type' => 'video', // hoặc 'text', 'quiz' tùy thiết kế
                ]);

            }
        }
    }
}
