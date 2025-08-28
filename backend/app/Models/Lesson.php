<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'grade_id', 'subject', 'description'];

    public function sections() {
        return $this->hasMany(Section::class);
    }

    public function exercises() {
        return $this->hasMany(Exercise::class);
    }

    // Quan hệ đa hình cho ảnh
    public function images() {
        return $this->morphMany(Image::class, 'imageable')->orderBy('created_at');
    }
    // Quan hệ khi hoàn thành bài học 
    public function completions()
    {
    return $this->morphMany(\App\Models\Completion::class, 'completable');
    }


}
