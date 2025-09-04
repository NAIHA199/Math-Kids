<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProgressService;
use Illuminate\Http\JsonResponse;

class CompletionController extends Controller
{
    protected ProgressService $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    /**
     * Lưu hoặc cập nhật tiến trình (tính sao dựa trên progress/score)
     */
    public function upsert(Request $request): JsonResponse
    {
        $data = $request->validate([
            'completable_type' => 'required|string',
            'completable_id'   => 'required|integer',
            'progress'         => 'nullable|integer|min:0|max:100',
            'score'            => 'nullable|integer|min:0|max:100',
            'status'           => 'nullable|string',
        ]);

        $user = $request->user();
        $completableTypeClass = 'App\\Models\\' . ucfirst($data['completable_type']);

        // Gọi ProgressService → nó sẽ tự recalc stars
        $completion = $this->progressService->recordCompletion(
            $user,
            $completableTypeClass,
            $data['completable_id'],
            $data['progress'] ?? 0,
            $data['score'] ?? 0,
            $data['status'] ?? 'completed'
        );

        return response()->json([
            'success' => true,
            'message' => "Đã lưu tiến trình {$data['completable_type']}.",
            'data'    => $completion
        ]);
    }


    /**
     * Lấy tất cả tiến trình của user
     */
    public function myCompletions(Request $request): JsonResponse
    {
        $completions = $this->progressService->getCompletionsForUser($request->user());
        return response()->json(['success' => true, 'data' => $completions]);
    }

    /**
     * Lấy tiến trình của 1 bài học / bài tập
     */
    public function showForItem(Request $request, string $type, int $id): JsonResponse
    {
        $completableTypeClass = 'App\\Models\\' . ucfirst($type);
        $completion = $this->progressService->getCompletionForItem(
            $request->user(),
            $completableTypeClass,
            $id
        );

        return response()->json(['success' => true, 'data' => $completion]);
    }

    /**
     * Đánh dấu hoàn thành (mặc định 1 sao nếu không có score/progress)
     */
    public function markComplete(Request $request): JsonResponse
    {
        $data = $request->validate([
            'completable_type' => 'required|string',
            'completable_id'   => 'required|integer'
        ]);

        $user = $request->user();
        $completableTypeClass = 'App\\Models\\' . ucfirst($data['completable_type']);

        $completion = $this->progressService->recordCompletion(
            $user,
            $completableTypeClass,
            $data['completable_id'],
            1
        );

        return response()->json([
            'success' => true,
            'message' => 'Hoàn thành thành công!',
            'data' => $completion
        ]);
    }
}
