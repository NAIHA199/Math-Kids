<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    // Lấy danh sách bài tập cho 1 bài học
    public function index($lessonId)
    {
        return Exercise::where('lesson_id', $lessonId)->with('images')->get();
    }

    // Lấy 1 bài tập kèm ảnh
    public function show($id)
    {
        return Exercise::with('images')->findOrFail($id);
    }

    // Tạo bài tập mới
    public function store(Request $request)
    {
        $data = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'title' => 'required|string',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'questions' => 'nullable|json',
        ]);

        $exercise = Exercise::create($data);
        return response()->json(['message' => 'Exercise created', 'exercise' => $exercise], 201);
    }

    // Cập nhật bài tập
    public function update(Request $request, $id)
    {
        $exercise = Exercise::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|string',
            'type' => 'sometimes|string',
            'description' => 'nullable|string',
            'questions' => 'nullable|json',
        ]);

        $exercise->update($data);
        return response()->json(['message' => 'Exercise updated', 'exercise' => $exercise], 200);
    }

    // Xóa bài tập
    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();

        return response()->json(['message' => 'Exercise deleted'], 200);
    }
}
