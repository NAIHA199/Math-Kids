<?php

namespace App\Services;

use App\Models\Completion;
use Carbon\Carbon;

class ProgressService
{
    // Thêm hoặc cập nhật tiến trình
    public function upsertCompletion($userId, $type, $id, $progress = null, $score = null)
    {
        $completion = Completion::firstOrNew([
            'user_id' => $userId,
            'completable_type' => $type,
            'completable_id' => $id
        ]);

        // Cập nhật progress / score nếu có
        if (!is_null($progress)) {
            $completion->progress = $progress;
        }
        if (!is_null($score)) {
            $completion->score = $score;
        }

        // Kiểm tra hoàn thành
        $isCompleted = ($completion->progress == 100 || $completion->score == 100);

        // Nếu đủ 100% thì mark completed
        if ($isCompleted) {
            $completion->status = 'completed';
            $completion->completed_at = Carbon::now();
        } else {
            $completion->status = 'in_progress';
            $completion->completed_at = null;
        }

        // Tính sao tự động dựa vào score hoặc progress
        $completion->stars = $this->calculateStars($completion->progress, $completion->score);

        $completion->save();
        return $completion;
    }

    // Đánh dấu hoàn thành (ấn nút Hoàn thành)
    public function markAsCompleted($userId, $type, $id)
    {
        return $this->upsertCompletion($userId, $type, $id, 100, 100);
    }

    // Lấy tất cả completion của user
    public function getCompletionsForUser($userId)
    {
        return Completion::where('user_id', $userId)->get();
    }

    // Lấy completion của 1 item
    public function getCompletionForItem($userId, $type, $id)
    {
        return Completion::where('user_id', $userId)
            ->where('completable_type', $type)
            ->where('completable_id', $id)
            ->first();
    }

    // ----------------- Hàm mới: Tính sao tự động -----------------
    private function calculateStars($progress, $score)
    {
        $percent = max($progress, $score); // Ưu tiên % cao nhất
        if ($percent == 100) return 3;     // Hoàn thành tuyệt đối → 3 sao
        if ($percent >= 80) return 2;      // 80% → 2 sao
        if ($percent >= 50) return 1;      // 50% → 1 sao
        return 0;                          // Dưới 50% → 0 sao
    }
}
