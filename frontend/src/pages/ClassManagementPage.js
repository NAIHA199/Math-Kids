import React, { useState } from 'react';

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 112 0v11a2 2 0 104 0V5a1 1 0 10-2 0v1a1 1 0 11-2 0V4a4 4 0 00-4-4H6a4 4 0 00-4 4v12a2 2 0 002 2h8a2 2 0 002-2V9a1 1 0 112 0v9a4 4 0 01-4 4H6a4 4 0 01-4-4V4z" clipRule="evenodd" />
  </svg>
);

const ClassManagementPage = () => {
  const mockClasses = [
    { id: 'C01', name: 'Lớp 3A', studentCount: 25, currentLesson: 'Phép nhân 2 chữ số', progress: 65, color: 'from-blue-500 to-indigo-600' },
    { id: 'C02', name: 'Lớp 4B', studentCount: 20, currentLesson: 'Phân số cơ bản', progress: 80, color: 'from-green-500 to-teal-600' },
    { id: 'C03', name: 'Lớp 5C', studentCount: 22, currentLesson: 'Số thập phân', progress: 45, color: 'from-yellow-500 to-orange-600' },
    { id: 'C04', name: 'Lớp 3B', studentCount: 28, currentLesson: 'Phép chia có dư', progress: 30, color: 'from-red-500 to-pink-600' },
  ];
  const [classes, setClasses] = useState(mockClasses);

  const handleDelete = (classId) => {
    setClasses(classes.filter(c => c.id !== classId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-4 sm:mb-0">Quản lý lớp học</h1>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto">
            + Tạo lớp học mới
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl`}>
              <div className={`p-5 bg-gradient-to-br ${cls.color}`}>
                <h2 className="text-2xl font-bold text-white">{cls.name}</h2>
              </div>
              <div className="p-5 space-y-4 flex-grow">
                <div className="flex items-center text-gray-300">
                  <UsersIcon />
                  <span>{cls.studentCount} học sinh</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <BookOpenIcon />
                  <span>Bài học: {cls.currentLesson}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-400">Tiến độ khóa học</span>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium">{cls.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-700/50 flex justify-end space-x-3">
                <button className="text-blue-400 hover:text-blue-300 transition duration-300 font-semibold text-sm">Xem chi tiết</button>
                <button onClick={() => handleDelete(cls.id)} className="text-red-500 hover:text-red-400 transition duration-300 font-semibold text-sm">Xóa lớp</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassManagementPage;
