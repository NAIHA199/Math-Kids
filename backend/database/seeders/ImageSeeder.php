<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\Lesson;
use App\Models\Exercise;
use App\Models\Section;

class ImageSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = Lesson::all();
        $exercises = Exercise::all();
        $sections = Section::all();

        // Thêm ảnh cho bài học
        foreach ($lessons as $lesson) {
            Image::create([
                'imageable_id' => $lesson->id,
                'imageable_type' => Lesson::class,
                'url' => 'https://via.placeholder.com/600x400?text=Lesson+' . $lesson->id,
            ]);
        }

        // Thêm ảnh cho bài tập
        foreach ($exercises as $exercise) {
            Image::create([
                'imageable_id' => $exercise->id,
                'imageable_type' => Exercise::class,
                'url' => 'https://via.placeholder.com/600x400?text=Exercise+' . $exercise->id,
            ]);
        }

        // Thêm ảnh cho section
        foreach ($sections as $section) {
            Image::create([
                'imageable_id' => $section->id,
                'imageable_type' => Section::class,
                'url' => 'https://via.placeholder.com/600x400?text=Section+' . $section->id,
            ]);
        }
    }
}
