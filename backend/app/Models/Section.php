<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['lesson_id', 'type', 'title', 'content', 'video_url', 'duration'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
