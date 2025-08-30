<?php // database/migrations/2025_08_26_000100_create_games_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->unsignedTinyInteger('grade_level')->nullable(); // lớp nào (1-5)
            $table->string('type')->nullable(); // ví dụ: ghep_so, dem_nhanh
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('games');
    }
};
