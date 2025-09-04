<?php

// Bảng này để so sánh với data của result và completion để quyết định học sinh đã đủ yêu cầu đạt phần thưởng tương ứng hay chưa
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'description', 'image_url',
        'field', 'value',
        'icon', 'color', 'earned', 'requirement', 'earned_date'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
