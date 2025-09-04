<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Services\ResultService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    //Khai báo service
    protected $resultService;

    public function __construct(ResultService $resultService)
    {
        $this->resultService = $resultService;
    }

    //Cập nhật tiến trình
    public function updateProgress(Request $request)
    {
        $user = Auth::user();


        $result = $this->resultService->updateProgress($user);

        // Check phần thưởng sau khi cập nhật
        $this->rewardService->checkAndAwardAchievements($user);

        return response()->json($result);

    }

    //API Lấy báo cáo cho home hiển thị
    public function show(User $student)
    {
        $report = $this->resultService->buildParentReport($student->id);

        return response()->json($report);
    }
}

