<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function index()
    {
        return Lesson::select('id', 'title', 'subject', 'description', 'grade_id')
            ->withCount(['sections'])
            ->get();
    }

    public function show($id)
    {
        $lesson = Lesson::with('sections')->find($id);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        return response()->json([
            'id' => $lesson->id,
            'title' => $lesson->title,
            'description' => $lesson->description,
            'sections' => $lesson->sections->map(function ($section) {
                return [
                    'id' => $section->id,
                    'title' => $section->title,
                    'type' => $section->type ?? 'intro',
                    'content' => $section->content,
                    'video_url' => $section->video_url ?? null,
                    'questions' => $section->questions 
                        ? json_decode($section->questions, true) 
                        : []
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'subject' => 'nullable|string',
            'description' => 'nullable|string',
            'grade_id' => 'nullable|exists:grades,id',
            'sections' => 'nullable|array',
            'sections.*.title' => 'required|string',
            'sections.*.content' => 'nullable|string',
            'sections.*.type' => 'nullable|string',
            'sections.*.video_url' => 'nullable|string',
            'sections.*.questions' => 'nullable|array',
        ]);

        DB::beginTransaction();
        try {
            $sectionsData = $data['sections'] ?? [];
            unset($data['sections']);

            $lesson = Lesson::create($data);

            if (!empty($sectionsData)) {
                foreach ($sectionsData as $sectionItem) {
                    if (isset($sectionItem['questions'])) {
                        $sectionItem['questions'] = json_encode($sectionItem['questions']);
                    }
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

    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted'], 200);
    }
}
