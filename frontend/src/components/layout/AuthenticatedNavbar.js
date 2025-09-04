import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaSignOutAlt,
  FaStar,
  FaChevronDown,
  FaUser,
  FaCog,
  FaHome,
  FaBook,
  FaGamepad,
  FaTrophy,
  FaChartLine,
  FaUsers,
  FaClipboardList
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const AuthenticatedNavbar = ({ user: propUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { logout, getCurrentUser } = useAuth();
  
  // Sử dụng user từ props nếu có, ngược lại lấy từ localStorage
  const user = propUser || getCurrentUser();
  
  // ⭐ State lưu stars
  const [stars, setStars] = useState(0);
  // Gọi API để lấy stars từ /api/rewards/summary
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/rewards/summary', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error("Lỗi khi gọi API rewards/summary");
        }

        const data = await res.json();
        setStars(data.achievements?.stars || 0);
      } catch (err) {
        console.error("Lỗi khi lấy stars:", err);
      }
    };
    if (user?.role === 'student') {
      fetchStars();
    }
  }, [user?.role]);

  // Menu items based on user type
  const getMenuItems = () => {
    const baseItems = {
      student: [
        { path: '/home', label: 'Trang chủ', icon: <FaHome /> },
        { path: '/lessons', label: 'Bài học', icon: <FaBook /> },
        { path: '/exercises', label: 'Bài tập', icon: <FaClipboardList /> },
        { path: '/games', label: 'Trò chơi', icon: <FaGamepad /> },
        { path: '/rewards', label: 'Phần thưởng', icon: <FaTrophy /> },
      ],
      teacher: [
        { path: '/home', label: 'Trang chủ', icon: <FaHome /> },
        { path: '/classes', label: 'Lớp học', icon: <FaUsers /> },
        { path: '/exercises-management', label: 'Bài tập', icon: <FaClipboardList /> },
        { path: '/students', label: 'Học sinh', icon: <FaUsers /> },
        { path: '/reports', label: 'Báo cáo', icon: <FaChartLine /> },
      ],
      parent: [
        { path: '/home', label: 'Trang chủ', icon: <FaHome /> },
        { path: '/children', label: 'Con em', icon: <FaUsers /> },
        { path: '/rewards', label: 'Thành tích', icon: <FaTrophy /> },
      ]
    };
    return baseItems[user?.role] || baseItems.student;
  };

  const menuItems = getMenuItems();

  const getUserDisplay = () => {
    switch(user?.role) {
      case 'student':
        return { icon: '🎒', label: 'Học sinh' };
      case 'teacher':
        return { icon: '👩‍🏫', label: 'Giáo viên' };
      case 'parent':
        return { icon: '👨‍👩‍👧‍👦', label: 'Phụ huynh' };
      default:
        // Trong trường hợp vai trò không xác định, mặc định là học sinh
        return { icon: '🎒', label: 'Học sinh' };
    }
  };

  const userDisplay = getUserDisplay();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo (giống trang chủ) */}
          <Link to="/home" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl">🧮</div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Math Galaxy
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                Vũ trụ Toán học kỳ diệu
              </p>
            </div>
          </Link>

          {/* Center - Navigation Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right - User Info & Actions */}
          <div className="flex items-center gap-4">
            {/* Stars display for students */}
            {user?.role === 'student' && (
              <motion.div 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <FaStar className="text-yellow-400" />
                <span className="font-bold text-yellow-400">{stars}</span>
              </motion.div>
            )}

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                  {userDisplay.icon}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold">{user?.username}</p>
                  <p className="text-xs text-gray-400">{userDisplay.label}</p>
                </div>
                <FaChevronDown className={`transition-transform text-gray-400 ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-700">
                      <p className="font-semibold">{user?.username}</p>
                      <p className="text-sm text-gray-400">{user?.email || 'user@mathgalaxy.com'}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <FaUser className="text-gray-400" />
                      <span>Thông tin cá nhân</span>
                    </Link>
                    
                    <hr className="border-gray-700" />
                    
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-red-400"
                    >
                      <FaSignOutAlt />
                      <span>Đăng xuất</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${isActive 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default AuthenticatedNavbar;