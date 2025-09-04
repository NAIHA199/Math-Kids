<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;

class GradeController extends Controller
{
    // GET /api/grades
    public function index()
    {
        $grades = Grade::withCount(['students', 'lessons'])->get();
        return response()->json($grades);
    }
}
