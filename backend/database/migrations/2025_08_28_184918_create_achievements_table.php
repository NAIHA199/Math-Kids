<?php
// lưu lại phần thưởng đã đạt
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('achievements', function (Blueprint $table) {
      $table->id();
      $table->string('name')->unique(); // Tên thành tựu vd: Hoàn thành 10 bài học
      $table->string('description')->nullable();
      $table->unsignedInteger('reward_stars')->default(0); // Số sao
      $table->string('icon')->nullable();
      $table->boolean('active')->default(true);
      $table->timestamps();
    });

    Schema::create('student_achievements', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
      $table->timestamp('awarded_at');
      $table->foreignId('reward_id')->nullable()->constrained('rewards')->cascadeOnDelete();

      $table->timestamps();
      $table->unique(['user_id','reward_id']);
    });
  }
  public function down(): void {
    Schema::dropIfExists('student_achievements');
    Schema::dropIfExists('rewards');
  }
};
