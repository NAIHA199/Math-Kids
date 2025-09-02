<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAchievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'achievement_id',
        'awarded_at',
    ];

    // Quan hệ tới User (student)
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    // Quan hệ tới Achievement
    public function achievement()
    {
        return $this->belongsTo(Achievement::class, 'achievement_id');
    }
}
