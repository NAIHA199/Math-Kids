<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Completion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'completable_id',
        'completable_type',
        'progress',
        'score',
        'status',
        'completed_at',
        'stars'
    ];

    protected $casts = [
        'completed_at' => 'datetime'
    ];

    // Quan hệ tới User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ polymorphic tới Lesson hoặc Exercise
    public function completable()
    {
        return $this->morphTo();
    }

    /**
     * Tự động tính số sao dựa trên progress/score
     */
    public function recalcStars()
    {
        $progress = (int) ($this->progress ?? 0);
        $score = (int) ($this->score ?? 0);

        // Nếu có score thì ưu tiên tính theo score, không thì dùng progress
        $value = $score > 0 ? $score : $progress;

        if ($value >= 90) {
            $this->stars = 3;
        } elseif ($value >= 70) {
            $this->stars = 2;
        } elseif ($value >= 50) {
            $this->stars = 1;
        } else {
            $this->stars = 0;
        }
    }
}
