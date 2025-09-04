<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade'); // Liên kết với bài học
            $table->string('title'); // Tiêu đề section
            $table->enum('type', ['intro', 'video', 'practice', 'quiz', 'summary'])->default('intro'); // Loại section
            $table->text('content')->nullable(); // Nội dung text
            $table->string('video_url')->nullable(); // Link video nếu có
            $table->json('questions')->nullable(); // Lưu trắc nghiệm dạng JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{
        Schema::dropIfExists('sections');
    }
};
