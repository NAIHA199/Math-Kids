<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompletionRequest extends FormRequest
{
    public function authorize() { return auth()->check(); }

    public function rules()
    {
        return [
            // frontend có thể gửi 'type' là 'lesson' hoặc 'exercise' hoặc 'game'
            'type' => 'required|in:lesson,exercise,game',
            'id' => 'required|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'score' => 'nullable|integer|min:0|max:100',
            'status' => 'nullable|in:in_progress,completed',
            'stars' => 'nullable|integer|min:0|max:100',
        ];
    }
}
