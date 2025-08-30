<?php

namespace App\Http\Controllers;

use App\Services\ProgressService;
use Illuminate\Http\Request;

class CompletionController extends Controller
{
    protected $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    public function completeLesson(Request $request)
    {
        $request->validate([
            'lesson_id' => 'required|integer',
            'progress'  => 'required|integer|min:0|max:100',
        ]);

        $completion = $this->progressService->recordCompletion(
            $request->user()->id,
            'App\\Models\\Lesson',
            $request->lesson_id,
            null,
            $request->progress
        );

        return response()->json(['message' => 'Lesson completed', 'completion' => $completion]);
    }

    public function completeExercise(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|integer',
            'score'       => 'required|integer|min:0|max:100',
        ]);

        $completion = $this->progressService->recordCompletion(
            $request->user()->id,
            'App\\Models\\Exercise',
            $request->exercise_id,
            $request->score,
            null
        );

        return response()->json(['message' => 'Exercise completed', 'completion' => $completion]);
    }
}
