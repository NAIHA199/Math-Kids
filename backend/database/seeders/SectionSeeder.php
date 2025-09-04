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
    public function run()
    {
        // Lớp 1
        $this->createSectionsForLesson('Vị trí', [
            'intro' => 'Bài học này giúp em biết cách xác định vị trí của đồ vật so với nhau: trên - dưới, phải - trái, trước - sau.',
            'video_url' => 'https://www.youtube.com/watch?v=s-tCaX_L2vI',
            'video_content' => 'Xem video để hiểu về các vị trí: trên, dưới, phải, trái.',
            'questions' => [
                ["question" => "Bầu trời ở vị trí nào so với mặt đất?", "options" => ["Ở trên", "Ở dưới", "Ở giữa"], "correct" => 0],
                ["question" => "Trong dãy số 5, 6, 7, số nào đứng ở giữa?", "options" => ["Số 5", "Số 6", "Số 7"], "correct" => 1],
                ["question" => "Khi xếp hàng, bạn đứng ngay đằng sau em ở vị trí nào?", "options" => ["Phía trước", "Phía sau", "Bên cạnh"], "correct" => 1],
                ["question" => "Chữ 'A' đứng ở vị trí nào so với chữ 'B' trong bảng chữ cái?", "options" => ["Đứng trước", "Đứng sau", "Đứng giữa"], "correct" => 0],
                ["question" => "Rễ cây thường mọc ở đâu so với thân cây?", "options" => ["Ở trên", "Ở dưới", "Ở ngang"], "correct" => 1],
            ],
            'summary' => 'Em đã học cách dùng các từ chỉ vị trí để mô tả đồ vật xung quanh.'
        ]);
        
        $this->createSectionsForLesson('Khối hộp chữ nhật, Khối lập phương', [
            'intro' => 'Chúng ta cùng tìm hiểu hai loại khối rất quen thuộc nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=J_rfP1k2p-A',
            'video_content' => 'Video giúp phân biệt khối hộp chữ nhật và khối lập phương.',
            'questions' => [
                ["question" => "Hộp sữa có dạng khối gì?", "options" => ["Khối lập phương", "Khối hộp chữ nhật", "Hình tròn"], "correct" => 1],
                ["question" => "Con súc sắc (xí ngầu) có dạng khối gì?", "options" => ["Khối lập phương", "Khối hộp chữ nhật", "Hình tam giác"], "correct" => 0],
                ["question" => "Khối lập phương có các mặt là hình gì?", "options" => ["Hình chữ nhật", "Hình vuông", "Hình tam giác"], "correct" => 1],
                ["question" => "Vật nào sau đây có dạng khối hộp chữ nhật?", "options" => ["Quả bóng", "Hộp bánh", "Viên bi"], "correct" => 1],
                ["question" => "Khối rubik thường có dạng khối gì?", "options" => ["Khối tròn", "Khối lập phương", "Khối hộp chữ nhật"], "correct" => 1],
            ],
            'summary' => 'Bây giờ em đã nhận biết được khối hộp chữ nhật và khối lập phương rồi.'
        ]);

        $this->createSectionsForLesson('Tách - Gộp số', [
            'intro' => 'Tách và gộp số là một kỹ năng quan trọng để học cộng và trừ.',
            'video_url' => 'https://www.youtube.com/watch?v=TqkoYkDeLCE',
            'video_content' => 'Học cách tách và gộp các số trong phạm vi 10.',
            'questions' => [
                ["question" => "5 gồm 2 và mấy?", "options" => ["1", "2", "3", "4"], "correct" => 2],
                ["question" => "Gộp 4 và 1 được mấy?", "options" => ["4", "5", "6", "3"], "correct" => 1],
                ["question" => "7 gồm 5 và mấy?", "options" => ["1", "2", "3", "4"], "correct" => 1],
                ["question" => "Gộp 3 và 3 được mấy?", "options" => ["5", "6", "7", "8"], "correct" => 1],
                ["question" => "8 gồm mấy và 6?", "options" => ["1", "2", "3", "4"], "correct" => 1],
                ["question" => "Gộp 2 và 6 được mấy?", "options" => ["7", "8", "9", "10"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách tách một số thành hai số và gộp hai số thành một số.'
        ]);

        $this->createSectionsForLesson('So sánh các số: bằng, lớn hơn, bé hơn', [
            'intro' => 'So sánh giúp chúng ta biết nhóm nào có nhiều hơn, ít hơn hoặc bằng nhau.',
            'video_url' => 'https://www.youtube.com/watch?v=FIMx0gsAz-I',
            'video_content' => 'Học cách so sánh số lượng và các con số.',
            'questions' => [
                ["question" => "Số 5 ... số 3?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 0],
                ["question" => "Số 8 ... số 9?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 1],
                ["question" => "Số 4 ... số 4?", "options" => ["Lớn hơn", "Bé hơn", "Bằng"], "correct" => 2],
                ["question" => "Số nào lớn nhất trong các số: 2, 7, 5?", "options" => ["2", "7", "5"], "correct" => 1],
                ["question" => "Số nào bé nhất trong các số: 9, 6, 8?", "options" => ["9", "6", "8"], "correct" => 1],
            ],
            'summary' => 'Em đã biết so sánh hai số và tìm ra số lớn nhất, số bé nhất.'
        ]);
        
        $this->createSectionsForLesson('Các dấu =, >, <', [
            'intro' => 'Chúng ta sẽ học về các dấu đặc biệt để so sánh các số.',
            'video_url' => 'https://www.youtube.com/watch?v=a_pMr-v4_Gk',
            'video_content' => 'Học về ý nghĩa và cách viết các dấu so sánh.',
            'questions' => [
                ["question" => "Điền dấu thích hợp: 5 ... 8", "options" => [">", "<", "="], "correct" => 1],
                ["question" => "Điền dấu thích hợp: 7 ... 7", "options" => [">", "<", "="], "correct" => 2],
                ["question" => "Điền dấu thích hợp: 9 ... 4", "options" => [">", "<", "="], "correct" => 0],
                ["question" => "Phép so sánh nào đúng?", "options" => ["6 > 8", "5 < 4", "3 < 7"], "correct" => 2],
                ["question" => "Phép so sánh nào sai?", "options" => ["10 > 9", "2 = 2", "5 < 3"], "correct" => 2],
            ],
            'summary' => 'Em đã biết cách sử dụng dấu >, <, = để so sánh các số rồi.'
        ]);
        
        $this->createSectionsForLesson('Các số từ 6 đến 9', [
            'intro' => 'Cùng đếm và làm quen với các số 6, 7, 8, 9 nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=bGetqgxESH8',
            'video_content' => 'Video dạy đếm và nhận biết các số từ 6 đến 9.',
            'questions' => [
                ["question" => "Số liền sau số 8 là số nào?", "options" => ["7", "8", "9"], "correct" => 2],
                ["question" => "Số nào đứng giữa số 5 và số 7?", "options" => ["6", "8", "4"], "correct" => 0],
                ["question" => "Trong các số 9, 6, 8, số nào lớn nhất?", "options" => ["9", "6", "8"], "correct" => 0],
                ["question" => "7 gồm 3 và mấy?", "options" => ["2", "3", "4"], "correct" => 2],
            ],
            'summary' => 'Em đã thuộc các số từ 1 đến 9 và biết so sánh chúng.'
        ]);

        $this->createSectionsForLesson('Số 0 và Số 10', [
            'intro' => 'Hôm nay chúng ta sẽ tìm hiểu về hai con số rất đặc biệt!',
            'video_url' => 'https://www.youtube.com/watch?v=9t7b8-A-nE8',
            'video_content' => 'Học về số 0 và số 10.',
            'questions' => [
                ["question" => "Trong giỏ không có quả táo nào. Số quả táo trong giỏ là mấy?", "options" => ["1", "0", "10"], "correct" => 1],
                ["question" => "Số liền sau của số 9 là số nào?", "options" => ["8", "9", "10"], "correct" => 2],
                ["question" => "3 + 0 = ?", "options" => ["0", "3", "30"], "correct" => 1],
                ["question" => "5 - 5 = ?", "options" => ["0", "1", "5"], "correct" => 0],
                ["question" => "Số 10 gồm 1 chục và mấy đơn vị?", "options" => ["1", "10", "0"], "correct" => 2],
            ],
            'summary' => 'Em đã hiểu ý nghĩa của số 0 và biết về số 10.'
        ]);

        $this->createSectionsForLesson('Phép cộng trong phạm vi 10', [
            'intro' => 'Phép cộng giúp chúng ta tìm ra tổng số của nhiều nhóm đồ vật.',
            'video_url' => 'https://www.youtube.com/watch?v=S30csiS7yXY',
            'video_content' => 'Học cách làm các phép cộng đơn giản.',
            'questions' => [
                ["question" => "4 + 2 = ?", "options" => ["5", "6", "7"], "correct" => 1],
                ["question" => "5 + 3 = ?", "options" => ["7", "8", "9"], "correct" => 1],
                ["question" => "7 + 1 = ?", "options" => ["8", "9", "6"], "correct" => 0],
                ["question" => "3 + 6 = ?", "options" => ["8", "9", "10"], "correct" => 1],
                ["question" => "Có 3 quả cam, thêm 2 quả cam nữa. Hỏi có tất cả bao nhiêu quả cam?", "options" => ["4", "5", "6"], "correct" => 1],
            ],
            'summary' => 'Làm toán cộng thật vui! Em đã biết cách cộng các số trong phạm vi 10.'
        ]);

        $this->createSectionsForLesson('Phép trừ trong phạm vi 10', [
            'intro' => 'Phép trừ giúp chúng ta tìm ra số còn lại sau khi bớt đi.',
            'video_url' => 'https://www.youtube.com/watch?v=UqQe-a_A61c',
            'video_content' => 'Học cách làm các phép trừ đơn giản.',
            'questions' => [
                ["question" => "8 - 3 = ?", "options" => ["4", "5", "6"], "correct" => 1],
                ["question" => "7 - 5 = ?", "options" => ["1", "2", "3"], "correct" => 1],
                ["question" => "9 - 4 = ?", "options" => ["5", "6", "7"], "correct" => 0],
                ["question" => "10 - 6 = ?", "options" => ["3", "4", "5"], "correct" => 1],
                ["question" => "Có 6 cái kẹo, ăn hết 2 cái. Hỏi còn lại mấy cái kẹo?", "options" => ["3", "4", "5"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách trừ các số trong phạm vi 10. Thật dễ phải không nào?'
        ]);

        $this->createSectionsForLesson('Các số đến 20', [
            'intro' => 'Mở rộng thế giới số của chúng ta đến 20!',
            'video_url' => 'https://www.youtube.com/watch?v=a-kCo-A6y3k',
            'video_content' => 'Học đếm, đọc, viết các số từ 11 đến 20.',
            'questions' => [
                ["question" => "Số mười lăm viết là?", "options" => ["105", "15", "51"], "correct" => 1],
                ["question" => "Số liền sau của 19 là số nào?", "options" => ["18", "19", "20"], "correct" => 2],
                ["question" => "Số 12 gồm 1 chục và mấy đơn vị?", "options" => ["1", "2", "12"], "correct" => 1],
                ["question" => "Số nào lớn hơn: 17 hay 15?", "options" => ["17", "15", "Bằng nhau"], "correct" => 0],
                ["question" => "10 + 6 = ?", "options" => ["106", "16", "60"], "correct" => 1],
            ],
            'summary' => 'Em đã làm quen với các số trong phạm vi 20.'
        ]);

        $this->createSectionsForLesson('Chục và Số tròn chục', [
            'intro' => 'Cùng tìm hiểu về các số tròn chục nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=jV6Q6a_wA-w',
            'video_content' => 'Video giới thiệu về chục, đơn vị và các số tròn chục.',
            'questions' => [
                ["question" => "Số ba mươi viết là?", "options" => ["3", "13", "30"], "correct" => 2],
                ["question" => "Số 50 đọc là?", "options" => ["Năm", "Mười lăm", "Năm mươi"], "correct" => 2],
                ["question" => "Số tròn chục lớn nhất có 2 chữ số là?", "options" => ["10", "90", "99"], "correct" => 1],
                ["question" => "20 + 30 = ?", "options" => ["23", "50", "60"], "correct" => 1],
                ["question" => "70 - 40 = ?", "options" => ["30", "40", "74"], "correct" => 0],
            ],
            'summary' => 'Em đã biết đọc, viết các số tròn chục và làm phép tính với chúng.'
        ]);
        
        $this->createSectionsForLesson('Các số đến 100', [
            'intro' => 'Chúng ta sẽ khám phá tất cả các số từ 1 đến 100.',
            'video_url' => 'https://www.youtube.com/watch?v=JmdeqG0y3-Y',
            'video_content' => 'Video dạy đếm và nhận biết các số trong phạm vi 100.',
            'questions' => [
                ["question" => "Số sáu mươi hai viết là?", "options" => ["602", "26", "62"], "correct" => 2],
                ["question" => "Số 81 đọc là?", "options" => ["Tám mươi một", "Tám một", "Mười tám"], "correct" => 0],
                ["question" => "Số liền trước của 100 là?", "options" => ["90", "99", "101"], "correct" => 1],
                ["question" => "So sánh 54 và 45?", "options" => ["54 > 45", "54 < 45", "54 = 45"], "correct" => 0],
                ["question" => "Số lớn nhất có hai chữ số là?", "options" => ["90", "98", "99"], "correct" => 2],
            ],
            'summary' => 'Chúc mừng em đã chinh phục được các số đến 100!'
        ]);
        
        $this->createSectionsForLesson('Các ngày trong tuần', [
            'intro' => 'Một tuần có mấy ngày nhỉ? Cùng tìm hiểu nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=36n3g3gQo-A',
            'video_content' => 'Bài hát vui nhộn về các ngày trong tuần.',
            'questions' => [
                ["question" => "Một tuần lễ có mấy ngày?", "options" => ["5", "6", "7"], "correct" => 2],
                ["question" => "Hôm nay là thứ Ba, ngày mai là thứ mấy?", "options" => ["Thứ Hai", "Thứ Tư", "Thứ Năm"], "correct" => 1],
                ["question" => "Ngày đầu tiên trong tuần em đi học là thứ mấy?", "options" => ["Chủ nhật", "Thứ Hai", "Thứ Bảy"], "correct" => 1],
                ["question" => "Hôm qua là thứ Sáu, hôm nay là thứ mấy?", "options" => ["Thứ Năm", "Thứ Bảy", "Chủ nhật"], "correct" => 1],
                ["question" => "Ngày cuối tuần thường là những ngày nào?", "options" => ["Thứ Hai, Thứ Ba", "Thứ Sáu, Thứ Bảy", "Thứ Bảy, Chủ nhật"], "correct" => 2],
            ],
            'summary' => 'Em đã biết tên và thứ tự của các ngày trong một tuần rồi.'
        ]);
        
        // Lớp 2
        $this->createSectionsForLesson('Số hạng – Tổng', [
            'intro' => 'Trong phép cộng, mỗi con số đều có tên gọi riêng. Cùng tìm hiểu nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=e-pA-oETkgo',
            'video_content' => 'Video giới thiệu về số hạng và tổng trong phép cộng.',
            'questions' => [
                ["question" => "Trong phép tính 15 + 4 = 19, số 15 được gọi là gì?", "options" => ["Tổng", "Số hạng", "Hiệu"], "correct" => 1],
                ["question" => "Trong phép tính 15 + 4 = 19, số 19 được gọi là gì?", "options" => ["Tổng", "Số hạng", "Số trừ"], "correct" => 0],
                ["question" => "Kết quả của phép cộng được gọi là gì?", "options" => ["Số bị trừ", "Hiệu", "Tổng"], "correct" => 2],
                ["question" => "Biết hai số hạng là 10 và 7. Tổng là bao nhiêu?", "options" => ["3", "17", "107"], "correct" => 1],
                ["question" => "Trong phép tính '... + 5 = 12', số hạng còn thiếu là mấy?", "options" => ["17", "7", "5"], "correct" => 1],
            ],
            'summary' => 'Em đã biết gọi tên các thành phần của phép cộng: Số hạng và Tổng.'
        ]);
        
        $this->createSectionsForLesson('Số bị trừ – Số trừ – Hiệu', [
            'intro' => 'Giống như phép cộng, các thành phần của phép trừ cũng có tên gọi riêng.',
            'video_url' => 'https://www.youtube.com/watch?v=vVAVQp_dMVE',
            'video_content' => 'Tìm hiểu về số bị trừ, số trừ và hiệu.',
            'questions' => [
                ["question" => "Trong phép tính 28 - 6 = 22, số 28 được gọi là gì?", "options" => ["Số bị trừ", "Số trừ", "Hiệu"], "correct" => 0],
                ["question" => "Trong phép tính 28 - 6 = 22, số 6 được gọi là gì?", "options" => ["Số bị trừ", "Số trừ", "Hiệu"], "correct" => 1],
                ["question" => "Kết quả của phép trừ được gọi là gì?", "options" => ["Tổng", "Số hạng", "Hiệu"], "correct" => 2],
                ["question" => "Biết số bị trừ là 15, số trừ là 5. Hiệu là bao nhiêu?", "options" => ["10", "20", "5"], "correct" => 0],
                ["question" => "Hiệu của 30 và 10 là bao nhiêu?", "options" => ["40", "20", "30"], "correct" => 1],
            ],
            'summary' => 'Em đã phân biệt được Số bị trừ, Số trừ và Hiệu.'
        ]);
        
        $this->createSectionsForLesson('Điểm – Đoạn thẳng', [
            'intro' => 'Cùng làm quen với những khái niệm đầu tiên của hình học nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=N_p33kFzeWc',
            'video_content' => 'Học cách nhận biết điểm, đoạn thẳng và cách vẽ đoạn thẳng.',
            'questions' => [
                ["question" => "Hình ảnh nào là một điểm?", "options" => ["Một dấu chấm nhỏ", "Một vạch kẻ dài", "Một hình tròn"], "correct" => 0],
                ["question" => "Đoạn thẳng AB được tạo bởi mấy điểm?", "options" => ["1 điểm", "2 điểm (A và B)", "3 điểm"], "correct" => 1],
                ["question" => "Để vẽ một đoạn thẳng, em cần dùng dụng cụ gì?", "options" => ["Com-pa", "Thước kẻ", "Kéo"], "correct" => 1],
                ["question" => "Đoạn thẳng có bị kéo dài mãi về hai phía không?", "options" => ["Có", "Không"], "correct" => 1],
                ["question" => "Nối 2 điểm A và B ta được gì?", "options" => ["Điểm C", "Đoạn thẳng AB", "Hình vuông"], "correct" => 1],
            ],
            'summary' => 'Em đã biết thế nào là một điểm và một đoạn thẳng.'
        ]);
        
        $this->createSectionsForLesson('Đề-xi-mét', [
            'intro' => 'Ngoài xăng-ti-mét, chúng ta còn một đơn vị đo độ dài khác là đề-xi-mét.',
            'video_url' => 'https://www.youtube.com/watch?v=sI9yKkCg0q4',
            'video_content' => 'Học về đơn vị đo đề-xi-mét và cách đổi giữa dm và cm.',
            'questions' => [
                ["question" => "Đề-xi-mét được viết tắt là gì?", "options" => ["cm", "m", "dm"], "correct" => 2],
                ["question" => "1 dm bằng bao nhiêu cm?", "options" => ["1 cm", "10 cm", "100 cm"], "correct" => 1],
                ["question" => "20 cm bằng bao nhiêu dm?", "options" => ["2 dm", "20 dm", "10 dm"], "correct" => 0],
                ["question" => "Vật nào sau đây có thể dài khoảng 1 dm?", "options" => ["Cục tẩy", "Hộp bút", "Cái bảng"], "correct" => 1],
                ["question" => "So sánh: 5 dm ... 40 cm", "options" => [">", "<", "="], "correct" => 0],
            ],
            'summary' => 'Em đã biết thêm một đơn vị đo độ dài mới là đề-xi-mét (dm).'
        ]);

        $this->createSectionsForLesson('9 cộng với một số', [
            'intro' => 'Có một mẹo rất hay để tính nhẩm phép cộng 9 với một số. Cùng khám phá nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=f-B-UjG2p1s',
            'video_content' => 'Học cách thực hiện phép cộng dạng 9 + a.',
            'questions' => [
                ["question" => "9 + 5 = ?", "options" => ["13", "14", "15"], "correct" => 1],
                ["question" => "9 + 7 = ?", "options" => ["16", "17", "18"], "correct" => 0],
                ["question" => "9 + 3 = ?", "options" => ["11", "12", "13"], "correct" => 1],
                ["question" => "Để tính 9 + 6, ta có thể lấy 10 + ...?", "options" => ["6", "5", "4"], "correct" => 1],
                ["question" => "Lớp 2A có 9 bạn nam và 8 bạn nữ. Lớp có tất cả bao nhiêu bạn?", "options" => ["16", "17", "18"], "correct" => 1],
            ],
            'summary' => 'Em đã nắm được cách cộng một số với 9 một cách nhanh chóng.'
        ]);

        $this->createSectionsForLesson('Đường gấp khúc', [
            'intro' => 'Khi nhiều đoạn thẳng nối với nhau, chúng ta có một hình mới gọi là đường gấp khúc.',
            'video_url' => 'https://www.youtube.com/watch?v=hG9-d2i-4W8',
            'video_content' => 'Tìm hiểu về đường gấp khúc và cách tính độ dài của nó.',
            'questions' => [
                ["question" => "Đường gấp khúc được tạo thành từ nhiều ...?", "options" => ["Điểm", "Đoạn thẳng", "Hình tròn"], "correct" => 1],
                ["question" => "Đường gấp khúc ABC gồm mấy đoạn thẳng?", "options" => ["1", "2", "3"], "correct" => 1],
                ["question" => "Độ dài đường gấp khúc bằng ... độ dài các đoạn thẳng?", "options" => ["Tổng", "Hiệu", "Tích"], "correct" => 0],
                ["question" => "Một đường gấp khúc có 2 đoạn thẳng dài 5cm và 7cm. Độ dài đường gấp khúc là?", "options" => ["10cm", "12cm", "15cm"], "correct" => 1],
                ["question" => "Hình nào sau đây là đường gấp khúc?", "options" => ["Hình tam giác", "Hình zic-zắc", "Hình tròn"], "correct" => 1],
            ],
            'summary' => 'Em đã nhận biết được đường gấp khúc và biết cách tính độ dài của nó.'
        ]);

        $this->createSectionsForLesson('11 trừ đi một số', [
            'intro' => 'Chúng ta sẽ học cách thực hiện phép trừ khi số bị trừ là 11.',
            'video_url' => 'https://www.youtube.com/watch?v=0hT72_3dwh0',
            'video_content' => 'Hướng dẫn cách làm phép tính dạng 11 - a.',
            'questions' => [
                ["question" => "11 - 4 = ?", "options" => ["6", "7", "8"], "correct" => 1],
                ["question" => "11 - 8 = ?", "options" => ["3", "4", "5"], "correct" => 0],
                ["question" => "11 - 5 = ?", "options" => ["5", "6", "7"], "correct" => 1],
                ["question" => "Có 11 quả táo, đã ăn hết 2 quả. Còn lại bao nhiêu quả?", "options" => ["8", "9", "10"], "correct" => 1],
                ["question" => "Phép tính nào có kết quả bằng 5?", "options" => ["11 - 7", "11 - 6", "11 - 5"], "correct" => 1],
            ],
            'summary' => 'Thực hiện phép trừ 11 cho một số không còn làm khó được em nữa.'
        ]);

        $this->createSectionsForLesson('Lít', [
            'intro' => 'Làm thế nào để đo nước, sữa hay xăng? Chúng ta dùng đơn vị lít!',
            'video_url' => 'https://www.youtube.com/watch?v=jSg0hG-dJkU',
            'video_content' => 'Giới thiệu về đơn vị đo dung tích Lít.',
            'questions' => [
                ["question" => "Lít là đơn vị đo ...?", "options" => ["Độ dài", "Cân nặng", "Dung tích (chất lỏng)"], "correct" => 2],
                ["question" => "Chai nước suối thường có dung tích khoảng bao nhiêu?", "options" => ["1 lít", "10 lít", "100 lít"], "correct" => 0],
                ["question" => "Lít được viết tắt là gì?", "options" => ["l", "kg", "m"], "correct" => 0],
                ["question" => "Can thứ nhất có 10l dầu, can thứ hai có 5l dầu. Cả hai can có bao nhiêu lít dầu?", "options" => ["5l", "10l", "15l"], "correct" => 2],
                ["question" => "Thùng nước có 20l, lấy ra dùng 8l. Trong thùng còn lại bao nhiêu lít?", "options" => ["12l", "28l", "8l"], "correct" => 0],
            ],
            'summary' => 'Em đã biết về lít và có thể giải các bài toán liên quan đến lít.'
        ]);

        $this->createSectionsForLesson('Phép cộng có nhớ trong phạm vi 100', [
            'intro' => 'Đôi khi cộng hai số, kết quả ở hàng đơn vị lại lớn hơn 10. Đó là phép cộng có nhớ.',
            'video_url' => 'https://www.youtube.com/watch?v=8fk-syGO4jA',
            'video_content' => 'Hướng dẫn chi tiết cách đặt tính và thực hiện phép cộng có nhớ.',
            'questions' => [
                ["question" => "27 + 15 = ?", "options" => ["32", "42", "52"], "correct" => 1],
                ["question" => "48 + 36 = ?", "options" => ["74", "84", "94"], "correct" => 1],
                ["question" => "59 + 23 = ?", "options" => ["82", "72", "92"], "correct" => 0],
                ["question" => "Khi cộng hàng đơn vị có kết quả là 14, ta viết 4 và nhớ mấy?", "options" => ["Nhớ 4", "Nhớ 1", "Nhớ 10"], "correct" => 1],
                ["question" => "Một cửa hàng buổi sáng bán được 35kg gạo, buổi chiều bán được 48kg. Cả ngày bán được bao nhiêu kg?", "options" => ["73kg", "83kg", "93kg"], "correct" => 1],
            ],
            'summary' => 'Em đã thành thạo phép cộng có nhớ trong phạm vi 100.'
        ]);
        
        $this->createSectionsForLesson('Phép trừ có nhớ trong phạm vi 100', [
            'intro' => 'Phép trừ có nhớ cũng thú vị không kém. Cùng học cách thực hiện nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=kYxOo3t42-A',
            'video_content' => 'Học cách thực hiện phép trừ có nhớ (vay mượn).',
            'questions' => [
                ["question" => "52 - 27 = ?", "options" => ["25", "35", "15"], "correct" => 0],
                ["question" => "81 - 49 = ?", "options" => ["42", "22", "32"], "correct" => 2],
                ["question" => "60 - 35 = ?", "options" => ["25", "35", "15"], "correct" => 0],
                ["question" => "Để thực hiện 43 - 18, ở hàng đơn vị ta lấy 13 trừ 8. Đúng hay sai?", "options" => ["Đúng", "Sai"], "correct" => 0],
                ["question" => "Sợi dây dài 70cm, cắt đi 25cm. Sợi dây còn lại dài bao nhiêu?", "options" => ["55cm", "45cm", "95cm"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách thực hiện phép trừ có nhớ trong phạm vi 100.'
        ]);

        $this->createSectionsForLesson('Biểu đồ tranh', [
            'intro' => 'Biểu đồ tranh giúp chúng ta nhìn thông tin một cách dễ dàng và sinh động.',
            'video_url' => 'https://www.youtube.com/watch?v=lO0v3iGzNcw',
            'video_content' => 'Làm quen với biểu đồ tranh và cách đọc số liệu từ biểu đồ.',
            'questions' => [
                ["question" => "Nhìn vào biểu đồ tranh, làm sao để biết số lượng của một đối tượng?", "options" => ["Đoán", "Đếm số hình ảnh tương ứng", "Hỏi cô giáo"], "correct" => 1],
                ["question" => "Nếu mỗi bông hoa ứng với 2 cây, 3 bông hoa sẽ ứng với mấy cây?", "options" => ["3 cây", "5 cây", "6 cây"], "correct" => 2],
                ["question" => "Biểu đồ tranh dùng gì để biểu diễn số liệu?", "options" => ["Con số", "Chữ viết", "Hình ảnh, biểu tượng"], "correct" => 2],
                ["question" => "Ưu điểm của biểu đồ tranh là gì?", "options" => ["Khó hiểu", "Dễ hiểu, sinh động", "Chỉ dùng cho người lớn"], "correct" => 1],
                ["question" => "Loại quả nào được yêu thích nhất nếu hình ảnh của nó xuất hiện nhiều nhất trên biểu đồ?", "options" => ["Loại ít hình nhất", "Loại nhiều hình nhất", "Loại ở giữa"], "correct" => 1],
            ],
            'summary' => 'Bây giờ em đã có thể tự tin đọc và hiểu một biểu đồ tranh đơn giản.'
        ]);

        $this->createSectionsForLesson('Ngày, giờ', [
            'intro' => 'Thời gian rất quan trọng. Cùng học cách xem giờ và biết về một ngày nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=6i_y-i44d4A',
            'video_content' => 'Học về các buổi trong ngày và cách xem đồng hồ đúng.',
            'questions' => [
                ["question" => "Một ngày có bao nhiêu giờ?", "options" => ["12 giờ", "24 giờ", "60 giờ"], "correct" => 1],
                ["question" => "Trên mặt đồng hồ, kim ngắn chỉ gì?", "options" => ["Chỉ giờ", "Chỉ phút", "Chỉ giây"], "correct" => 0],
                ["question" => "Khi kim dài chỉ số 12, kim ngắn chỉ số 3, đó là mấy giờ?", "options" => ["12 giờ 3", "3 giờ 12", "3 giờ đúng"], "correct" => 2],
                ["question" => "Buổi tối em thường làm gì?", "options" => ["Đi học", "Ăn sáng", "Ăn tối và đi ngủ"], "correct" => 2],
                ["question" => "1 giờ có bao nhiêu phút?", "options" => ["30 phút", "60 phút", "100 phút"], "correct" => 1],
            ],
            'summary' => 'Em đã biết một ngày có 24 giờ và biết cách xem giờ đúng trên đồng hồ.'
        ]);

        $this->createSectionsForLesson('Ngày, tháng', [
            'intro' => 'Ngoài ngày và giờ, chúng ta còn cần biết về ngày tháng để xem lịch.',
            'video_url' => 'https://www.youtube.com/watch?v=Fk7yF_9I43U',
            'video_content' => 'Tìm hiểu về các tháng trong năm và cách xem lịch tờ.',
            'questions' => [
                ["question" => "Một năm có bao nhiêu tháng?", "options" => ["7 tháng", "10 tháng", "12 tháng"], "correct" => 2],
                ["question" => "Tháng 2 thường có bao nhiêu ngày?", "options" => ["28 hoặc 29 ngày", "30 ngày", "31 ngày"], "correct" => 0],
                ["question" => "Ngày sinh nhật của Bác Hồ là ngày nào?", "options" => ["19/5", "2/9", "30/4"], "correct" => 0],
                ["question" => "Tờ lịch cho ta biết thông tin gì?", "options" => ["Thứ, ngày, tháng, năm", "Chỉ ngày", "Chỉ tháng"], "correct" => 0],
                ["question" => "Tháng nào có 31 ngày?", "options" => ["Tháng 4", "Tháng 6", "Tháng 1"], "correct" => 2],
            ],
            'summary' => 'Em đã biết về các ngày, tháng trong năm và cách sử dụng lịch.'
        ]);

        // Lớp 3
        $this->createSectionsForLesson('Ôn tập các số đến 1 000', [
            'intro' => 'Cùng ôn lại cách đọc, viết và so sánh các số có ba chữ số nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=gTz-g0Q5-5g',
            'video_content' => 'Video giúp em củng cố kiến thức về các số trong phạm vi 1000.',
            'questions' => [
                ["question" => "Số 'tám trăm năm mươi hai' viết là?", "options" => ["802", "852", "825"], "correct" => 1],
                ["question" => "Số 909 đọc là?", "options" => ["Chín trăm chín mươi", "Chín trăm linh chín", "Chín chín không"], "correct" => 1],
                ["question" => "Số liền sau của 499 là?", "options" => ["498", "500", "501"], "correct" => 1],
                ["question" => "Điền dấu thích hợp: 678 ... 687", "options" => [">", "<", "="], "correct" => 1],
                ["question" => "Số lớn nhất có ba chữ số là?", "options" => ["900", "990", "999"], "correct" => 2],
            ],
            'summary' => 'Em đã ôn tập vững chắc về các số trong phạm vi 1000.'
        ]);

        $this->createSectionsForLesson('Ôn tập phép cộng, phép trừ trong phạm vi 1 000', [
            'intro' => 'Hãy cùng rèn luyện kỹ năng cộng, trừ các số có ba chữ số nào!',
            'video_url' => 'https://www.youtube.com/watch?v=Gk5hWSnycqM',
            'video_content' => 'Video hướng dẫn ôn tập phép cộng và trừ trong phạm vi 1000.',
            'questions' => [
                ["question" => "345 + 123 = ?", "options" => ["458", "468", "478"], "correct" => 1],
                ["question" => "876 - 543 = ?", "options" => ["333", "323", "313"], "correct" => 0],
                ["question" => "452 + 168 = ?", "options" => ["610", "620", "630"], "correct" => 1],
                ["question" => "715 - 239 = ?", "options" => ["476", "486", "496"], "correct" => 0],
                ["question" => "Tìm x, biết x + 250 = 600", "options" => ["350", "450", "850"], "correct" => 0],
            ],
            'summary' => 'Các phép tính cộng, trừ trong phạm vi 1000 không còn làm khó được em nữa.'
        ]);

        $this->createSectionsForLesson('Bảng nhân 6, bảng chia 6', [
            'intro' => 'Học thuộc bảng nhân 6 và bảng chia 6 sẽ giúp em tính toán nhanh hơn rất nhiều.',
            'video_url' => 'https://www.youtube.com/watch?v=F2bXIBw_1xQ',
            'video_content' => 'Bài hát vui nhộn về bảng nhân 6.',
            'questions' => [
                ["question" => "6 x 7 = ?", "options" => ["36", "42", "48"], "correct" => 1],
                ["question" => "6 x 9 = ?", "options" => ["54", "56", "63"], "correct" => 0],
                ["question" => "30 : 6 = ?", "options" => ["4", "5", "6"], "correct" => 1],
                ["question" => "48 : 6 = ?", "options" => ["7", "8", "9"], "correct" => 1],
                ["question" => "Mỗi hộp có 6 cái bánh. 5 hộp như vậy có bao nhiêu cái bánh?", "options" => ["11", "30", "24"], "correct" => 1],
            ],
            'summary' => 'Em đã thuộc lòng bảng nhân 6 và bảng chia 6.'
        ]);
        
        $this->createSectionsForLesson('Bảng nhân 7, bảng chia 7', [
            'intro' => 'Cùng chinh phục bảng nhân 7 và bảng chia 7 nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=tIujc4a2yTA',
            'video_content' => 'Học bảng nhân 7 qua bài hát sôi động.',
            'questions' => [
                ["question" => "7 x 5 = ?", "options" => ["35", "42", "28"], "correct" => 0],
                ["question" => "7 x 8 = ?", "options" => ["49", "54", "56"], "correct" => 2],
                ["question" => "21 : 7 = ?", "options" => ["3", "4", "5"], "correct" => 0],
                ["question" => "63 : 7 = ?", "options" => ["7", "8", "9"], "correct" => 2],
                ["question" => "Một tuần có 7 ngày. Hỏi 4 tuần có bao nhiêu ngày?", "options" => ["11", "24", "28"], "correct" => 2],
            ],
            'summary' => 'Bảng nhân 7 và bảng chia 7 thật thú vị phải không nào!'
        ]);
        
        $this->createSectionsForLesson('Một phần mấy', [
            'intro' => 'Chia một vật thành nhiều phần bằng nhau, mỗi phần được gọi là "một phần mấy".',
            'video_url' => 'https://www.youtube.com/watch?v=FJRPlk-Hk8M',
            'video_content' => 'Video trực quan giúp em hiểu rõ về "một phần mấy".',
            'questions' => [
                ["question" => "Hình vuông được chia thành 4 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình vuông?", "options" => ["1/2", "1/3", "1/4"], "correct" => 2],
                ["question" => "1/2 của 10 quả cam là mấy quả cam?", "options" => ["2", "5", "8"], "correct" => 1],
                ["question" => "1/3 của 12 cái kẹo là mấy cái kẹo?", "options" => ["3", "4", "6"], "correct" => 1],
                ["question" => "Phân số nào lớn hơn: 1/5 hay 1/6?", "options" => ["1/5", "1/6", "Bằng nhau"], "correct" => 0],
                ["question" => "Lớp có 30 bạn, 1/5 số bạn là nữ. Hỏi lớp có bao nhiêu bạn nữ?", "options" => ["5", "6", "10"], "correct" => 1],
            ],
            'summary' => 'Em đã hiểu và biết cách tìm một phần mấy của một số.'
        ]);
        
        $this->createSectionsForLesson('Góc, góc vuông, góc không vuông', [
            'intro' => 'Xung quanh chúng ta có rất nhiều loại góc khác nhau. Hãy cùng tìm hiểu nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=2vYLoXXbW4o',
            'video_content' => 'Phân biệt góc vuông, góc nhọn, góc tù bằng ê ke.',
            'questions' => [
                ["question" => "Góc tạo bởi hai cạnh của thước ê ke là góc gì?", "options" => ["Góc vuông", "Góc nhọn", "Góc tù"], "correct" => 0],
                ["question" => "Góc bé hơn góc vuông gọi là góc gì?", "options" => ["Góc tù", "Góc bẹt", "Góc nhọn"], "correct" => 2],
                ["question" => "Góc lớn hơn góc vuông gọi là góc gì?", "options" => ["Góc tù", "Góc nhọn", "Góc vuông"], "correct" => 0],
                ["question" => "Lúc 3 giờ đúng, kim giờ và kim phút của đồng hồ tạo thành góc gì?", "options" => ["Góc nhọn", "Góc tù", "Góc vuông"], "correct" => 2],
                ["question" => "Chúng ta dùng dụng cụ gì để kiểm tra một góc có phải là góc vuông không?", "options" => ["Thước kẻ", "Com-pa", "Ê ke"], "correct" => 2],
            ],
            'summary' => 'Em đã nhận biết được các loại góc và biết dùng ê ke để kiểm tra góc vuông.'
        ]);
        
        $this->createSectionsForLesson('Hình chữ nhật, hình vuông', [
            'intro' => 'Hình chữ nhật và hình vuông là hai hình rất quen thuộc. Chúng có đặc điểm gì nhỉ?',
            'video_url' => 'https://www.youtube.com/watch?v=O1_yI432oNo',
            'video_content' => 'Tìm hiểu đặc điểm và cách tính chu vi hình chữ nhật, hình vuông.',
            'questions' => [
                ["question" => "Hình chữ nhật có mấy cặp cạnh đối diện song song và bằng nhau?", "options" => ["1 cặp", "2 cặp", "Không có cặp nào"], "correct" => 1],
                ["question" => "Hình vuông có đặc điểm gì đặc biệt?", "options" => ["4 cạnh bằng nhau và 4 góc vuông", "4 cạnh không bằng nhau", "Chỉ có 2 góc vuông"], "correct" => 0],
                ["question" => "Chu vi hình chữ nhật có chiều dài 5cm, chiều rộng 3cm là bao nhiêu?", "options" => ["8cm", "15cm", "16cm"], "correct" => 2],
                ["question" => "Chu vi hình vuông có cạnh 4cm là bao nhiêu?", "options" => ["8cm", "12cm", "16cm"], "correct" => 2],
                ["question" => "Một hình chữ nhật có phải là một hình tứ giác không?", "options" => ["Có", "Không"], "correct" => 0],
            ],
            'summary' => 'Em đã nắm được các đặc điểm và cách tính chu vi của hình chữ nhật và hình vuông.'
        ]);
        
        $this->createSectionsForLesson('Nhân số có hai chữ số với số có một chữ số', [
            'intro' => 'Cùng học cách nhân số có hai chữ số với số có một chữ số nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=JqfN4sXXBls',
            'video_content' => 'Hướng dẫn chi tiết cách đặt tính và thực hiện phép nhân.',
            'questions' => [
                ["question" => "24 x 2 = ?", "options" => ["46", "48", "50"], "correct" => 1],
                ["question" => "31 x 3 = ?", "options" => ["93", "63", "34"], "correct" => 0],
                ["question" => "15 x 4 = ?", "options" => ["40", "50", "60"], "correct" => 2],
                ["question" => "37 x 2 = ?", "options" => ["64", "74", "84"], "correct" => 1],
                ["question" => "Mỗi lớp có 25 học sinh. Hỏi 3 lớp như vậy có bao nhiêu học sinh?", "options" => ["65", "75", "85"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách thực hiện phép nhân số có hai chữ số với số có một chữ số.'
        ]);
        
        $this->createSectionsForLesson('Phép chia hết, phép chia có dư', [
            'intro' => 'Không phải lúc nào phép chia cũng chia hết. Cùng tìm hiểu về phép chia có dư nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=uCg03LI1g6U',
            'video_content' => 'Video minh họa sự khác nhau giữa phép chia hết và phép chia có dư.',
            'questions' => [
                ["question" => "15 : 3 = 5. Đây là phép chia gì?", "options" => ["Phép chia hết", "Phép chia có dư"], "correct" => 0],
                ["question" => "17 : 3 = ?", "options" => ["5 (dư 1)", "5 (dư 2)", "6 (dư -1)"], "correct" => 1],
                ["question" => "Trong phép chia có dư, số dư phải như thế nào so với số chia?", "options" => ["Lớn hơn", "Bằng", "Nhỏ hơn"], "correct" => 2],
                ["question" => "Phép chia nào sau đây có số dư là 3?", "options" => ["23 : 4", "24 : 5", "25 : 6"], "correct" => 0],
                ["question" => "Có 20 quả táo chia đều cho 6 bạn. Mỗi bạn được mấy quả và còn dư mấy quả?", "options" => ["3 quả, dư 2 quả", "2 quả, dư 8 quả", "4 quả, dư 0 quả"], "correct" => 0],
            ],
            'summary' => 'Em đã phân biệt được phép chia hết, phép chia có dư và biết tìm số dư.'
        ]);
        
        $this->createSectionsForLesson('Bài toán giải bằng hai bước tính', [
            'intro' => 'Một số bài toán phức tạp hơn sẽ cần đến hai bước tính để giải quyết.',
            'video_url' => 'https://www.youtube.com/watch?v=F0_kS_jXl1c',
            'video_content' => 'Phân tích và hướng dẫn giải các dạng toán bằng hai bước tính.',
            'questions' => [
                ["question" => "Thùng thứ nhất có 10l dầu, thùng thứ hai có nhiều hơn thùng thứ nhất 5l. Hỏi cả hai thùng có bao nhiêu lít dầu?", "options" => ["15l", "20l", "25l"], "correct" => 2],
                ["question" => "Có 30 cái kẹo, chia cho 3 bạn. Sau đó mỗi bạn cho đi 2 cái. Hỏi mỗi bạn còn lại mấy cái kẹo?", "options" => ["8 cái", "10 cái", "12 cái"], "correct" => 0],
                ["question" => "Để giải bài toán trên, bước đầu tiên cần tìm gì?", "options" => ["Số dầu thùng thứ hai", "Tổng số dầu cả hai thùng", "Hiệu số dầu hai thùng"], "correct" => 0],
                ["question" => "Mẹ mua 5 túi bánh, mỗi túi có 4 cái. Mẹ cho em 3 cái. Hỏi mẹ còn lại bao nhiêu cái bánh?", "options" => ["17", "20", "23"], "correct" => 0],
                ["question" => "Bước thứ hai trong bài toán 'Mẹ mua 5 túi bánh...' là gì?", "options" => ["Tính tổng số bánh mẹ mua", "Tính số bánh còn lại", "Tính số túi bánh còn lại"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách phân tích và giải các bài toán bằng hai bước tính.'
        ]);
        
        $this->createSectionsForLesson('Mi-li-mét', [
            'intro' => 'Để đo những vật rất nhỏ, chúng ta cần một đơn vị nhỏ hơn cả xăng-ti-mét!',
            'video_url' => 'https://www.youtube.com/watch?v=68a_hLq94_w',
            'video_content' => 'Giới thiệu về đơn vị mi-li-mét (mm) và cách sử dụng trên thước kẻ.',
            'questions' => [
                ["question" => "Mi-li-mét được viết tắt là gì?", "options" => ["m", "cm", "mm"], "correct" => 2],
                ["question" => "1 cm bằng bao nhiêu mm?", "options" => ["1 mm", "10 mm", "100 mm"], "correct" => 1],
                ["question" => "50 mm bằng bao nhiêu cm?", "options" => ["5 cm", "50 cm", "500 cm"], "correct" => 0],
                ["question" => "Đơn vị nào phù hợp để đo độ dày của một quyển sách?", "options" => ["mét (m)", "mi-li-mét (mm)", "ki-lô-mét (km)"], "correct" => 1],
                ["question" => "2 cm 5 mm = ... mm?", "options" => ["7 mm", "25 mm", "205 mm"], "correct" => 1],
            ],
            'summary' => 'Em đã biết về đơn vị đo mi-li-mét và mối quan hệ của nó với xăng-ti-mét.'
        ]);
        
        $this->createSectionsForLesson('Gam', [
            'intro' => 'Để cân những vật nhẹ, chúng ta dùng đơn vị gam.',
            'video_url' => 'https://www.youtube.com/watch?v=zJgQYmle8q0',
            'video_content' => 'Tìm hiểu về đơn vị gam (g) và mối quan hệ với ki-lô-gam (kg).',
            'questions' => [
                ["question" => "Gam được viết tắt là gì?", "options" => ["g", "kg", "gam"], "correct" => 0],
                ["question" => "1 kg bằng bao nhiêu gam?", "options" => ["10 g", "100 g", "1000 g"], "correct" => 2],
                ["question" => "Vật nào sau đây thường được cân bằng gam?", "options" => ["Một bao gạo", "Một quả cam", "Một gói bột ngọt"], "correct" => 2],
                ["question" => "3000 g bằng bao nhiêu kg?", "options" => ["300 kg", "30 kg", "3 kg"], "correct" => 2],
                ["question" => "Quả táo cân nặng 150g, quả lê cân nặng 200g. Cả hai quả nặng bao nhiêu gam?", "options" => ["350g", "300g", "250g"], "correct" => 0],
            ],
            'summary' => 'Em đã biết về đơn vị đo khối lượng gam và cách đổi sang ki-lô-gam.'
        ]);
        
        $this->createSectionsForLesson('Nhân số có ba chữ số với số có một chữ số', [
            'intro' => 'Cùng nâng cao kỹ năng nhân với số có ba chữ số nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=S012A34A_3A',
            'video_content' => 'Video hướng dẫn cách đặt tính rồi tính nhân số có ba chữ số.',
            'questions' => [
                ["question" => "123 x 3 = ?", "options" => ["369", "366", "399"], "correct" => 0],
                ["question" => "215 x 4 = ?", "options" => ["840", "850", "860"], "correct" => 2],
                ["question" => "308 x 2 = ?", "options" => ["606", "616", "626"], "correct" => 1],
                ["question" => "Một xe chở 150kg xi măng. Hỏi 5 xe như vậy chở bao nhiêu kg xi măng?", "options" => ["650kg", "750kg", "850kg"], "correct" => 1],
                ["question" => "Kết quả của phép nhân 241 x 3 là?", "options" => ["623", "723", "823"], "correct" => 1],
            ],
            'summary' => 'Nhân số có ba chữ số với số có một chữ số thật đơn giản phải không nào!'
        ]);
        
        $this->createSectionsForLesson('Chia số có ba chữ số cho số có một chữ số', [
            'intro' => 'Học chia số có ba chữ số sẽ giúp em giải được nhiều bài toán hơn.',
            'video_url' => 'https://www.youtube.com/watch?v=q648j5g6-kM',
            'video_content' => 'Hướng dẫn chi tiết từng bước chia số có ba chữ số cho số có một chữ số.',
            'questions' => [
                ["question" => "486 : 2 = ?", "options" => ["243", "244", "234"], "correct" => 0],
                ["question" => "936 : 3 = ?", "options" => ["311", "312", "313"], "correct" => 1],
                ["question" => "515 : 5 = ?", "options" => ["13", "103", "130"], "correct" => 1],
                ["question" => "728 : 7 = ?", "options" => ["104", "14", "140"], "correct" => 0],
                ["question" => "Có 120 quyển vở chia đều cho 4 lớp. Mỗi lớp có bao nhiêu quyển vở?", "options" => ["30", "40", "50"], "correct" => 0],
            ],
            'summary' => 'Em đã nắm vững cách chia số có ba chữ số cho số có một chữ số.'
        ]);
        
        $this->createSectionsForLesson('Biểu thức số. Tính giá trị của biểu thức số', [
            'intro' => 'Biểu thức số là gì và làm thế nào để tính giá trị của nó? Cùng tìm hiểu nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=D-Y-u-H2bMM',
            'video_content' => 'Học về thứ tự thực hiện các phép tính trong một biểu thức.',
            'questions' => [
                ["question" => "Tính giá trị của biểu thức: 10 + 5 x 2", "options" => ["30", "20", "25"], "correct" => 1],
                ["question" => "Trong biểu thức có phép cộng, trừ, nhân, chia, ta thực hiện phép tính nào trước?", "options" => ["Cộng, trừ trước", "Nhân, chia trước", "Từ trái sang phải"], "correct" => 1],
                ["question" => "Tính giá trị của biểu thức: 24 : (6 - 2)", "options" => ["4", "2", "6"], "correct" => 2],
                ["question" => "Trong biểu thức có dấu ngoặc, ta thực hiện phép tính nào trước?", "options" => ["Ngoài ngoặc trước", "Trong ngoặc trước", "Nhân chia trước"], "correct" => 1],
                ["question" => "20 - 15 : 3 = ?", "options" => ["5", "15", "10"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách tính giá trị của các biểu thức số theo đúng thứ tự.'
        ]);

        // Lớp 4
        $this->createSectionsForLesson('Ôn tập các số đến 100000', [
            'intro' => 'Chúng ta sẽ cùng nhau ôn lại cách đọc, viết, so sánh các số lớn trong phạm vi 100 000.',
            'video_url' => 'https://www.youtube.com/watch?v=F3aIZkSQP_s',
            'video_content' => 'Video giúp củng cố kiến thức về các số có 5 chữ số.',
            'questions' => [
                ["question" => "Số 'bảy mươi lăm nghìn hai trăm' viết là?", "options" => ["75200", "75020", "70520"], "correct" => 0],
                ["question" => "Trong số 84 931, chữ số 9 thuộc hàng nào?", "options" => ["Hàng chục", "Hàng trăm", "Hàng nghìn"], "correct" => 1],
                ["question" => "Số liền trước của 50 000 là?", "options" => ["40000", "49999", "50001"], "correct" => 1],
                ["question" => "Số lớn nhất có 5 chữ số là?", "options" => ["90000", "99000", "99999"], "correct" => 2],
                ["question" => "Làm tròn số 67 850 đến hàng nghìn ta được?", "options" => ["67000", "68000", "70000"], "correct" => 1],
            ],
            'summary' => 'Em đã ôn tập thành thạo các kiến thức về số trong phạm vi 100 000.'
        ]);
        
        $this->createSectionsForLesson('Bài toán liên quan đến rút về đơn vị', [
            'intro' => '"Rút về đơn vị" là một phương pháp rất hay để giải nhiều bài toán có lời văn.',
            'video_url' => 'https://www.youtube.com/watch?v=vY3yDAW5R1I',
            'video_content' => 'Tìm hiểu hai dạng bài toán rút về đơn vị qua các ví dụ cụ thể.',
            'questions' => [
                ["question" => "Mua 5 quyển vở hết 25 000 đồng. Hỏi mua 1 quyển vở hết bao nhiêu tiền?", "options" => ["4000 đồng", "5000 đồng", "6000 đồng"], "correct" => 1],
                ["question" => "Bước 'rút về đơn vị' trong bài toán trên là gì?", "options" => ["Tìm số tiền mua 5 quyển vở", "Tìm số tiền mua 1 quyển vở", "Tìm hiệu số tiền"], "correct" => 1],
                ["question" => "Có 40kg đường chia đều vào 8 túi. Hỏi 3 túi như vậy có bao nhiêu kg đường?", "options" => ["15kg", "20kg", "24kg"], "correct" => 0],
                ["question" => "Một đội trồng cây, 3 ngày trồng được 120 cây. Hỏi trong 5 ngày đội đó trồng được bao nhiêu cây?", "options" => ["150 cây", "180 cây", "200 cây"], "correct" => 2],
                ["question" => "Để giải bài toán trên, đầu tiên ta cần tính gì?", "options" => ["Số cây trồng trong 5 ngày", "Số cây trồng trong 1 ngày", "Số cây trồng trong 2 ngày"], "correct" => 1],
            ],
            'summary' => 'Em đã nắm vững phương pháp giải toán bằng cách rút về đơn vị.'
        ]);
        
        $this->createSectionsForLesson('Biểu thức có chứa chữ', [
            'intro' => 'Làm quen với các biểu thức có chứa chữ sẽ giúp em giải toán tổng quát hơn.',
            'video_url' => 'https://www.youtube.com/watch?v=Qf65l22gM-4',
            'video_content' => 'Giới thiệu về biểu thức chứa một chữ và cách tính giá trị của nó.',
            'questions' => [
                ["question" => "Cho biểu thức 15 + a. Với a = 5 thì giá trị của biểu thức là?", "options" => ["10", "15", "20"], "correct" => 2],
                ["question" => "Cho biểu thức 24 - b. Với b = 10 thì giá trị của biểu thức là?", "options" => ["14", "24", "34"], "correct" => 0],
                ["question" => "Một hình vuông có cạnh là a. Chu vi hình vuông được tính bằng biểu thức nào?", "options" => ["a + 4", "a x a", "a x 4"], "correct" => 2],
                ["question" => "Tính giá trị của biểu thức c x 5 với c = 8.", "options" => ["13", "40", "45"], "correct" => 1],
                ["question" => "Giá trị của biểu thức 50 : m với m = 2 là?", "options" => ["100", "25", "48"], "correct" => 1],
            ],
            'summary' => 'Em đã hiểu thế nào là biểu thức chứa chữ và biết cách tính giá trị của chúng.'
        ]);
        
        $this->createSectionsForLesson('Tìm số trung bình cộng', [
            'intro' => 'Số trung bình cộng là gì và có ý nghĩa như thế nào? Cùng tìm hiểu nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=yE5hNBz3PAg',
            'video_content' => 'Hướng dẫn cách tìm số trung bình cộng của nhiều số.',
            'questions' => [
                ["question" => "Muốn tìm số trung bình cộng của nhiều số, ta làm thế nào?", "options" => ["Lấy tổng các số đó chia cho số các số hạng", "Lấy số lớn nhất cộng số bé nhất", "Nhân tất cả các số lại với nhau"], "correct" => 0],
                ["question" => "Trung bình cộng của 10 và 20 là?", "options" => ["30", "15", "10"], "correct" => 1],
                ["question" => "Trung bình cộng của các số: 3, 5, 7 là?", "options" => ["15", "5", "6"], "correct" => 1],
                ["question" => "Một ô tô giờ đầu đi được 40km, giờ thứ hai đi được 60km. Trung bình mỗi giờ ô tô đi được bao nhiêu km?", "options" => ["100km", "50km", "40km"], "correct" => 1],
                ["question" => "Chiều cao của 3 bạn là 130cm, 135cm, 140cm. Chiều cao trung bình của ba bạn là?", "options" => ["135cm", "140cm", "130cm"], "correct" => 0],
            ],
            'summary' => 'Em đã biết cách tìm số trung bình cộng và hiểu được ý nghĩa của nó.'
        ]);
        
        $this->createSectionsForLesson('Biểu đồ cột', [
            'intro' => 'Biểu đồ cột là một cách trình bày số liệu rất trực quan và dễ hiểu.',
            'video_url' => 'https://www.youtube.com/watch?v=Fj-LqA15T8A',
            'video_content' => 'Hướng dẫn cách đọc và phân tích số liệu từ biểu đồ cột.',
            'questions' => [
                ["question" => "Trên biểu đồ cột, yếu tố nào thể hiện độ lớn của số liệu?", "options" => ["Màu sắc của cột", "Chiều rộng của cột", "Chiều cao của cột"], "correct" => 2],
                ["question" => "Trục đứng của biểu đồ cột thường thể hiện điều gì?", "options" => ["Danh sách các đối tượng", "Số liệu, số lượng", "Tên biểu đồ"], "correct" => 1],
                ["question" => "Nhìn vào biểu đồ cột, làm sao để so sánh số liệu giữa các đối tượng?", "options" => ["So sánh chiều cao của các cột tương ứng", "Đoán mò", "Nhìn màu sắc"], "correct" => 0],
                ["question" => "Biểu đồ cột có thể dùng để biểu diễn thông tin gì?", "options" => ["Số học sinh các lớp", "Thời tiết trong tuần", "Cả hai đều đúng"], "correct" => 2],
                ["question" => "Cột cao nhất trên biểu đồ thể hiện điều gì?", "options" => ["Đối tượng có số liệu nhỏ nhất", "Đối tượng có số liệu lớn nhất", "Đối tượng không có số liệu"], "correct" => 1],
            ],
            'summary' => 'Em đã có thể tự tin đọc, phân tích và rút ra thông tin từ một biểu đồ cột.'
        ]);
        
        $this->createSectionsForLesson('Các số có sáu chữ số – Hàng và lớp', [
            'intro' => 'Cùng tìm hiểu về cấu tạo của các số lớn hơn, các số có sáu chữ số.',
            'video_url' => 'https://www.youtube.com/watch?v=q6gB4-o91_o',
            'video_content' => 'Tìm hiểu về các hàng và lớp trong số có sáu chữ số.',
            'questions' => [
                ["question" => "Số có sáu chữ số gồm những lớp nào?", "options" => ["Lớp đơn vị và lớp nghìn", "Lớp đơn vị và lớp triệu", "Chỉ có lớp đơn vị"], "correct" => 0],
                ["question" => "Lớp nghìn bao gồm các hàng nào?", "options" => ["Trăm, chục, đơn vị", "Nghìn, chục nghìn, trăm nghìn", "Triệu, chục triệu, trăm triệu"], "correct" => 1],
                ["question" => "Trong số 345 678, chữ số 4 thuộc hàng nào, lớp nào?", "options" => ["Hàng chục nghìn, lớp nghìn", "Hàng nghìn, lớp nghìn", "Hàng chục, lớp đơn vị"], "correct" => 0],
                ["question" => "Số gồm 5 trăm nghìn, 0 chục nghìn, 3 nghìn, 1 trăm, 4 chục và 2 đơn vị viết là?", "options" => ["503142", "53142", "50342"], "correct" => 0],
                ["question" => "Đọc số 810 500", "options" => ["Tám một không năm không không", "Tám trăm mười nghìn năm trăm", "Tám trăm linh một nghìn năm trăm"], "correct" => 1],
            ],
            'summary' => 'Em đã nắm vững cấu tạo của số có sáu chữ số theo hàng và lớp.'
        ]);
        
        $this->createSectionsForLesson('Triệu - Lớp triệu', [
            'intro' => 'Khám phá những con số lớn hơn nữa, lên đến hàng triệu!',
            'video_url' => 'https://www.youtube.com/watch?v=6YhSj2Y8gD0',
            'video_content' => 'Giới thiệu về lớp triệu và cách đọc, viết các số lớn.',
            'questions' => [
                ["question" => "Lớp triệu gồm những hàng nào?", "options" => ["Triệu, chục triệu, trăm triệu", "Nghìn, chục nghìn, trăm nghìn", "Trăm, chục, đơn vị"], "correct" => 0],
                ["question" => "Số 'mười hai triệu' được viết là?", "options" => ["12 000", "12 000 000", "120 000"], "correct" => 1],
                ["question" => "Đọc số 5 200 400", "options" => ["Năm triệu hai trăm nghìn bốn trăm", "Năm triệu hai trăm linh bốn", "Năm hai không không bốn không không"], "correct" => 0],
                ["question" => "Trong số 78 912 345, chữ số 8 thuộc hàng nào?", "options" => ["Hàng triệu", "Hàng chục triệu", "Hàng trăm nghìn"], "correct" => 0],
                ["question" => "10 triệu còn được gọi là?", "options" => ["1 tỷ", "1 vạn", "1 chục triệu"], "correct" => 2],
            ],
            'summary' => 'Những con số hàng triệu không còn xa lạ với em nữa.'
        ]);
        
        $this->createSectionsForLesson('Hai đường thẳng vuông góc, song song', [
            'intro' => 'Trong hình học, có hai mối quan hệ đặc biệt giữa các đường thẳng.',
            'video_url' => 'https://www.youtube.com/watch?v=kYv9AYFNDnQ',
            'video_content' => 'Học cách nhận biết và vẽ hai đường thẳng vuông góc và song song.',
            'questions' => [
                ["question" => "Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?", "options" => ["1", "2", "4"], "correct" => 2],
                ["question" => "Hai đường thẳng song song là hai đường thẳng ...?", "options" => ["Cắt nhau tại một điểm", "Không bao giờ cắt nhau", "Trùng nhau"], "correct" => 1],
                ["question" => "Các cạnh đối của hình chữ nhật thì ...?", "options" => ["Vuông góc với nhau", "Song song với nhau", "Cắt nhau"], "correct" => 1],
                ["question" => "Để vẽ hai đường thẳng vuông góc, ta có thể dùng dụng cụ nào?", "options" => ["Com-pa", "Ê ke", "Thước đo độ"], "correct" => 1],
                ["question" => "Hình ảnh nào sau đây gợi đến hai đường thẳng song song?", "options" => ["Hai cạnh của một góc", "Hai mép của quyển sách", "Chữ cái X"], "correct" => 1],
            ],
            'summary' => 'Em đã phân biệt được hai đường thẳng vuông góc và song song.'
        ]);
        
        $this->createSectionsForLesson('Yến, tạ, tấn', [
            'intro' => 'Để cân những vật rất nặng như con voi hay xe tải, ta cần những đơn vị lớn hơn ki-lô-gam.',
            'video_url' => 'https://www.youtube.com/watch?v=4Jq-G-zYvRw',
            'video_content' => 'Tìm hiểu về các đơn vị đo khối lượng yến, tạ, tấn.',
            'questions' => [
                ["question" => "1 yến bằng bao nhiêu kg?", "options" => ["10 kg", "100 kg", "1000 kg"], "correct" => 0],
                ["question" => "1 tạ bằng bao nhiêu kg?", "options" => ["10 kg", "100 kg", "1000 kg"], "correct" => 1],
                ["question" => "1 tấn bằng bao nhiêu kg?", "options" => ["10 kg", "100 kg", "1000 kg"], "correct" => 2],
                ["question" => "Một con voi có thể nặng khoảng?", "options" => ["5 tạ", "5 tấn", "5 yến"], "correct" => 1],
                ["question" => "500 kg bằng bao nhiêu tạ?", "options" => ["50 tạ", "5 tạ", "0.5 tạ"], "correct" => 1],
            ],
            'summary' => 'Em đã biết về các đơn vị yến, tạ, tấn và cách quy đổi giữa chúng.'
        ]);

        // Lớp 5
        $this->createSectionsForLesson('Khái niệm số thập phân', [
            'intro' => 'Số thập phân là một cách viết mới cho các phân số thập phân, giúp việc tính toán thuận tiện hơn.',
            'video_url' => 'https://www.youtube.com/watch?v=APOML9y1F1g',
            'video_content' => 'Tìm hiểu về cấu tạo của số thập phân, bao gồm phần nguyên và phần thập phân.',
            'questions' => [
                ["question" => "Số thập phân gồm mấy phần?", "options" => ["Một phần là phần nguyên", "Hai phần: phần nguyên và phần thập phân", "Ba phần: phần trăm, phần mười, phần nghìn"], "correct" => 1],
                ["question" => "Trong số 34,56, phần thập phân là số nào?", "options" => ["34", "56", "4,5"], "correct" => 1],
                ["question" => "Số 'không phẩy năm' được viết là?", "options" => ["0,5", "0.5", "Cả hai đều đúng"], "correct" => 2],
                ["question" => "Phân số 7/10 được viết dưới dạng số thập phân là?", "options" => ["7,0", "0,7", "0,07"], "correct" => 1],
                ["question" => "Trong số 12,345, chữ số 4 thuộc hàng nào?", "options" => ["Hàng chục", "Hàng phần mười", "Hàng phần trăm"], "correct" => 2],
            ],
            'summary' => 'Em đã hiểu rõ về cấu tạo, cách đọc, viết số thập phân.'
        ]);
        
        $this->createSectionsForLesson('Cộng, trừ hai số thập phân', [
            'intro' => 'Cộng và trừ hai số thập phân cũng tương tự như với số tự nhiên, chỉ cần chú ý đến dấu phẩy.',
            'video_url' => 'https://www.youtube.com/watch?v=JgIg-41W-yY',
            'video_content' => 'Hướng dẫn cách đặt tính và thực hiện phép cộng, trừ số thập phân.',
            'questions' => [
                ["question" => "Khi cộng hoặc trừ các số thập phân, ta phải đặt tính sao cho ...?", "options" => ["Các chữ số cuối cùng thẳng cột", "Các dấu phẩy thẳng cột với nhau", "Các chữ số đầu tiên thẳng cột"], "correct" => 1],
                ["question" => "15,9 + 8,75 = ?", "options" => ["23,65", "24,65", "24,55"], "correct" => 1],
                ["question" => "45,8 - 19,26 = ?", "options" => ["26,54", "26,64", "25,54"], "correct" => 0],
                ["question" => "Tìm x, biết x - 3,5 = 7,2", "options" => ["3,7", "10,7", "4,3"], "correct" => 1],
                ["question" => "Một sợi dây dài 5,25m. Người ta cắt đi 1,7m. Sợi dây còn lại dài bao nhiêu mét?", "options" => ["3,55m", "4,55m", "6,95m"], "correct" => 0],
            ],
            'summary' => 'Em đã thành thạo kỹ năng cộng và trừ các số thập phân.'
        ]);
        
        $this->createSectionsForLesson('Nhân một số thập phân với một số thập phân', [
            'intro' => 'Cùng khám phá quy tắc nhân hai số thập phân với nhau nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=83-p_B-ZkBo',
            'video_content' => 'Học cách thực hiện phép nhân hai số thập phân qua các ví dụ.',
            'questions' => [
                ["question" => "2,5 x 3 = ?", "options" => ["7,5", "6,5", "75"], "correct" => 0],
                ["question" => "4,18 x 5 = ?", "options" => ["20,9", "2,09", "209"], "correct" => 0],
                ["question" => "1,2 x 1,5 = ?", "options" => ["18,0", "1,8", "0,18"], "correct" => 1],
                ["question" => "Để nhân hai số thập phân, sau khi nhân như số tự nhiên, ta cần làm gì?", "options" => ["Đếm xem có bao nhiêu chữ số ở phần thập phân của cả hai thừa số rồi đặt dấu phẩy", "Đặt dấu phẩy thẳng cột", "Bỏ dấu phẩy đi"], "correct" => 0],
                ["question" => "Một mảnh vườn hình chữ nhật có chiều dài 15,5m và chiều rộng 8,2m. Diện tích mảnh vườn là?", "options" => ["127,1 m2", "12,71 m2", "1271 m2"], "correct" => 0],
            ],
            'summary' => 'Em đã nắm vững quy tắc nhân hai số thập phân.'
        ]);
        
        $this->createSectionsForLesson('Chia một số thập phân cho một số thập phân', [
            'intro' => 'Phép chia số thập phân có một chút phức tạp hơn, nhưng rất thú vị.',
            'video_url' => 'https://www.youtube.com/watch?v=VdCx2GqGATE',
            'video_content' => 'Hướng dẫn chi tiết cách chia một số thập phân cho một số thập phân.',
            'questions' => [
                ["question" => "Để chia một số thập phân cho một số thập phân, bước đầu tiên ta cần làm gì?", "options" => ["Bỏ dấu phẩy ở số bị chia", "Đếm số chữ số ở phần thập phân của số chia rồi chuyển dấu phẩy của số bị chia sang bên phải bấy nhiêu chữ số", "Thực hiện phép chia ngay"], "correct" => 1],
                ["question" => "8,76 : 1,2 = ?", "options" => ["73", "7,3", "0,73"], "correct" => 1],
                ["question" => "12,88 : 0,25 = ?", "options" => ["5,152", "51,52", "515,2"], "correct" => 1],
                ["question" => "Tìm x, biết x × 2,5 = 7,5", "options" => ["3", "4", "5"], "correct" => 0],
                ["question" => "Thanh sắt dài 7,2m được chia thành các đoạn bằng nhau, mỗi đoạn dài 0,9m. Chia được tất cả bao nhiêu đoạn?", "options" => ["7", "8", "9"], "correct" => 1],
            ],
            'summary' => 'Em đã biết cách thực hiện phép chia hai số thập phân.'
        ]);
        
        $this->createSectionsForLesson('Tỉ số phần trăm', [
            'intro' => 'Tỉ số phần trăm là một dạng toán rất phổ biến trong cuộc sống. Cùng tìm hiểu nhé!',
            'video_url' => 'https://www.youtube.com/watch?v=17X2zGkYk0U',
            'video_content' => 'Giới thiệu về tỉ số phần trăm và các dạng bài toán liên quan.',
            'questions' => [
                ["question" => "Tỉ số phần trăm của 25 và 100 là?", "options" => ["25%", "0,25%", "250%"], "correct" => 0],
                ["question" => "Để tìm 10% của 120, ta làm thế nào?", "options" => ["120 : 10", "120 x 10", "120 x 100 : 10"], "correct" => 0],
                ["question" => "Một lớp học có 40 học sinh, trong đó có 10 học sinh nữ. Tỉ số phần trăm của số học sinh nữ so với cả lớp là?", "options" => ["10%", "40%", "25%"], "correct" => 2],
                ["question" => "Một chiếc áo giá 200 000 đồng, giảm giá 20%. Số tiền được giảm là?", "options" => ["20 000 đồng", "40 000 đồng", "50 000 đồng"], "correct" => 1],
                ["question" => "Gửi tiết kiệm 1 000 000 đồng với lãi suất 5%/năm. Sau một năm, số tiền lãi là?", "options" => ["5000 đồng", "50 000 đồng", "100 000 đồng"], "correct" => 1],
            ],
            'summary' => 'Em đã làm quen với tỉ số phần trăm và biết cách giải các bài toán cơ bản.'
        ]);
        
        $this->createSectionsForLesson('Diện tích hình tam giác', [
            'intro' => 'Làm thế nào để tính được diện tích của một hình tam giác?',
            'video_url' => 'https://www.youtube.com/watch?v=A2dTxV2X7dc',
            'video_content' => 'Học công thức tính diện tích hình tam giác và áp dụng vào bài tập.',
            'questions' => [
                ["question" => "Muốn tính diện tích hình tam giác ta làm thế nào?", "options" => ["Lấy độ dài đáy nhân với chiều cao", "Lấy độ dài đáy nhân với chiều cao rồi chia cho 2", "Lấy độ dài đáy cộng chiều cao rồi nhân 2"], "correct" => 1],
                ["question" => "Diện tích hình tam giác có độ dài đáy 10cm và chiều cao 5cm là?", "options" => ["50 cm2", "25 cm2", "15 cm2"], "correct" => 1],
                ["question" => "Một hình tam giác có diện tích 30m2, độ dài đáy là 10m. Chiều cao của hình tam giác đó là?", "options" => ["3m", "6m", "5m"], "correct" => 1],
                ["question" => "Diện tích hình tam giác vuông có hai cạnh góc vuông là 6cm và 8cm là?", "options" => ["48 cm2", "14 cm2", "24 cm2"], "correct" => 2],
                ["question" => "Công thức tính diện tích hình tam giác là?", "options" => ["S = a x h / 2", "S = a x h", "S = (a + h) x 2"], "correct" => 0],
            ],
            'summary' => 'Em đã nắm vững công thức và cách tính diện tích hình tam giác.'
        ]);
        
        $this->createSectionsForLesson('Diện tích hình thang', [
            'intro' => 'Hình thang là một hình tứ giác đặc biệt. Cùng học cách tính diện tích của nó nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=S012A34A_3A',
            'video_content' => 'Xây dựng công thức tính diện tích hình thang và các ví dụ minh họa.',
            'questions' => [
                ["question" => "Muốn tính diện tích hình thang ta làm thế nào?", "options" => ["Lấy tổng độ dài hai đáy nhân với chiều cao", "Lấy tổng độ dài hai đáy nhân với chiều cao rồi chia cho 2", "Lấy hiệu độ dài hai đáy nhân với chiều cao"], "correct" => 1],
                ["question" => "Tính diện tích hình thang biết độ dài hai đáy là 10cm và 8cm, chiều cao là 5cm.", "options" => ["90 cm2", "45 cm2", "50 cm2"], "correct" => 1],
                ["question" => "Một thửa ruộng hình thang có đáy lớn 30m, đáy bé 20m, chiều cao 10m. Diện tích thửa ruộng là?", "options" => ["500 m2", "250 m2", "300 m2"], "correct" => 1],
                ["question" => "Công thức tính diện tích hình thang là?", "options" => ["S = (a + b) x h / 2", "S = (a x b) + h", "S = a + b + h"], "correct" => 0],
                ["question" => "Trung bình cộng hai đáy của một hình thang là 15m, chiều cao là 8m. Diện tích hình thang đó là?", "options" => ["120 m2", "60 m2", "240 m2"], "correct" => 0],
            ],
            'summary' => 'Em đã biết cách tính diện tích của một hình thang.'
        ]);
        
        $this->createSectionsForLesson('Chu vi và diện tích hình tròn', [
            'intro' => 'Hình tròn là một hình rất đặc biệt. Chu vi và diện tích của nó được tính như thế nào?',
            'video_url' => 'https://www.youtube.com/watch?v=I_zZ-fxs-iE',
            'video_content' => 'Học về số Pi và các công thức tính chu vi, diện tích hình tròn.',
            'questions' => [
                ["question" => "Muốn tính chu vi hình tròn ta làm thế nào?", "options" => ["Lấy bán kính nhân bán kính", "Lấy đường kính nhân với số 3,14", "Lấy bán kính nhân 3,14"], "correct" => 1],
                ["question" => "Muốn tính diện tích hình tròn ta làm thế nào?", "options" => ["Lấy bán kính nhân với số 3,14", "Lấy đường kính nhân với số 3,14", "Lấy bán kính nhân với bán kính rồi nhân với số 3,14"], "correct" => 2],
                ["question" => "Chu vi của hình tròn có đường kính 10cm là?", "options" => ["31,4 cm", "314 cm", "15,7 cm"], "correct" => 0],
                ["question" => "Diện tích của hình tròn có bán kính 2cm là?", "options" => ["6,28 cm2", "12,56 cm2", "25,12 cm2"], "correct" => 1],
                ["question" => "Số Pi (π) có giá trị gần đúng là bao nhiêu?", "options" => ["3,41", "3,14", "1,34"], "correct" => 1],
            ],
            'summary' => 'Em đã nắm vững các công thức và biết cách tính chu vi, diện tích hình tròn.'
        ]);
        
        $this->createSectionsForLesson('Diện tích xung quanh và toàn phần của hình hộp chữ nhật', [
            'intro' => 'Hình hộp chữ nhật có mấy mặt? Diện tích xung quanh và toàn phần được tính ra sao?',
            'video_url' => 'https://www.youtube.com/watch?v=F_Y5h-S_ljY',
            'video_content' => 'Hướng dẫn cách tính diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật.',
            'questions' => [
                ["question" => "Diện tích xung quanh của hình hộp chữ nhật được tính bằng cách nào?", "options" => ["Lấy chu vi mặt đáy nhân với chiều cao", "Lấy diện tích mặt đáy nhân với chiều cao", "Tổng diện tích 4 mặt bên"], "correct" => 0],
                ["question" => "Diện tích toàn phần của hình hộp chữ nhật là?", "options" => ["Tổng diện tích xung quanh và diện tích một mặt đáy", "Tổng diện tích 6 mặt", "Tổng diện tích xung quanh và diện tích hai mặt đáy"], "correct" => 2],
                ["question" => "Tính diện tích xung quanh của hình hộp chữ nhật có chiều dài 5cm, rộng 3cm, cao 4cm.", "options" => ["64 cm2", "60 cm2", "80 cm2"], "correct" => 0],
                ["question" => "Tính diện tích toàn phần của hình hộp chữ nhật ở câu trên.", "options" => ["94 cm2", "79 cm2", "75 cm2"], "correct" => 0],
                ["question" => "Căn phòng dạng hình hộp chữ nhật, người ta sơn 4 bức tường. Đó là người ta đang sơn phần diện tích nào?", "options" => ["Diện tích toàn phần", "Diện tích xung quanh", "Diện tích đáy"], "correct" => 1],
            ],
            'summary' => 'Em đã phân biệt và tính được diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật.'
        ]);
        
        $this->createSectionsForLesson('Thể tích hình hộp chữ nhật và hình lập phương', [
            'intro' => 'Thể tích cho biết không gian mà một vật chiếm chỗ. Cùng học cách tính thể tích nhé.',
            'video_url' => 'https://www.youtube.com/watch?v=tIujc4a2yTA',
            'video_content' => 'Xây dựng công thức tính thể tích hình hộp chữ nhật và hình lập phương.',
            'questions' => [
                ["question" => "Muốn tính thể tích hình hộp chữ nhật, ta làm thế nào?", "options" => ["Lấy chiều dài + chiều rộng + chiều cao", "Lấy chiều dài x chiều rộng x chiều cao", "Lấy diện tích đáy + chiều cao"], "correct" => 1],
                ["question" => "Thể tích hình lập phương có cạnh 3cm là?", "options" => ["9 cm3", "12 cm3", "27 cm3"], "correct" => 2],
                ["question" => "Thể tích của hình hộp chữ nhật có dài 5m, rộng 4m, cao 2m là?", "options" => ["11 m3", "20 m3", "40 m3"], "correct" => 2],
                ["question" => "Đơn vị đo thể tích thường dùng là?", "options" => ["m, cm", "m2, cm2", "m3, cm3"], "correct" => 2],
                ["question" => "Một bể nước hình lập phương cạnh 1m chứa đầy nước. Bể đó chứa bao nhiêu mét khối nước?", "options" => ["1 m3", "3 m3", "10 m3"], "correct" => 0],
            ],
            'summary' => 'Em đã biết cách tính thể tích của hình hộp chữ nhật và hình lập phương.'
        ]);
        
        $this->createSectionsForLesson('Cộng, trừ số đo thời gian', [
            'intro' => 'Làm thế nào để cộng, trừ các đơn vị thời gian như giờ, phút, giây?',
            'video_url' => 'https://www.youtube.com/watch?v=F0_kS_jXl1c',
            'video_content' => 'Hướng dẫn cách đặt tính và thực hiện phép cộng, trừ số đo thời gian.',
            'questions' => [
                ["question" => "1 giờ 15 phút + 2 giờ 30 phút = ?", "options" => ["3 giờ 45 phút", "3 giờ 35 phút", "4 giờ 15 phút"], "correct" => 0],
                ["question" => "4 giờ 20 phút - 1 giờ 40 phút = ?", "options" => ["3 giờ 40 phút", "2 giờ 40 phút", "2 giờ 20 phút"], "correct" => 1],
                ["question" => "Khi cộng số phút lớn hơn hoặc bằng 60, ta cần làm gì?", "options" => ["Giữ nguyên", "Đổi sang giờ", "Trừ đi 60"], "correct" => 1],
                ["question" => "Một người đi từ A lúc 7 giờ sáng và đến B lúc 9 giờ 30 phút. Người đó đã đi hết bao nhiêu thời gian?", "options" => ["2 giờ", "2 giờ 30 phút", "3 giờ"], "correct" => 1],
                ["question" => "5 phút 10 giây - 2 phút 20 giây = ?", "options" => ["2 phút 50 giây", "3 phút 10 giây", "3 phút 50 giây"], "correct" => 0],
            ],
            'summary' => 'Em đã thành thạo các phép tính cộng, trừ với số đo thời gian.'
        ]);
        
        $this->createSectionsForLesson('Vận tốc, quãng đường, thời gian', [
            'intro' => 'Vận tốc, quãng đường và thời gian là ba đại lượng quan trọng trong các bài toán chuyển động.',
            'video_url' => 'https://www.youtube.com/watch?v=gTz-g0Q5-5g',
            'video_content' => 'Tìm hiểu mối quan hệ và các công thức tính ba đại lượng v, s, t.',
            'questions' => [
                ["question" => "Muốn tính vận tốc ta làm thế nào?", "options" => ["Lấy quãng đường x thời gian", "Lấy quãng đường : thời gian", "Lấy thời gian : quãng đường"], "correct" => 1],
                ["question" => "Muốn tính quãng đường ta làm thế nào?", "options" => ["Lấy vận tốc x thời gian", "Lấy vận tốc : thời gian", "Lấy thời gian : vận tốc"], "correct" => 0],
                ["question" => "Một người đi xe máy với vận tốc 40 km/giờ trong 2 giờ. Quãng đường người đó đi được là?", "options" => ["20 km", "42 km", "80 km"], "correct" => 2],
                ["question" => "Một ô tô đi quãng đường 150 km hết 3 giờ. Vận tốc của ô tô là?", "options" => ["40 km/giờ", "50 km/giờ", "60 km/giờ"], "correct" => 1],
                ["question" => "Công thức tính thời gian là?", "options" => ["t = s x v", "t = v : s", "t = s : v"], "correct" => 2],
            ],
            'summary' => 'Em đã nắm vững các công thức và biết cách giải bài toán về chuyển động đều.'
        ]);
        
    }

    /**
     * Helper function to create sections for a lesson.
     */
    private function createSectionsForLesson(string $lessonTitle, array $data)
    {
        $lesson = Lesson::where('title', $lessonTitle)->first();

        if (!$lesson || $lesson->sections()->exists()) {
            return;
        }

        // Section 1: Introduction
        Section::create([
            'lesson_id' => $lesson->id,
            'title' => 'Giới thiệu',
            'type' => 'intro',
            'content' => $data['intro']
        ]);

        // Section 2: Video
        Section::create([
            'lesson_id' => $lesson->id,
            'title' => 'Video bài giảng',
            'type' => 'video',
            'video_url' => $data['video_url'],
            'content' => $data['video_content']
        ]);

        // Section 3: Practice
        Section::create([
            'lesson_id' => $lesson->id,
            'title' => 'Thực hành',
            'type' => 'practice',
            'questions' => json_encode($data['questions'])
        ]);

        // Section 4: Summary
        Section::create([
            'lesson_id' => $lesson->id,
            'title' => 'Tổng kết',
            'type' => 'summary',
            'content' => $data['summary']
        ]);
    }
}




