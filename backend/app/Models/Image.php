<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['url'];// dùng cho bài học bài tập avatar section

    public function imageable()
    {
        return $this->morphTo();
    }
}