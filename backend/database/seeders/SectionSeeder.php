<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Section;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Chủ đề 1: Làm quen với một số hình
        $lessonViTri = Lesson::where('title', 'Vị trí')->first();
        if ($lessonViTri) {
            Section::create([
                'lesson_id' => $lessonViTri->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Bài học này giúp em biết cách xác định vị trí của đồ vật so với nhau: trên-dưới, phải-trái, trước-sau, ở giữa.'
            ]);
            Section::create([
                'lesson_id' => $lessonViTri->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=s-tCaX_L2vI',
                'content' => 'Xem video để hiểu rõ hơn về các vị trí của đồ vật.'
            ]);
            Section::create([
                'lesson_id' => $lessonViTri->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Quyển sách ở đâu so với cái bàn?", "options" => ["Ở trên", "Ở dưới", "Ở trong"], "correct" => 0],
                    ["question" => "Quả bóng ở đâu so với cái ghế?", "options" => ["Bên phải", "Bên dưới", "Bên trên"], "correct" => 1],
                    ["question" => "Bạn An đứng bên nào của bạn Bình?", "options" => ["Bên phải", "Bên trái", "Ở giữa"], "correct" => 1],
                    ["question" => "Cái cây ở đâu so với ngôi nhà?", "options" => ["Phía trước", "Phía sau", "Bên cạnh"], "correct" => 0],
                    ["question" => "Trong 3 số 4, 5, 6, số nào ở giữa?", "options" => ["Số 4", "Số 5", "Số 6"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonViTri->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã học cách dùng các từ chỉ vị trí để mô tả đồ vật xung quanh.'
            ]);
        }

        $lessonKhoiHop = Lesson::where('title', 'Khối hộp chữ nhật, Khối lập phương')->first();
        if ($lessonKhoiHop) {
            Section::create([
                'lesson_id' => $lessonKhoiHop->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Chúng ta cùng tìm hiểu hai loại khối rất quen thuộc là khối hộp chữ nhật và khối lập phương nhé!'
            ]);
            Section::create([
                'lesson_id' => $lessonKhoiHop->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=J_rfP1k2p-A',
                'content' => 'Video giúp phân biệt khối hộp chữ nhật và khối lập phương.'
            ]);
            Section::create([
                'lesson_id' => $lessonKhoiHop->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Hộp sữa có dạng khối gì?", "options" => ["Khối lập phương", "Khối hộp chữ nhật", "Hình tròn"], "correct" => 1],
                    ["question" => "Con súc sắc (xí ngầu) có dạng khối gì?", "options" => ["Khối lập phương", "Khối hộp chữ nhật", "Hình tam giác"], "correct" => 0],
                    ["question" => "Khối lập phương có các mặt là hình gì?", "options" => ["Hình chữ nhật", "Hình vuông", "Hình tam giác"], "correct" => 1],
                    ["question" => "Vật nào sau đây có dạng khối hộp chữ nhật?", "options" => ["Quả bóng", "Hộp bánh", "Viên bi"], "correct" => 1],
                    ["question" => "Khối rubik thường có dạng khối gì?", "options" => ["Khối tròn", "Khối lập phương", "Khối hộp chữ nhật"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonKhoiHop->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Bây giờ em đã nhận biết được khối hộp chữ nhật và khối lập phương rồi.'
            ]);
        }
        
        // Chủ đề 2: Các số đến 10
        $lessonTachGop = Lesson::where('title', 'Tách - Gộp số')->first();
        if ($lessonTachGop) {
            Section::create([
                'lesson_id' => $lessonTachGop->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Tách và gộp số là một kỹ năng quan trọng để học cộng và trừ.'
            ]);
            Section::create([
                'lesson_id' => $lessonTachGop->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=TqkoYkDeLCE',
                'content' => 'Học cách tách và gộp các số trong phạm vi 10.'
            ]);
            Section::create([
                'lesson_id' => $lessonTachGop->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "5 gồm 2 và mấy?", "options" => ["1", "2", "3", "4"], "correct" => 2],
                    ["question" => "Gộp 4 và 1 được mấy?", "options" => ["4", "5", "6", "3"], "correct" => 1],
                    ["question" => "7 gồm 5 và mấy?", "options" => ["1", "2", "3", "4"], "correct" => 1],
                    ["question" => "Gộp 3 và 3 được mấy?", "options" => ["5", "6", "7", "8"], "correct" => 1],
                    ["question" => "8 gồm mấy và 6?", "options" => ["1", "2", "3", "4"], "correct" => 1],
                    ["question" => "Gộp 2 và 6 được mấy?", "options" => ["7", "8", "9", "10"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonTachGop->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết cách tách một số thành hai số và gộp hai số thành một số.'
            ]);
        }

        $lessonSoSanh = Lesson::where('title', 'So sánh các số: bằng, lớn hơn, bé hơn')->first();
        if ($lessonSoSanh) {
            Section::create([
                'lesson_id' => $lessonSoSanh->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'So sánh giúp chúng ta biết nhóm nào có nhiều hơn, ít hơn hoặc bằng nhau.'
            ]);
            Section::create([
                'lesson_id' => $lessonSoSanh->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=FIMx0gsAz-I',
                'content' => 'Học cách so sánh số lượng và các con số.'
            ]);
            Section::create([
                'lesson_id' => $lessonSoSanh->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Số 5 ... số 3?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 0],
                    ["question" => "Số 8 ... số 9?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 1],
                    ["question" => "Số 4 ... số 4?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 2],
                    ["question" => "Số nào lớn nhất trong các số: 2, 7, 5?", "options" => ["2", "7", "5"], "correct" => 1],
                    ["question" => "Số nào bé nhất trong các số: 9, 6, 8?", "options" => ["9", "6", "8"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonSoSanh->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết so sánh hai số và tìm ra số lớn nhất, số bé nhất.'
            ]);
        }

        $lessonCacDau = Lesson::where('title', 'Các dấu =, >, <')->first();
        if ($lessonCacDau) {
            Section::create([
                'lesson_id' => $lessonCacDau->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Chúng ta sẽ học về các dấu đặc biệt để so sánh các số.'
            ]);
            Section::create([
                'lesson_id' => $lessonCacDau->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=a_pMr-v4_Gk',
                'content' => 'Học về ý nghĩa và cách viết các dấu so sánh.'
            ]);
            Section::create([
                'lesson_id' => $lessonCacDau->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Điền dấu thích hợp: 5 ... 8", "options" => [">", "<", "="], "correct" => 1],
                    ["question" => "Điền dấu thích hợp: 7 ... 7", "options" => [">", "<", "="], "correct" => 2],
                    ["question" => "Điền dấu thích hợp: 9 ... 4", "options" => [">", "<", "="], "correct" => 0],
                    ["question" => "Phép so sánh nào đúng?", "options" => ["6 > 8", "5 < 4", "3 < 7"], "correct" => 2],
                    ["question" => "Phép so sánh nào sai?", "options" => ["10 > 9", "2 = 2", "5 < 3"], "correct" => 2],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonCacDau->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết cách sử dụng dấu >, <, = để so sánh các số rồi.'
            ]);
        }

        $lesson6den9 = Lesson::where('title', 'Các số từ 6 đến 9')->first();
        if ($lesson6den9) {
            Section::create([
                'lesson_id' => $lesson6den9->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Cùng đếm và làm quen với các số 6, 7, 8, 9 nhé!'
            ]);
            Section::create([
                'lesson_id' => $lesson6den9->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=bGetqgxESH8',
                'content' => 'Video dạy đếm và nhận biết các số từ 6 đến 9.'
            ]);
            Section::create([
                'lesson_id' => $lesson6den9->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Số liền sau số 8 là số nào?", "options" => ["7", "8", "9"], "correct" => 2],
                    ["question" => "Số nào đứng giữa số 5 và số 7?", "options" => ["6", "8", "4"], "correct" => 0],
                    ["question" => "Trong các số 9, 6, 8, số nào lớn nhất?", "options" => ["9", "6", "8"], "correct" => 0],
                    ["question" => "7 gồm 3 và mấy?", "options" => ["2", "3", "4"], "correct" => 2],
                ])
            ]);
             Section::create([
                'lesson_id' => $lesson6den9->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã thuộc các số từ 1 đến 9 và biết so sánh chúng.'
            ]);
        }
        
        $lesson0va10 = Lesson::where('title', 'Số 0 và Số 10')->first();
        if ($lesson0va10) {
            Section::create([
                'lesson_id' => $lesson0va10->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Hôm nay chúng ta sẽ tìm hiểu về hai con số rất đặc biệt!'
            ]);
            Section::create([
                'lesson_id' => $lesson0va10->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=9t7b8-A-nE8',
                'content' => 'Học về số 0 và số 10.'
            ]);
            Section::create([
                'lesson_id' => $lesson0va10->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Trong giỏ không có quả táo nào. Số quả táo trong giỏ là mấy?", "options" => ["1", "0", "10"], "correct" => 1],
                    ["question" => "Số liền sau của số 9 là số nào?", "options" => ["8", "9", "10"], "correct" => 2],
                    ["question" => "3 + 0 = ?", "options" => ["0", "3", "30"], "correct" => 1],
                    ["question" => "5 - 5 = ?", "options" => ["0", "1", "5"], "correct" => 0],
                    ["question" => "Số 10 gồm 1 chục và mấy đơn vị?", "options" => ["1", "10", "0"], "correct" => 2],
                ])
            ]);
             Section::create([
                'lesson_id' => $lesson0va10->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã hiểu ý nghĩa của số 0 và biết về số 10.'
            ]);
        }

        // Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10
        $lessonPhepCong = Lesson::where('title', 'Phép cộng trong phạm vi 10')->first();
        if ($lessonPhepCong) {
            Section::create([
                'lesson_id' => $lessonPhepCong->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Phép cộng giúp chúng ta tìm ra tổng số của nhiều nhóm đồ vật.'
            ]);
            Section::create([
                'lesson_id' => $lessonPhepCong->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=S30csiS7yXY',
                'content' => 'Học cách làm các phép cộng đơn giản.'
            ]);
            Section::create([
                'lesson_id' => $lessonPhepCong->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "4 + 2 = ?", "options" => ["5", "6", "7"], "correct" => 1],
                    ["question" => "5 + 3 = ?", "options" => ["7", "8", "9"], "correct" => 1],
                    ["question" => "7 + 1 = ?", "options" => ["8", "9", "6"], "correct" => 0],
                    ["question" => "3 + 6 = ?", "options" => ["8", "9", "10"], "correct" => 1],
                    ["question" => "Có 3 quả cam, thêm 2 quả cam nữa. Hỏi có tất cả bao nhiêu quả cam?", "options" => ["4", "5", "6"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonPhepCong->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Làm toán cộng thật vui! Em đã biết cách cộng các số trong phạm vi 10.'
            ]);
        }

        $lessonPhepTru = Lesson::where('title', 'Phép trừ trong phạm vi 10')->first();
        if ($lessonPhepTru) {
             Section::create([
                'lesson_id' => $lessonPhepTru->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Phép trừ giúp chúng ta tìm ra số còn lại sau khi bớt đi.'
            ]);
            Section::create([
                'lesson_id' => $lessonPhepTru->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=UqQe-a_A61c',
                'content' => 'Học cách làm các phép trừ đơn giản.'
            ]);
            Section::create([
                'lesson_id' => $lessonPhepTru->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "8 - 3 = ?", "options" => ["4", "5", "6"], "correct" => 1],
                    ["question" => "7 - 5 = ?", "options" => ["1", "2", "3"], "correct" => 1],
                    ["question" => "9 - 4 = ?", "options" => ["5", "6", "7"], "correct" => 0],
                    ["question" => "10 - 6 = ?", "options" => ["3", "4", "5"], "correct" => 1],
                    ["question" => "Có 6 cái kẹo, ăn hết 2 cái. Hỏi còn lại mấy cái kẹo?", "options" => ["3", "4", "5"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonPhepTru->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết cách trừ các số trong phạm vi 10. Thật dễ phải không nào?'
            ]);
        }

        // Chủ đề 4: Các số đến 20
        $lessonDen20 = Lesson::where('title', 'Các số đến 20')->first();
        if ($lessonDen20) {
            Section::create([
                'lesson_id' => $lessonDen20->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Mở rộng thế giới số của chúng ta đến 20!'
            ]);
            Section::create([
                'lesson_id' => $lessonDen20->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=a-kCo-A6y3k',
                'content' => 'Học đếm, đọc, viết các số từ 11 đến 20.'
            ]);
            Section::create([
                'lesson_id' => $lessonDen20->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Số mười lăm viết là?", "options" => ["105", "15", "51"], "correct" => 1],
                    ["question" => "Số liền sau của 19 là số nào?", "options" => ["18", "19", "20"], "correct" => 2],
                    ["question" => "Số 12 gồm 1 chục và mấy đơn vị?", "options" => ["1", "2", "12"], "correct" => 1],
                    ["question" => "Số nào lớn hơn: 17 hay 15?", "options" => ["17", "15", "Bằng nhau"], "correct" => 0],
                    ["question" => "10 + 6 = ?", "options" => ["106", "16", "60"], "correct" => 1],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonDen20->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã làm quen với các số trong phạm vi 20.'
            ]);
        }
        
        // Chủ đề 5: Các số đến 100
        $lessonChuc = Lesson::where('title', 'Chục và Số tròn chục')->first();
        if ($lessonChuc) {
            Section::create([
                'lesson_id' => $lessonChuc->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Cùng tìm hiểu về các số tròn chục nhé!'
            ]);
            Section::create([
                'lesson_id' => $lessonChuc->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=jV6Q6a_wA-w',
                'content' => 'Video giới thiệu về chục, đơn vị và các số tròn chục.'
            ]);
            Section::create([
                'lesson_id' => $lessonChuc->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Số ba mươi viết là?", "options" => ["3", "13", "30"], "correct" => 2],
                    ["question" => "Số 50 đọc là?", "options" => ["Năm", "Mười lăm", "Năm mươi"], "correct" => 2],
                    ["question" => "Số tròn chục lớn nhất có 2 chữ số là?", "options" => ["10", "90", "99"], "correct" => 1],
                    ["question" => "20 + 30 = ?", "options" => ["23", "50", "60"], "correct" => 1],
                    ["question" => "70 - 40 = ?", "options" => ["30", "40", "74"], "correct" => 0],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonChuc->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết đọc, viết các số tròn chục và làm phép tính với chúng.'
            ]);
        }

        $lessonDen100 = Lesson::where('title', 'Các số đến 100')->first();
        if ($lessonDen100) {
            Section::create([
                'lesson_id' => $lessonDen100->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Chúng ta sẽ khám phá tất cả các số từ 1 đến 100.'
            ]);
            Section::create([
                'lesson_id' => $lessonDen100->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=JmdeqG0y3-Y',
                'content' => 'Video dạy đếm và nhận biết các số trong phạm vi 100.'
            ]);
            Section::create([
                'lesson_id' => $lessonDen100->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Số sáu mươi hai viết là?", "options" => ["602", "26", "62"], "correct" => 2],
                    ["question" => "Số 81 đọc là?", "options" => ["Tám mươi một", "Tám một", "Mười tám"], "correct" => 0],
                    ["question" => "Số liền trước của 100 là?", "options" => ["90", "99", "101"], "correct" => 1],
                    ["question" => "So sánh 54 và 45?", "options" => ["54 > 45", "54 < 45", "54 = 45"], "correct" => 0],
                    ["question" => "Số lớn nhất có hai chữ số là?", "options" => ["90", "98", "99"], "correct" => 2],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonDen100->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Chúc mừng em đã chinh phục được các số đến 100!'
            ]);
        }

        $lessonCacNgay = Lesson::where('title', 'Các ngày trong tuần')->first();
        if ($lessonCacNgay) {
            Section::create([
                'lesson_id' => $lessonCacNgay->id,
                'title' => 'Giới thiệu',
                'type' => 'intro',
                'content' => 'Một tuần có mấy ngày nhỉ? Cùng tìm hiểu nhé!'
            ]);
            Section::create([
                'lesson_id' => $lessonCacNgay->id,
                'title' => 'Video bài giảng',
                'type' => 'video',
                'video_url' => 'https://www.youtube.com/watch?v=36n3g3gQo-A',
                'content' => 'Bài hát vui nhộn về các ngày trong tuần.'
            ]);
            Section::create([
                'lesson_id' => $lessonCacNgay->id,
                'title' => 'Thực hành',
                'type' => 'practice',
                'questions' => json_encode([
                    ["question" => "Một tuần lễ có mấy ngày?", "options" => ["5", "6", "7"], "correct" => 2],
                    ["question" => "Hôm nay là thứ Ba, ngày mai là thứ mấy?", "options" => ["Thứ Hai", "Thứ Tư", "Thứ Năm"], "correct" => 1],
                    ["question" => "Ngày đầu tiên trong tuần em đi học là thứ mấy?", "options" => ["Chủ nhật", "Thứ Hai", "Thứ Bảy"], "correct" => 1],
                    ["question" => "Hôm qua là thứ Sáu, hôm nay là thứ mấy?", "options" => ["Thứ Năm", "Thứ Bảy", "Chủ nhật"], "correct" => 1],
                    ["question" => "Ngày cuối tuần thường là những ngày nào?", "options" => ["Thứ Hai, Thứ Ba", "Thứ Sáu, Thứ Bảy", "Thứ Bảy, Chủ nhật"], "correct" => 2],
                ])
            ]);
            Section::create([
                'lesson_id' => $lessonCacNgay->id,
                'title' => 'Tổng kết',
                'type' => 'summary',
                'content' => 'Em đã biết tên và thứ tự của các ngày trong một tuần rồi.'
            ]);
        }
    }
}

 