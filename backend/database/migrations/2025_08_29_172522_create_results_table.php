<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('stars')->default(0); //Tổng số sao
            $table->integer('level')->default(1); // Level hiện tại
            $table->integer('lesson_completed')->default(0); // Số bài học đã hoàn thành
            $table->integer('exercises_completed')->default(0); // Số bài tập đã hoàn thành
            $table->integer('games_completed')->default(0); // Số trò chơi đã hoàn thành
            $table->integer('streak_days')->default(0); // Số ngày streak hiện tại
            $table->timestamp('last_activity_at')->nullable(); // Thời gian hoạt động cuối
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
