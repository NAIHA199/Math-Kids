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
            // Lớp 1
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
            [
                'title' => 'Các số đến 20',
                'description' => 'Đọc, viết, đếm và so sánh các số trong phạm vi 20.',
                'grade_id' => 1,
                'subject' => 'Toán'
            ],
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

            // Lớp 2
            [
                'title' => 'Số hạng – Tổng',
                'description' => 'Nhận biết tên gọi các thành phần và kết quả của phép cộng.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Số bị trừ – Số trừ – Hiệu',
                'description' => 'Nhận biết tên gọi các thành phần và kết quả của phép trừ.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Điểm – Đoạn thẳng',
                'description' => 'Nhận biết điểm, đoạn thẳng và biết dùng thước để đo, vẽ đoạn thẳng.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Đề-xi-mét',
                'description' => 'Làm quen với đơn vị đo độ dài đề-xi-mét (dm) và mối quan hệ giữa dm và cm.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => '9 cộng với một số',
                'description' => 'Thực hiện được phép cộng dạng 9 + a và vận dụng vào giải toán.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Đường gấp khúc',
                'description' => 'Nhận dạng đường gấp khúc và biết cách tính độ dài đường gấp khúc.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => '11 trừ đi một số',
                'description' => 'Thực hiện được phép trừ dạng 11 - a và vận dụng vào giải toán.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Lít',
                'description' => 'Làm quen với đơn vị đo dung tích lít (l) và giải các bài toán liên quan.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Phép cộng có nhớ trong phạm vi 100',
                'description' => 'Thực hiện các phép cộng có nhớ của số có hai chữ số.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Phép trừ có nhớ trong phạm vi 100',
                'description' => 'Thực hiện các phép trừ có nhớ của số có hai chữ số.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Biểu đồ tranh',
                'description' => 'Làm quen với biểu đồ tranh và biết cách đọc thông tin từ biểu đồ.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Ngày, giờ',
                'description' => 'Nhận biết các đơn vị thời gian ngày, giờ và cách xem đồng hồ.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Ngày, tháng',
                'description' => 'Nhận biết các ngày trong tháng và cách xem lịch.',
                'grade_id' => 2,
                'subject' => 'Toán'
            ],
            
            // Lớp 3
            [
                'title' => 'Ôn tập các số đến 1 000',
                'description' => 'Củng cố cách đọc, viết, so sánh các số có ba chữ số.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',
                'description' => 'Ôn tập và thực hành các phép cộng, trừ (không nhớ và có nhớ) trong phạm vi 1000.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Bảng nhân 6, bảng chia 6',
                'description' => 'Học thuộc và vận dụng bảng nhân 6, bảng chia 6.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Bảng nhân 7, bảng chia 7',
                'description' => 'Học thuộc và vận dụng bảng nhân 7, bảng chia 7.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Một phần mấy',
                'description' => 'Làm quen với khái niệm "một phần mấy" (1/2, 1/3, ..., 1/9).',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Góc, góc vuông, góc không vuông',
                'description' => 'Nhận biết góc, góc vuông, góc không vuông và sử dụng ê ke để kiểm tra góc vuông.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
             [
                'title' => 'Hình chữ nhật, hình vuông',
                'description' => 'Nhận biết đặc điểm của hình chữ nhật, hình vuông và tính chu vi của các hình đó.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
             [
                'title' => 'Nhân số có hai chữ số với số có một chữ số',
                'description' => 'Thực hiện phép nhân số có hai chữ số với số có một chữ số (có nhớ và không nhớ).',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Phép chia hết, phép chia có dư',
                'description' => 'Phân biệt phép chia hết và phép chia có dư, tìm số dư trong phép chia.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Bài toán giải bằng hai bước tính',
                'description' => 'Làm quen và giải các bài toán có lời văn bằng hai bước tính.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Mi-li-mét',
                'description' => 'Làm quen với đơn vị đo độ dài mi-li-mét (mm).',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Gam',
                'description' => 'Làm quen với đơn vị đo khối lượng gam (g).',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Nhân số có ba chữ số với số có một chữ số',
                'description' => 'Thực hiện phép nhân số có ba chữ số với số có một chữ số (có nhớ và không nhớ).',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Chia số có ba chữ số cho số có một chữ số',
                'description' => 'Thực hiện phép chia số có ba chữ số cho số có một chữ số.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Biểu thức số. Tính giá trị của biểu thức số',
                'description' => 'Làm quen với biểu thức số và quy tắc tính giá trị của biểu thức.',
                'grade_id' => 3,
                'subject' => 'Toán'
            ],
            
            // Lớp 4
            [
                'title' => 'Ôn tập các số đến 100000',
                'description' => 'Ôn tập cách đọc, viết, so sánh và làm tròn các số trong phạm vi 100 000.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Bài toán liên quan đến rút về đơn vị',
                'description' => 'Giải các bài toán có lời văn bằng phương pháp rút về đơn vị.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Biểu thức có chứa chữ',
                'description' => 'Làm quen với biểu thức chứa một, hai, ba chữ và cách tính giá trị của chúng.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Tìm số trung bình cộng',
                'description' => 'Hiểu khái niệm và biết cách tìm số trung bình cộng của nhiều số.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Biểu đồ cột',
                'description' => 'Học cách đọc, phân tích và xử lý số liệu trên biểu đồ cột.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Các số có sáu chữ số – Hàng và lớp',
                'description' => 'Nhận biết hàng và lớp của các số có sáu chữ số: lớp đơn vị, lớp nghìn.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Triệu - Lớp triệu',
                'description' => 'Đọc, viết, so sánh các số đến lớp triệu.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Hai đường thẳng vuông góc, song song',
                'description' => 'Nhận dạng và vẽ hai đường thẳng vuông góc, song song.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Yến, tạ, tấn',
                'description' => 'Làm quen với các đơn vị đo khối lượng lớn: yến, tạ, tấn và mối quan hệ giữa chúng.',
                'grade_id' => 4,
                'subject' => 'Toán'
            ],

            // Lớp 5
            [
                'title' => 'Khái niệm số thập phân',
                'description' => 'Hiểu về khái niệm số thập phân, cấu tạo, cách đọc, viết.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Cộng, trừ hai số thập phân',
                'description' => 'Thực hiện thành thạo các phép cộng, trừ số thập phân.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Nhân một số thập phân với một số thập phân',
                'description' => 'Nắm vững quy tắc và thực hiện phép nhân hai số thập phân.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Chia một số thập phân cho một số thập phân',
                'description' => 'Nắm vững quy tắc và thực hiện phép chia hai số thập phân.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Tỉ số phần trăm',
                'description' => 'Làm quen với khái niệm tỉ số phần trăm và các bài toán liên quan.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Diện tích hình tam giác',
                'description' => 'Biết cách tính diện tích hình tam giác và vận dụng giải toán.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Diện tích hình thang',
                'description' => 'Biết cách tính diện tích hình thang và vận dụng giải toán.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Chu vi và diện tích hình tròn',
                'description' => 'Nắm được công thức và biết cách tính chu vi, diện tích hình tròn.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Diện tích xung quanh và toàn phần của hình hộp chữ nhật',
                'description' => 'Nắm được công thức và biết cách tính diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Thể tích hình hộp chữ nhật và hình lập phương',
                'description' => 'Nắm được công thức và biết cách tính thể tích của hình hộp chữ nhật và hình lập phương.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Cộng, trừ số đo thời gian',
                'description' => 'Thực hiện các phép tính cộng, trừ với các đơn vị đo thời gian.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
            [
                'title' => 'Vận tốc, quãng đường, thời gian',
                'description' => 'Hiểu mối quan hệ giữa ba đại lượng vận tốc, quãng đường, thời gian và giải các bài toán chuyển động đều.',
                'grade_id' => 5,
                'subject' => 'Toán'
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::firstOrCreate(['title' => $lesson['title']], $lesson);
        }
    }
}

