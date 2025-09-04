<?php

// app/Http/Controllers/Api/ParentHomeController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ParentHomeController extends Controller
{
    public function index(Request $request)
    {
        $parent = $request->user(); // lấy user từ token

        if ($parent->role !== 'parent') {
            return response()->json(['error' => 'Not authorized'], 403);
        }

        $children = $parent->children()->with('result')->get()->map(function ($child) {
            $result = $child->result; // Assuming one-to-one relationship with Result
            return [
                'id' => $child->id,
                'name' => $child->fullName,
                'grade' => $child->grade_id ?? '3',
                'avatar' => $child->avatar ?? '👦',
                'level' => $result ? $result->level : 1,
                'stars' => $result ? $result->stars : 0,
                'streak' => $result ? $result->streak_days : 0,
                'lastActive' => $result ? $result->last_activity_at : '2024-01-01',
                'todayProgress' => $result ? $result->today_progress ?? 0 : 0,
            ];
        });




        return response()->json([
            'children' => $children

        ]);
    }
}

