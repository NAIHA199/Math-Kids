<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'stars', 'level',
        'lessons_completed', 'streak_days'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
