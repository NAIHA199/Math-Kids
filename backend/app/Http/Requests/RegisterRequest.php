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
        return [
            'role' => 'required|in:student,teacher,parent', // gán chức vụ khi đăng kí
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:6|confirmed', // confirmed thêm trường kiểm tra pass và front-end phải gửi pass_confirm để rule đó hoạt động

        ];

    }
    public function messages(): array
    {
        return [
            'username.required' => 'Vui lòng nhập tên đăng nhập',
            'username.unique' => 'Tên đăng nhập đã tồn tại',
            'email.required' => 'Vui lòng nhập email',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp',        ];
    }
}
