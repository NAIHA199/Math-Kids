import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrophy, FaStar, FaMedal, FaCrown, FaLock, FaCheckCircle,
  FaCalendarCheck, FaBolt, FaFire, FaBook
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../utils/helpers';
import SpaceBackground from '../components/ui/SpaceBackground';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';

const RewardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [rewards, setRewards] = useState({ badges: [], achievements: [] });

  // Kiểm tra đăng nhập
  /*useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập!');
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);*/

  // Fetch dữ liệu reward từ API
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8000/api/rewards/summary", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Không thể lấy dữ liệu reward");
        

        setRewards(
          {
            achievements: [
              {
                id: 1,
                name: "Tổng số sao",
                value: data.achievements.stars,
                icon: <FaStar />,
                color: "text-yellow-400"
              },
              {
                id: 2,
                name: "Cấp độ",
                value: data.achievements.level,
                icon: <FaCrown />,
                color: "text-purple-400"
              },
              {
                id: 3,
                name: "Chuỗi ngày",
                value: data.achievements.streak_days,
                icon: <FaCalendarCheck />,
                color: "text-green-400"
              }
            ],
            badges: data.badges ?? []
          }
        ); // data có { achievements, badges }
      } catch (err) {
        console.error(err);
        toast.error("Lỗi tải phần thưởng!");
      }
    };

    fetchRewards();
  }, []);

  // Filter badges
  const filteredBadges = selectedCategory === 'all' 
    ? rewards.badges 
    : rewards.badges.filter(badge => badge.category === selectedCategory);

  // Categories
  const categories = [
    { id: 'all', name: 'Tất cả', icon: <FaTrophy /> },
    { id: 'learning', name: 'Học tập', icon: <FaBook /> },
    { id: 'achievement', name: 'Thành tích', icon: <FaMedal /> },
    { id: 'streak', name: 'Chuỗi ngày', icon: <FaFire /> },
    { id: 'games', name: 'Trò chơi', icon: <FaTrophy /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        <AuthenticatedNavbar user={user} />
        <div className="max-w-6xl mx-auto p-4">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Phần thưởng của {user?.username || 'bạn'}
            </h1>
            <p className="text-gray-300">
              Thu thập huy hiệu và mở khóa phần thưởng đặc biệt!
            </p>
          </motion.div>

          {/* Achievement Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {rewards.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700 text-center shadow-lg"
              >
                <div className={`text-3xl mb-2 ${achievement.color}`}>
                  {achievement.icon}
                </div>
                <p className="text-2xl font-bold text-white">{achievement.value}</p>
                <p className="text-sm text-gray-400">{achievement.name}</p>
              </div>
            ))}
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {filteredBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${!badge.earned && 'opacity-75'}`}
              >
                <div className={`bg-gradient-to-br ${badge.color} p-6 rounded-2xl shadow-xl text-white text-center backdrop-blur-md border border-gray-700 ${
                  badge.earned ? 'cursor-pointer hover:shadow-2xl transform hover:scale-105' : ''
                } transition-all`}>
                  
                  {!badge.earned && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                      <FaLock className="text-4xl text-white/80" />
                    </div>
                  )}

                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                  <p className="text-sm opacity-90">{badge.description}</p>

                  {badge.earned ? (
                    <p className="text-xs mt-4 opacity-80">
                      Đạt được: {badge.earnedDate}
                    </p>
                  ) : (
                    <p className="text-xs mt-4 font-medium">
                      Yêu cầu: {badge.requirement}
                    </p>
                  )}
                </div>

                {badge.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg"
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RewardPage;