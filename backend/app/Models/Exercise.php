<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = ['lesson_id', 'title', 'type', 'description', 'questions'];

    protected $casts = [
        'questions' => 'array'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}

