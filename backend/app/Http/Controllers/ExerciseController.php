<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        return Exercise::select('id', 'lesson_id', 'title', 'type')->get();
    }

    public function show($id)
    {
        $exercise = Exercise::with('images')->findOrFail($id);
        return $exercise;
    }
}
