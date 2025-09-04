<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true; // Cho phép tất cả user đăng kí
    }

    // Chuyển đổi userType thành role
    /*public function prepareForValidation()
    {
        if ($this->has('userType')) {
            $this->merge(['role' => $this->input('userType')]);
        }
    }*/

    public function rules(): array // Nhận role từ front-end, Dựa vào các role trong hàm này để validate
    {
        $rules = [
            'role' => 'required|in:student,teacher,parent', // gán chức vụ khi đăng kí
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:6|confirmed', // confirmed thêm trường kiểm tra pass và front-end phải gửi pass_confirm để rule đó hoạt động

        ];

        if ($this->input('role') === 'student') {
            $rules['parent_email'] = 'required|email|max:255|exists:users,email';
        }

        return $rules;
    }
    public function messages(): array
    {
        return [
            'username.required' => 'Please enter username',
            'username.unique' => 'Username already exists',
            'email.required' => 'Please enter email',
            'email.unique' => 'Email already exists',
            'password.required' => 'Please enter password',
            'password.confirmed' => 'Password confirmation does not match',
            'parent_email.required' => 'Please enter parent email',
            'parent_email.exists' => 'Email still not registered.',
        ];
    }
}
