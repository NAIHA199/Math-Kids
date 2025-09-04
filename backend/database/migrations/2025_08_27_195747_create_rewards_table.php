<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // learning, achievement, streak, games
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();

            // điều kiện mở khóa
            $table->string('field');   // ví dụ: "level", "stars", "games_completed"
            $table->unsignedInteger('value'); // giá trị yêu cầu

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
