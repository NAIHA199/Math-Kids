<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    // Tổng quan báo cáo
    public function summary()
    {
        $averageScore = DB::table('exercises')
            ->join('exercise_student', 'exercises.id', '=', 'exercise_student.exercise_id')
            ->avg('exercise_student.score');

        $completionRate = DB::table('exercise_student')
            ->selectRaw('COUNT(*) FILTER (WHERE status = ?) * 100.0 / COUNT(*) as rate', ['completed'])
            ->value('rate');

        $activeStudents = DB::table('exercise_student')
            ->where('status', 'completed')
            ->distinct('student_id')
            ->count('student_id');

        return response()->json([
            'averageScore' => round($averageScore, 2),
            'completionRate' => round($completionRate, 0),
            'activeStudents' => $activeStudents,
        ]);
    }

    // Tiến độ các lớp
    public function classProgress()
    {
        $classes = DB::table('grades')->get();
        $data = [];

        foreach ($classes as $cls) {
            $completed = DB::table('exercise_student')
                ->join('students', 'exercise_student.student_id', '=', 'students.id')
                ->where('students.grade_id', $cls->id)
                ->where('exercise_student.status', 'completed')
                ->count();

            $total = DB::table('exercise_student')
                ->join('students', 'exercise_student.student_id', '=', 'students.id')
                ->where('students.grade_id', $cls->id)
                ->count();

            $progress = $total > 0 ? round($completed / $total * 100, 0) : 0;

            // Chọn màu ngẫu nhiên hoặc theo thứ tự
            $colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-indigo-500'];
            $color = $colors[$cls->id % count($colors)];

            $data[] = [
                'name' => $cls->name,
                'progress' => $progress,
                'color' => $color,
            ];
        }

        return response()->json($data);
    }

    // Xếp hạng học sinh
    public function leaderboard()
    {
        $students = DB::table('students')
            ->select('students.id', 'students.name', 'grades.name as class', DB::raw('SUM(exercise_student.score) as score'))
            ->join('grades', 'students.grade_id', '=', 'grades.id')
            ->join('exercise_student', 'students.id', '=', 'exercise_student.student_id')
            ->groupBy('students.id', 'students.name', 'grades.name')
            ->orderByDesc('score')
            ->limit(10)
            ->get();

        $result = [];
        $rank = 1;
        foreach ($students as $student) {
            $result[] = [
                'rank' => $rank++,
                'name' => $student->name,
                'class' => $student->class,
                'score' => $student->score,
            ];
        }

        return response()->json($result);
    }
}
