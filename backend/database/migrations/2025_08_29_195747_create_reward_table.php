<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();

            // Tên phần thưởng
            $table->string('name');

            // Nhóm phần thưởng: học tập, thành tích, chuỗi ngày, trò chơi
            $table->enum('category', ['learning', 'achievement', 'streak', 'games']);

            // Mô tả phần thưởng
            $table->text('description')->nullable();

            // Điều kiện đạt (ví dụ: "lesson_completed >= 10")
            $table->string('requirement');

            // Có thể lưu trạng thái đã đạt chưa (nếu muốn caching DB, không chỉ tính toán động)
            $table->boolean('earned')->default(false);

            // Ngày đạt phần thưởng (nếu có)
            $table->timestamp('earned_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
