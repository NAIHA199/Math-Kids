<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class game extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
    ];
    public function completions()
    {
        return $this->morphMany(Completion::class, 'completable');
    }
}
