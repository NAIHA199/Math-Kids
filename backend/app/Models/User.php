<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
/**
 * @method \Laravel\Sanctum\NewAccessToken createToken(string $name, array $abilities = ['*'], \DateTimeInterface|null $expiresAt = null)
 */
class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'role',
        'fullName',
        'email',
        'username',
        'password',
        'grade_id',// Thêm grade_id vào fillable
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];

    }
    // Quan hệ: 1 user thuộc về 1 grade (có thể null)
    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
    // Quan hệ hoàn thành bài học và bài tập
    public function completions()
    {
    return $this->hasMany(\App\Models\Completion::class);
    }

    public function children()
    {
        return $this->belongsToMany(User::class, 'parent_student', 'parent_id', 'student_id')->where('role', 'student');
    }

    public function parents()
    {
        return $this->belongsToMany(User::class, 'parent_student', 'student_id', 'parent_id')->where('role', 'parent');
    }

    public function result()
    {
        return $this->hasOne(Result::class);
    }

    // Trong UserObserver hoặc User model boot()
    /*protected static function booted()
    {
        static::created(function ($user) {
            if ($user->role === 'student') {
                \App\Models\StudentProgress::create([
                    'student_id' => $user->id,
                    'total_stars' => 0,
                    'level' => 0,
                    'current_streak' => 0,
                    'longest_streak' => 0,
                    'last_activity_date' => null,
                ]);
            }
        });
    }*/


}
