<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProgressService;
use Illuminate\Http\JsonResponse;


class CompletionController extends Controller
{
    protected $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    // Thêm hoặc cập nhật tiến trình / điểm
    public function upsert(Request $request): JsonResponse
    {
        $data = $request->validate([
            'completable_type' => 'required|string',
            'completable_id'   => 'required|integer',
            'progress'         => 'nullable|integer|min:0|max:100',
            'score'            => 'nullable|integer|min:0|max:100'
        ]);

        // Lưu hoặc cập nhật completion
        $completion = $this->progressService->upsertCompletion(
            $request->user()->id,
            $data['completable_type'],
            $data['completable_id'],
            $data['progress'] ?? null,
            $data['score'] ?? null
        );

        // Tự động set sao + trạng thái hoàn thành nếu đủ điều kiện
        if (($completion->progress == 100) || ($completion->score == 100)) {
            $completion->status = 'completed';
            $completion->completed_at = now();
            $completion->stars = 1;
            $completion->save();
        }

        return response()->json(['success' => true, 'data' => $completion]);
    }

    // Đánh dấu hoàn thành khi ấn nút Hoàn thành
    public function markComplete(Request $request): JsonResponse
    {
        $data = $request->validate([
            'completable_type' => 'required|string',
            'completable_id'   => 'required|integer'
        ]);

        // Gọi service để đánh dấu hoàn thành
        $completion = $this->progressService->markAsCompleted(
            $request->user()->id,
            $data['completable_type'],
            $data['completable_id']
        );

        return response()->json(['success' => true, 'data' => $completion]);
    }

    // Lấy danh sách completion của user hiện tại
    public function myCompletions(Request $request): JsonResponse
    {
        $completions = $this->progressService->getCompletionsForUser($request->user()->id);
        return response()->json(['data' => $completions]);
    }

    // Lấy completion của một item cụ thể
    public function showForItem(Request $request, $type, $id): JsonResponse
    {
        $completion = $this->progressService->getCompletionForItem(
            $request->user()->id,
            $type,
            $id
        );
        return response()->json(['data' => $completion]);
    }
}
