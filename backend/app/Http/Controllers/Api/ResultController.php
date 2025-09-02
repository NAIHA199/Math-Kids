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

        $request->validate([
            'type' => 'required|string|in:lesson,exercise,game',

        ]);

        $type = $request->input('type');
        try {
            //gọi service xử lí
            $result = $this->resultService->updateProgress($user, $type);
            return response()->json([
                'message' => 'Cập nhật tiến trình thành công',
                'result' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi cập nhật tiến trình: ' . $e->getMessage()
            ], 500);
        }

    }

    //API Lấy báo cáo cho home hiển thị
    public function show(User $student)
    {
        $report = $this->resultService->buildParentReport($student->id);

        return response()->json($report);
    }
}

