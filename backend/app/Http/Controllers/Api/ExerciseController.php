<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExerciseController extends Controller
{
    // Lấy danh sách tất cả bài tập
    public function index()
    {
        $user = Auth::user(); // user hiện tại
        $exercises = Exercise::with('completions')->get();

        $data = $exercises->map(function ($exercise) use ($user) {
            $completion = $exercise->completions()->where('user_id', $user->id)->first();
            return [
                'id' => $exercise->id,
                'title' => $exercise->title,
                'lesson_id' => $exercise->lesson_id,
                'type' => $exercise->type,
                'description' => $exercise->description,
                'questions' => $exercise->questions,
                'completed' => $completion ? true : false,
                'score' => $completion ? $completion->score : null,
                'difficulty' => $exercise->difficulty ?? null,
                'time' => $exercise->time ?? null,
                'category' => $exercise->type, // dùng type làm category
            ];
        });

        return response()->json($data);
    }

    // Lấy chi tiết 1 bài tập
    public function show(Exercise $exercise)
    {
        $user = Auth::user();
        $completion = $exercise->completions()->where('user_id', $user->id)->first();

        $data = [
            'id' => $exercise->id,
            'title' => $exercise->title,
            'lesson_id' => $exercise->lesson_id,
            'type' => $exercise->type,
            'description' => $exercise->description,
            'questions' => $exercise->questions,
            'completed' => $completion ? true : false,
            'score' => $completion ? $completion->score : null,
            'difficulty' => $exercise->difficulty ?? null,
            'time' => $exercise->time ?? null,
            'category' => $exercise->type,
        ];

        return response()->json($data);
    }

    // Tạo bài tập mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'lesson_id' => 'required|exists:lessons,id',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'difficulty' => 'nullable|string',
            'time' => 'nullable|string',
        ]);

        $exercise = Exercise::create($validated);

        return response()->json($exercise, 201);
    }

    // Cập nhật bài tập
    public function update(Request $request, Exercise $exercise)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'lesson_id' => 'sometimes|exists:lessons,id',
            'type' => 'sometimes|string',
            'description' => 'nullable|string',
            'questions' => 'sometimes|array',
            'difficulty' => 'sometimes|string',
            'time' => 'sometimes|string',
        ]);

        $exercise->update($validated);

        return response()->json($exercise);
    }

    // Xóa bài tập
    public function destroy(Exercise $exercise)
    {
        $exercise->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
