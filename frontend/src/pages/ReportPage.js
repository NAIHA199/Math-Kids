import React, { useState, useEffect } from 'react';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';
// --- Icons (SVG Components) ---
const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

// --- Component chính ---
const ReportPage = () => {
  // State để lưu trữ dữ liệu và trạng thái tải
  const [summaryData, setSummaryData] = useState(null);
  const [classProgressData, setClassProgressData] = useState([]);
  const [studentLeaderboard, setStudentLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sử dụng useEffect để mô phỏng việc tải dữ liệu từ API
  useEffect(() => {
    const fetchData = () => {
      // Dữ liệu mẫu sẽ được trả về sau 1.5 giây
      const mockApiData = {
        summary: { averageScore: 88, completionRate: 76, activeStudents: 67 },
        classProgress: [
          { name: 'Lớp 3A', progress: 85, color: 'bg-blue-500' },
          { name: 'Lớp 4B', progress: 72, color: 'bg-green-500' },
          { name: 'Lớp 5C', progress: 65, color: 'bg-yellow-500' },
          { name: 'Lớp 3B', progress: 91, color: 'bg-indigo-500' },
        ],
        leaderboard: [
          { rank: 1, name: 'Trần Thị Bình', score: 9850, class: 'Lớp 3A' },
          { rank: 2, name: 'Nguyễn Văn An', score: 9720, class: 'Lớp 3A' },
          { rank: 3, name: 'Lê Văn Cường', score: 9540, class: 'Lớp 4B' },
        ],
      };

      setTimeout(() => {
        setSummaryData(mockApiData.summary);
        setClassProgressData(mockApiData.classProgress);
        setStudentLeaderboard(mockApiData.leaderboard);
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  // Component thẻ thống kê
  const SummaryCard = ({ icon, title, value, unit, loading }) => (
    <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
      <div className="bg-purple-600/30 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse mt-1"></div>
        ) : (
          <p className="text-2xl font-bold text-white">{value}<span className="text-lg ml-1">{unit}</span></p>
        )}
      </div>
    </div>
  );
  
  // Component hiển thị khi không có dữ liệu
  const EmptyState = ({ message }) => (
      <div className="text-center py-10 px-6 bg-gray-800 rounded-xl">
          <p className="text-gray-400">{message}</p>
      </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Navbar */}
      <AuthenticatedNavbar user={{ role: 'teacher' }} />
      
      {/* Nội dung chính */}
      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Tiêu đề */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Báo cáo học tập
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tổng quan tiến trình học tập của học sinh và lớp học
            </p>
          </div>

          {/* Thẻ thống kê */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SummaryCard loading={isLoading} icon={<ChartBarIcon />} title="Điểm trung bình" value={summaryData?.averageScore} unit="điểm" />
            <SummaryCard loading={isLoading} icon={<CheckCircleIcon />} title="Tỷ lệ hoàn thành" value={summaryData?.completionRate} unit="%" />
            <SummaryCard loading={isLoading} icon={<UserGroupIcon />} title="Học sinh tích cực" value={summaryData?.activeStudents} unit="em" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Biểu đồ tiến độ các lớp */}
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Tiến độ các lớp</h2>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-700 rounded-md animate-pulse"></div>)}
                </div>
              ) : classProgressData.length > 0 ? (
                <div className="space-y-4">
                  {classProgressData.map(cls => (
                    <div key={cls.name}>
                      <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium text-gray-300">{cls.name}</span><span className="text-sm font-bold text-white">{cls.progress}%</span></div>
                      <div className="w-full bg-gray-700 rounded-full h-4"><div className={`${cls.color} h-4 rounded-full`} style={{ width: `${cls.progress}%` }}></div></div>
                    </div>
                  ))}
                </div>
              ) : <EmptyState message="Chưa có dữ liệu về tiến độ các lớp." />}
            </div>

            {/* Bảng xếp hạng học sinh */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Học sinh xuất sắc</h2>
              {isLoading ? (
                 <div className="space-y-3">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>)}
                </div>
              ) : studentLeaderboard.length > 0 ? (
                <ul className="space-y-3">
                  {studentLeaderboard.map(student => (
                    <li key={student.rank} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-lg font-bold w-8 text-center">{student.rank === 1 ? <TrophyIcon /> : student.rank}</span>
                        <div><p className="font-semibold text-white">{student.name}</p><p className="text-xs text-gray-400">{student.class}</p></div>
                      </div>
                      <span className="font-bold text-purple-300">{student.score}</span>
                    </li>
                  ))}
                </ul>
              ) : <EmptyState message="Chưa có dữ liệu xếp hạng." />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;