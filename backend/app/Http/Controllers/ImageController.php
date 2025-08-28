<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Lấy danh sách ảnh của 1 model cụ thể
    public function index($type, $id)
    {
        return Image::where('imageable_type', $type)
            ->where('imageable_id', $id)
            ->get();
    }

    // Tạo ảnh mới
    public function store(Request $request)
    {
        $data = $request->validate([
            'url' => 'required|string',
            'imageable_type' => 'required|string',
            'imageable_id' => 'required|integer',
        ]);

        $image = Image::create($data);
        return response()->json(['message' => 'Image created', 'image' => $image], 201);
    }

    // Xóa ảnh
    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();

        return response()->json(['message' => 'Image deleted'], 200);
    }
}
