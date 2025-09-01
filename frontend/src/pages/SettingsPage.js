import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

// Import components
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import Footer from '../components/layout/Footer';

const SettingsPage = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const navigate = useNavigate();
  
  // Khởi tạo state với thông tin người dùng hiện tại
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Hàm xử lý khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Hàm xử lý cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      // Gọi API để cập nhật thông tin người dùng
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:8000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 422) {
          // Validation errors
          setErrors(data.errors || {});
          toast.error('Vui lòng kiểm tra lại thông tin nhập vào');
          return;
        }
        throw new Error(data.message || 'Cập nhật thông tin thất bại');
      }
      
      // Cập nhật thông tin người dùng trong localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Cập nhật thông tin thành công!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy thông tin hiển thị người dùng theo vai trò
  const getUserDisplay = () => {
    switch(user?.role) {
      case 'student':
        return { icon: '🎒', label: 'Học sinh' };
      case 'teacher':
        return { icon: '👩‍🏫', label: 'Giáo viên' };
      case 'parent':
        return { icon: '👨‍👩‍👧‍👦', label: 'Phụ huynh' };
      default:
        return { icon: '🎒', label: 'Học sinh' };
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

        {/* Settings Content */}
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {userDisplay.icon}
                </motion.div>
                
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Chỉnh sửa thông tin
                </h1>
                
                <p className="text-lg text-gray-300">Cập nhật thông tin cá nhân của bạn</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Nhập họ và tên của bạn"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName[0]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Tên người dùng</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
                      errors.username ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Nhập tên người dùng"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Nhập địa chỉ email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                  )}
                </div>
                
                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="flex-1 px-6 py-3 bg-gray-700 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Hủy bỏ
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;