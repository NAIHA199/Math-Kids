<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            GradeSeeder::class,
            UserSeeder::class,
        ]);

        User::factory(5)->create();

        $this->call([
            //LessonSeeder::class,
            //SectionSeeder::class,
            //ExerciseSeeder::class,
            ImageSeeder::class,
            CompletionSeeder::class,
            RewardSeeder::class,
            GameSeeder::class,
           // BadgesSeeder::class,
          //  StudentProgressSeeder::class,
        ]);
    }
}
