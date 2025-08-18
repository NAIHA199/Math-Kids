## Cài đặt Node.js

Nếu bạn chưa cài Node.js trên máy tính:

1. Truy cập [https://nodejs.org](https://nodejs.org)
2. Tải xuống phiên bản LTS 22.18.0 (Long Term Support)

## Cài đặt dự án

1. Mở terminal và điều hướng đến thư mục dự án:
```bash
cd fontend
```
2. Cài đặt các gói cần thiết:
```bash
npm install
```
3. Khởi động dự án:
```bash
npm start
```
 Dự án sẽ chạy trên http://localhost:3000


 ## CÁCH CÀI ĐẶT & CHẠY BACK-END
1. Sau khi clone về vào thư mục back-end
```bash
 cd back-end
```
2. Cài đặt package (thư viện)
```bash
composer install
```
3. Tạo file môi trường .env (nếu chưa có)
```bash
cp .env.example .env
```
4. Chỉnh sửa vài thông tin sau của .env để lk với db
```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:suDZWIpuk8Yx1/JhihzfBaKtcDnKV9p8srweyN5oC4M=
APP_DEBUG=true
APP_URL=http://localhost
FRONTEND_URL=http://localhost:3000


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=web_math
DB_USERNAME=root
DB_PASSWORD=

```

5. Tạo mã hóa dữ liệu và bảo mật
```bash
php artisan key:generate
```
6. Tạo Database
```bash
CREATE DATABASE web_math CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
7. Chạy migration để tạo table
```bash
php artisan migrate
```
8. Chạy serve
```bash
php artisan serve 
```
