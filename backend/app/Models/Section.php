<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'title',
        'type',
        'content',
        'video_url',
        'questions',
    ];

    protected $casts = [
        'questions' => 'array', // Tự động convert JSON <-> array
    ];

    // Quan hệ với Lesson
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
    // Quan hệ với Image
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }      
};
