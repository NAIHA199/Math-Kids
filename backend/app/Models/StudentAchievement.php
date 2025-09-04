<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAchievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'awarded_at',
        'reward_id',
    ];

    // Quan hệ tới User (student)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    // Quan hệ tới Reward
    public function reward()
    {
        return $this->belongsTo(Reward::class, 'reward_id');
    }
}
