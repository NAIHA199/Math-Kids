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

        if (!response.ok) throw new Error("Không thể lấy dữ liệu reward");

        const data = await response.json();
        setRewards(
          {
            achievements: [
              {
                id: 1,
                name: "Tổng số sao",
                value: data.achievements.stars,
                icon: <FaStar />,
                color: "text-yellow-500"
              },
              {
                id: 2,
                name: "Cấp độ",
                value: data.achievements.level,
                icon: <FaCrown />,
                color: "text-purple-600"
              },
              {
                id: 3,
                name: "Chuỗi ngày",
                value: data.achievements.streak_days,
                icon: <FaCalendarCheck />,
                color: "text-green-500"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
      <AuthenticatedNavbar user={user} />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Phần thưởng của {user?.username || 'bạn'}
          </h1>
          <p className="text-gray-600">
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
              className="bg-white rounded-xl p-4 shadow-lg text-center"
            >
              <div className={`text-3xl mb-2 ${achievement.color}`}>
                {achievement.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{achievement.value}</p>
              <p className="text-sm text-gray-600">{achievement.name}</p>
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
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
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
              <div className={`bg-gradient-to-br ${badge.color} p-6 rounded-2xl shadow-lg text-white text-center ${
                badge.earned ? 'cursor-pointer hover:shadow-xl transform hover:scale-105' : ''
              } transition-all`}>
                
                {!badge.earned && (
                  <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                    <FaLock className="text-4xl text-white/70" />
                  </div>
                )}

                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-sm opacity-90">{badge.description}</p>

                {badge.earned ? (
                  <p className="text-xs mt-4 opacity-75">
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
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2"
                >
                  <FaCheckCircle />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RewardPage;
