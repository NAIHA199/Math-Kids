<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grade;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        $grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

        foreach ($grades as $name) {
            Grade::create(['name' => $name]);
        }
    }
}
