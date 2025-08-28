<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // Lấy danh sách bài học (chỉ thông tin cơ bản)
    public function index()
    {
        return Lesson::select('id', 'title', 'subject', 'description', 'grade_id')
            ->withCount(['sections', 'exercises']) // Đếm số sections, exercises
            ->get();
    }

    // Lấy chi tiết 1 bài học kèm ảnh
    public function show($id)
    {
        $lesson = Lesson::with('images')->findOrFail($id);
        return $lesson;
    }

    // Lấy bài học đầy đủ: sections, exercises, images
    public function getLessonFull($id)
    {
        $lesson = Lesson::with([
            'sections.images',    // Ảnh trong section
            'exercises.images',   // Ảnh trong bài tập
            'images'              // Ảnh của bài học
        ])->findOrFail($id);

        return $lesson;
    }

    // Tạo mới bài học
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'subject' => 'nullable|string',
            'description' => 'nullable|string',
            'grade_id' => 'nullable|exists:grades,id',
        ]);

        $lesson = Lesson::create($data);
        return response()->json(['message' => 'Lesson created', 'lesson' => $lesson], 201);
    }

    // Cập nhật bài học
    public function update(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|string',
            'subject' => 'nullable|string',
            'description' => 'nullable|string',
            'grade_id' => 'nullable|exists:grades,id',
        ]);

        $lesson->update($data);
        return response()->json(['message' => 'Lesson updated', 'lesson' => $lesson], 200);
    }

    // Xóa bài học
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted'], 200);
    }
}
