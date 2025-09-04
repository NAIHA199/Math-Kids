<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');


            // Polymorphic: áp dụng cho cả Lesson và Exercise
            $table->morphs('completable'); // completable_id, completable_type

            // Tiến trình & điểm
            $table->unsignedTinyInteger('progress')->nullable()->default(0); // 0..100 (dùng cho lesson)
            $table->unsignedTinyInteger('score')->nullable();                // 0..100 (dùng cho exercise)

            // Trạng thái & phần thưởng
            $table->enum('status', ['in_progress','completed'])->default('in_progress');
            $table->unsignedTinyInteger('stars')->default(0); // 100% => 1 sao

            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            // Không cho 1 user có 2 record cho cùng 1 item
            $table->unique(['user_id', 'completable_id', 'completable_type'], 'uniq_user_item');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('completions');
    }
};
