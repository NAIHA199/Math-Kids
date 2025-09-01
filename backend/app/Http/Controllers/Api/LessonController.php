<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    // Lấy danh sách bài học (chỉ thông tin cơ bản + đếm sections, exercises)
    public function index()
    {
        return Lesson::select('id', 'title', 'subject', 'description', 'grade_id')
            ->withCount(['sections', 'exercises'])
            ->get();
    }

    // Lấy chi tiết 1 bài học kèm ảnh
    public function show($id)
    {
        return Lesson::with('images')->findOrFail($id);
    }

    // Lấy bài học đầy đủ: sections, exercises, images
    public function getLessonFull($id)
    {
        return Lesson::with([
            'sections.images',
            'exercises.images',
            'images'
        ])->findOrFail($id);
    }

    // Tạo mới bài học (hỗ trợ nhập tay hoặc tải file)
    public function store(Request $request)
    {
        // Validate dữ liệu cơ bản của bài học
        $lessonData = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'grade_id' => 'nullable|exists:grades,id',
        ]);

        // Xử lý trường hợp tải file lên (chưa triển khai)
        if ($request->hasFile('lesson_file')) {
            return response()->json(['message' => 'Tính năng tải file đang được phát triển.'], 422);
        }

        // Validate sections nếu nhập tay
        $sectionsData = $request->validate([
            'sections' => 'sometimes|array',
            'sections.*.title' => 'required|string|max:255',
            'sections.*.type' => 'required|string|in:content,video,quiz',
            'sections.*.content' => 'nullable|string',
            'sections.*.video_url' => 'nullable|url',
            'sections.*.duration' => 'nullable|integer|min:0',
        ])['sections'] ?? [];

        try {
            DB::beginTransaction();

            // Tạo bài học
            $lesson = Lesson::create($lessonData);

            // Tạo sections nếu có
            if (!empty($sectionsData)) {
                foreach ($sectionsData as $sectionItem) {
                    $lesson->sections()->create($sectionItem);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Lesson created successfully!',
                'lesson' => $lesson->load('sections')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create lesson.',
                'error' => $e->getMessage()
            ], 500);
        }
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
