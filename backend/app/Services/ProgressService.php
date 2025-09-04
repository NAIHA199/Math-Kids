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
    public function recordCompletion(
        User $user,
        string $completableType,
        int $completableId,
        ?int $progress = null,
        ?int $score = null,
        ?string $status = null,
        ?int $stars = null
    ): Completion {
        $completion = Completion::firstOrNew([
            'user_id'          => $user->id,
            'completable_type' => $completableType,
            'completable_id'   => $completableId,
        ]);

        // Nếu mới tạo thì set cơ bản
        if (!$completion->exists) {
            $completion->stars = $stars ?? 1;
            $completion->status = $status ?? 'completed';
            $completion->completed_at = Carbon::now();
            $completion->save();
        }

        // Cập nhật progress/score
        if ($progress !== null) {
            $completion->progress = $progress;
        }
        if ($score !== null) {
            $completion->score = $score;
        }

        // Tính lại số sao dựa trên progress/score chỉ nếu progress/score > 0
        $oldStars = $completion->stars ?? 0;
        if ($progress > 0 || $score > 0) {
            $completion->recalcStars();
            // Chỉ update nếu sao mới ≥ sao cũ
            if ($completion->stars < $oldStars) {
                $completion->stars = $oldStars;
            }
        } else if ($stars > $completion->stars) {
            $completion->stars = $stars;
            $completion->save();
        }

        $completion->save();

        // Cập nhật tổng hợp
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
