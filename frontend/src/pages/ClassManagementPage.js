import React, { useState } from 'react';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 112 0v1a1 1 0 11-2 0V4a4 4 0 00-4-4H6a4 4 0 00-4 4v12a2 2 0 002 2h8a2 2 0 002-2V9a1 1 0 112 0v9a4 4 0 01-4 4H6a4 4 0 01-4-4V4z" clipRule="evenodd" />
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
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <SpaceBackground />
      
      <AuthenticatedNavbar user={{ role: 'teacher' }} />
      
      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Quản lý lớp học</h1>
            <p className="text-gray-400">Quản lý các lớp học và theo dõi tiến trình của học sinh</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <div key={classItem.id} className={`bg-gradient-to-br ${classItem.color} rounded-xl p-6 shadow-lg`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{classItem.name}</h3>
                    <p className="text-white/80">{classItem.studentCount} học sinh</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(classItem.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-white/90 mb-1">
                    <BookOpenIcon />
                    <span className="text-sm">{classItem.currentLesson}</span>
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-full h-2 mb-2">
                  <div 
                    className="bg-white rounded-full h-2" 
                    style={{ width: `${classItem.progress}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-white text-sm font-medium">{classItem.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              + Thêm lớp học mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManagementPage;