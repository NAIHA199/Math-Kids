<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // Lấy danh sách bài học cơ bản
    public function index()
    {
        return Lesson::select('id', 'title', 'subject', 'description')->get();
    }

    // Lấy 1 bài học kèm ảnh
    public function show($id)
    {
        $lesson = Lesson::with('images')->findOrFail($id);
        return $lesson;
    }

    // Lấy bài học đầy đủ: sections, exercises, images
    public function getLessonFull($id)
    {
        $lesson = Lesson::with([
            'sections.images',   // Ảnh trong section
            'exercises.images',  // Ảnh trong bài tập
            'images'             // Ảnh của bài học
        ])->findOrFail($id);

        return $lesson;
    }
}
