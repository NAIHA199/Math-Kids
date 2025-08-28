<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = ['lesson_id', 'title', 'type', 'description', 'questions'];

    protected $casts = [
        'questions' => 'array'
    ];
    // Quan hệ bài tập thuộc về bài học
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
    // Quan hệ đa hình cho ảnh
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    // Quan hệ khi hoàn thành bài tập
    public function completions()
    {
    return $this->morphMany(\App\Models\Completion::class, 'completable');
    }


}

