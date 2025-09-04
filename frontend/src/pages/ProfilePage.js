import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Import components
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import Footer from '../components/layout/Footer';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  lessonsCompleted: 0,
  exercisesCompleted: 0,
  gamesCompleted: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/my-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
      
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => response.json())
          .then(response => setStats(response.stats))
          .catch(error => {
            console.error("API error (rewards/summary):", error);
            setStats({ stars: 0, level: 0, streak: 0 });
          });
            const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải thống kê:", err);
      }
    };

    fetchStats();
  }, []);
  // Hàm lấy thông tin hiển thị người dùng theo vai trò
  const getUserDisplay = () => {
    switch(user?.role) {
      case 'student':
        return { 
          icon: '🎒', 
          label: 'Học sinh',
          roleDescription: 'Học sinh Math Galaxy',
          additionalInfo: 'Tham gia học toán vui vẻ cùng bạn bè'
        };
      case 'teacher':
        return { 
          icon: '👩‍🏫', 
          label: 'Giáo viên',
          roleDescription: 'Giáo viên Math Galaxy',
          additionalInfo: 'Giúp đỡ học sinh khám phá thế giới toán học'
        };
      case 'parent':
        return { 
          icon: '👨‍👩‍👧‍👦', 
          label: 'Phụ huynh',
          roleDescription: 'Phụ huynh Math Galaxy',
          additionalInfo: 'Đồng hành cùng con trên hành trình học toán'
        };
      default:
        // Trong trường hợp vai trò không xác định, mặc định là học sinh
        return { 
          icon: '🎒', 
          label: 'Học sinh',
          roleDescription: 'Học sinh Math Galaxy',
          additionalInfo: 'Tham gia học toán vui vẻ cùng bạn bè'
        };
    }
  };

  const userDisplay = getUserDisplay();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Space Background */}
      <div className="fixed inset-0 z-0">
        {/* Static stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: '2px',
                height: '2px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>

        {/* Simple gradient nebula */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Authenticated Navbar */}
        <AuthenticatedNavbar user={user} />

        {/* Profile Content */}
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {userDisplay.icon}
                </motion.div>
                
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {user?.fullName || user?.username}
                </h1>
                
                <p className="text-xl text-gray-300 mb-4">{user?.email}</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
                  <span className="text-lg">{userDisplay.icon}</span>
                  <span className="font-semibold text-purple-300">{userDisplay.label}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
                >
                  <h2 className="text-2xl font-bold mb-4 text-purple-300">Thông tin cơ bản</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Họ và tên</label>
                      <p className="text-lg">{user?.fullName || 'Chưa cập nhật'}</p>
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-sm">Tên người dùng</label>
                      <p className="text-lg">{user?.username || 'Chưa cập nhật'}</p>
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-sm">Email</label>
                      <p className="text-lg">{user?.email || 'Chưa cập nhật'}</p>
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-sm">Vai trò</label>
                      <p className="text-lg">{userDisplay.label}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
                >
                  <h2 className="text-2xl font-bold mb-4 text-purple-300">Thông tin bổ sung</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Mô tả vai trò</label>
                      <p className="text-lg">{userDisplay.roleDescription}</p>
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-sm">Mô tả</label>
                      <p className="text-lg">{userDisplay.additionalInfo}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 text-purple-300">Hoạt động</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Bài học đã hoàn thành</span>
                          <span className="font-bold text-purple-400">0</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Trò chơi đã chơi</span>
                          <span className="font-bold text-purple-400">{stats.gamesCompleted}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Thành tích đạt được</span>
                          <span className="font-bold text-purple-400">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/settings')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Chỉnh sửa thông tin
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;