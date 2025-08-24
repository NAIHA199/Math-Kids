<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array // Dựa vào các quy tắc trong hàm này để validate
    {
        return [
            'username' => 'required|string', // đăng nhập bằng username
            'password' => 'required|string',
            'role' => 'required|in:student,teacher,parent', // Thêm trường role với các giá trị hợp lệ
        ];
    }
}
