<?php

namespace App\Http\Controllers;

use App\Models\Completion;
use App\Models\Lesson;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompletionController extends Controller
{
    /**
     * Chuẩn hóa type ngắn ('lesson'/'exercise') -> FQCN model.
     */
    private function normalizeType(string $type): string
    {
        $t = strtolower($type);
        return match ($t) {
            'lesson', 'lessons'     => Lesson::class,
            'exercise', 'exercises' => Exercise::class,
            default => $type, // cho phép truyền thẳng FQCN nếu muốn
        };
    }

    /**
     * Tạo/cập nhật tiến trình (progress) hoặc điểm (score).
     * - Dùng cho cả lesson (progress) và exercise (score).
     * - Nếu progress/score = 100 thì tự set status = completed.
     *
     * Body JSON:
     *  {
     *    "type": "lesson" | "exercise",
     *    "id": 123,
     *    "progress": 0..100,    // optional, chủ yếu cho lesson
     *    "score": 0..100        // optional, chủ yếu cho exercise
     *  }
     */
    public function upsert(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'id'   => 'required|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'score'    => 'nullable|integer|min:0|max:100',
            'user_id'  => 'nullable|exists:users,id', // cho dev/test khi chưa login
        ]);

        $type = $this->normalizeType($data['type']);
        $userId = Auth::id() ?? ($data['user_id'] ?? null);
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated or user_id missing'], 401);
        }

        $completion = Completion::updateOrCreate(
            [
                'user_id' => $userId,
                'completable_type' => $type,
                'completable_id' => $data['id'],
            ],
            [
                // chỉ cập nhật các field có truyền vào
                'progress' => array_key_exists('progress', $data) ? $data['progress'] : \DB::raw('progress'),
                'score'    => array_key_exists('score', $data)    ? $data['score']    : \DB::raw('score'),
            ]
        );

        // Nếu có progress/score = 100 thì đánh completed
        $justCompleted = false;
        if (!is_null($completion->score) && (int)$completion->score === 100) {
            $completion->status = 'completed';
            $completion->completed_at = now();
            $justCompleted = true;
        }
        if (!is_null($completion->progress) && (int)$completion->progress === 100) {
            $completion->status = 'completed';
            $completion->completed_at = now();
            $justCompleted = true;
        }

        // Tính sao theo quy tắc
        $completion->recalcStars();
        $completion->save();

        return response()->json([
            'message' => $justCompleted ? 'Completed and saved' : 'Progress saved',
            'completion' => $completion
        ], 200);
    }

    /**
     * Đánh dấu hoàn thành thủ công (nếu frontend bấm nút "Hoàn thành").
     * Body:
     *  {
     *    "type": "lesson" | "exercise",
     *    "id": 123,
     *    "progress": 0..100,  // optional
     *    "score": 0..100      // optional
     *  }
     */
    public function markComplete(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'id'   => 'required|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'score'    => 'nullable|integer|min:0|max:100',
            'user_id'  => 'nullable|exists:users,id',
        ]);

        $type = $this->normalizeType($data['type']);
        $userId = Auth::id() ?? ($data['user_id'] ?? null);
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated or user_id missing'], 401);
        }

        $completion = Completion::updateOrCreate(
            [
                'user_id' => $userId,
                'completable_type' => $type,
                'completable_id' => $data['id'],
            ],
            [
                'progress' => array_key_exists('progress', $data) ? $data['progress'] : \DB::raw('progress'),
                'score'    => array_key_exists('score', $data)    ? $data['score']    : \DB::raw('score'),
                'status'   => 'completed',
                'completed_at' => now(),
            ]
        );

        $completion->recalcStars();
        $completion->save();

        return response()->json([
            'message' => 'Marked as completed',
            'completion' => $completion
        ], 200);
    }

    /**
     * Lấy tất cả completion của user (filter theo type nếu có).
     * Query: ?type=lesson|exercise
     */
    public function myCompletions(Request $request)
    {
        $type = $request->query('type');
        $userId = Auth::id() ?? $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated or user_id missing'], 401);
        }

        $query = Completion::where('user_id', $userId)->orderByDesc('updated_at');

        if ($type) {
            $query->where('completable_type', $this->normalizeType($type));
        }

        return $query->get();
    }

    /**
     * Lấy completion của 1 item cho user hiện tại.
     */
    public function showForItem(Request $request, string $type, int $id)
    {
        $userId = Auth::id() ?? $request->query('user_id');
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated or user_id missing'], 401);
        }

        $completion = Completion::where([
            'user_id' => $userId,
            'completable_type' => $this->normalizeType($type),
            'completable_id' => $id,
        ])->first();

        return $completion ?: response()->json(null, 204); // No Content
    }
}
