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
     * Ghi nhận một hoạt động (Lesson, Game, Exercise) đã hoàn thành.
     * Lưu số sao cao nhất vào completions.
     */
    public function upsert(Request $request): JsonResponse
    {
        $data = $request->validate([
            'completable_type' => 'required|string', // 'Lesson', 'Game', 'Exercise'
            'completable_id'   => 'required|integer',
            'stars'            => 'required|integer|min:0', // tổng số sao đạt được
        ]);

        $user = $request->user();
        $completableTypeClass = '' . ucfirst($data['completable_type']);
        $starsToAward = $data['stars'];

        // Ghi nhận completion qua ProgressService
        $completion = $this->progressService->recordCompletion(
            $user,
            $completableTypeClass,
            $data['completable_id'],
            $starsToAward
        );

        return response()->json([
            'success' => true,
            'message' => "Hoạt động đã được lưu với {$completion->stars} sao.",
            'data'    => $completion
        ]);
    }

    /**
     * Danh sách tất cả hoạt động đã hoàn thành của user
     */
    public function index(Request $request): JsonResponse
    {
        $completions = $this->progressService->getCompletionsForUser($request->user());
        return response()->json(['success' => true, 'data' => $completions]);
    }

    /**
     * Trạng thái hoàn thành của một item cụ thể
     */
    public function show(Request $request, string $type, int $id): JsonResponse
    {
        $completableTypeClass = 'App\\Models\\' . ucfirst($type);
        $completion = $this->progressService->getCompletionForItem(
            $request->user(),
            $completableTypeClass,
            $id
        );

        return response()->json(['success' => true, 'data' => $completion]);
    }
}
