<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    // Lấy danh sách section cho 1 bài học
    public function index($lessonId)
    {
        return Section::where('lesson_id', $lessonId)->with('images')->get();
    }

    // Lấy 1 section kèm ảnh
    public function show($id)
    {
        return Section::with('images')->findOrFail($id);
    }

    // Tạo section mới
    public function store(Request $request)
    {
        $data = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'type' => 'required|string',
            'title' => 'required|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        $section = Section::create($data);
        return response()->json(['message' => 'Section created', 'section' => $section], 201);
    }

    // Cập nhật section
    public function update(Request $request, $id)
    {
        $section = Section::findOrFail($id);

        $data = $request->validate([
            'type' => 'sometimes|string',
            'title' => 'sometimes|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        $section->update($data);
        return response()->json(['message' => 'Section updated', 'section' => $section], 200);
    }

    // Xóa section
    public function destroy($id)
    {
        $section = Section::findOrFail($id);
        $section->delete();

        return response()->json(['message' => 'Section deleted'], 200);
    }
}
