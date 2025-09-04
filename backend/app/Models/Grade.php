<?php

// app/Models/Grade.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function lessons() {
        return $this->hasMany(Lesson::class);
    }
        // Mỗi khối có nhiều học sinh
    public function students()
    {
        return $this->hasMany(User::class, 'grade_id'); 
        // giả sử bảng users có cột grade_id
    
    }
}
