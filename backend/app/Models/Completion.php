<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'stars',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function completable()
    {
        return $this->morphTo();
    }
/*

    // Quy tắc tính sao:
    // - Nếu status = completed và score == 100 (cho exercise) hoặc progress == 100 (cho lesson) => stars = 1, ngược lại = 0.

    public function recalcStars(): void
    {
        $stars = 0;

        if ($this->status === 'completed') {
            // Ưu tiên score; nếu không có score thì dùng progress
            if (!is_null($this->score) && (int)$this->score === 100) {
                $stars = 1;
            } elseif (!is_null($this->progress) && (int)$this->progress === 100) {
                $stars = 1;
            }
        }

        $this->stars = $stars;
    }*/
}

