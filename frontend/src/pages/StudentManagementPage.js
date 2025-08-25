import React, { useState } from 'react';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

const StudentManagementPage = () => {
  const mockStudents = [
    { id: 'HS001', name: 'Nguyễn Văn An', class: 'Lớp 3A', progress: 85 },
    { id: 'HS002', name: 'Trần Thị Bình', class: 'Lớp 3A', progress: 92 },
    { id: 'HS003', name: 'Lê Văn Cường', class: 'Lớp 4B', progress: 70 },
    { id: 'HS004', name: 'Phạm Thị Dung', class: 'Lớp 4B', progress: 78 },
    { id: 'HS005', name: 'Hoàng Văn Em', class: 'Lớp 5C', progress: 60 },
  ];
  const [students, setStudents] = useState(mockStudents);

  const handleDelete = (studentId) => {
    setStudents(students.filter(s => s.id !== studentId));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <SpaceBackground />
      
      <AuthenticatedNavbar user={{ role: 'teacher' }} />
      
      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
          </div>
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Họ và Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lớp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tiến độ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-700/50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className="ml-3 text-sm font-medium">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-4">
                          <button className="text-blue-400 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                            <EyeIcon /><span>Xem</span>
                          </button>
                          <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-400 transition duration-300 flex items-center space-x-1">
                            <TrashIcon /><span>Xóa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementPage;
