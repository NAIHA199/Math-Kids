<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $lessons = [
            // Chủ đề 1: Làm quen với một số hình
            [
                'title' => 'Vị trí',
                'description' => 'Học về các khái niệm vị trí: trên-dưới, phải-trái, trước-sau, ở giữa.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Khối hộp chữ nhật, Khối lập phương',
                'description' => 'Nhận biết và gọi tên khối hộp chữ nhật, khối lập phương.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            
            // Chủ đề 2: Các số đến 10
            [
                'title' => 'Tách - Gộp số',
                'description' => 'Thực hiện thao tác tách, gộp số trong phạm vi các số đã học.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'So sánh các số: bằng, lớn hơn, bé hơn',
                'description' => 'Sử dụng các thuật ngữ bằng nhau, lớn hơn, bé hơn để so sánh các số.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Các dấu =, >, <',
                'description' => 'Nhận biết, đọc, viết các dấu =, >, < và sử dụng chúng để so sánh các số.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Các số từ 6 đến 9',
                'description' => 'Đọc, viết và đếm các số 6, 7, 8, 9.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Số 0 và Số 10',
                'description' => 'Nhận biết số 0 và số 10 trong thực tế.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],

            // Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10
            [
                'title' => 'Phép cộng trong phạm vi 10',
                'description' => 'Hiểu ý nghĩa của phép cộng và thực hiện các phép tính cộng trong phạm vi 10.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Phép trừ trong phạm vi 10',
                'description' => 'Hiểu ý nghĩa của phép trừ và thực hiện các phép tính trừ trong phạm vi 10.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],

            // Chủ đề 4: Các số đến 20
            [
                'title' => 'Các số đến 20',
                'description' => 'Đọc, viết, đếm và so sánh các số trong phạm vi 20.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            
            // Chủ đề 5: Các số đến 100
            [
                'title' => 'Chục và Số tròn chục',
                'description' => 'Làm quen với "chục", "đơn vị" và các số tròn chục.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Các số đến 100',
                'description' => 'Đọc, viết, đếm và so sánh các số trong phạm vi 100.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Các ngày trong tuần',
                'description' => 'Nhận biết và gọi tên các ngày trong tuần lễ.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}

