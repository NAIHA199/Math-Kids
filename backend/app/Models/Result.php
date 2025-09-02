<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'stars', 'level',
        'lesson_completed', 'exercises_completed', 'games_completed', 'streak_days', 'last_activity_at'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
