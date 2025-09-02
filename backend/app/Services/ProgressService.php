<?php

namespace App\Services;

use App\Models\Completion;
use App\Models\User;
use Carbon\Carbon;
use App\Services\ResultService;
class ProgressService
{
    protected ResultService $resultService;

    public function __construct(ResultService $resultService)
    {
        $this->resultService = $resultService;
    }

    /**
     * Ghi nhận hoàn thành một hoạt động (Lesson, Game, Exercise).
     * - Nếu chưa có record => tạo mới
     * - Nếu đã có => cập nhật số sao (chỉ tăng, không giảm)
     */
    public function recordCompletion(User $user, string $completableType, int $completableId, int $stars = 1): Completion
    {
        $completion = Completion::firstOrNew([
            'user_id'          => $user->id,
            'completable_type' => $completableType,
            'completable_id'   => $completableId,
        ]);

        // Nếu record mới thì gán trực tiếp
        if (!$completion->exists) {
            $completion->stars = $stars;
            $completion->status = 'completed';
            $completion->completed_at = Carbon::now();
            $completion->save();
        } else {
            // Nếu đã có → chỉ update khi số sao mới cao hơn
            if ($stars > $completion->stars) {
                $completion->stars = $stars;
                $completion->save();
            }
        }
        // Gọi ResultService để cập nhật tổng hợp tiến trình / phần thưởng
        $this->resultService->updateProgress($user);

        return $completion;
    }

    /**
     * Lấy tất cả completion của user
     */
    public function getCompletionsForUser(User $user)
    {
        return Completion::where('user_id', $user->id)->get();
    }

    /**
     * Lấy completion của 1 item
     */
    public function getCompletionForItem(User $user, string $type, int $id): ?Completion
    {
        return Completion::where('user_id', $user->id)
            ->where('completable_type', $type)
            ->where('completable_id', $id)
            ->first();
    }
}
