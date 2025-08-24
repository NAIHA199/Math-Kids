import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaLock } from 'react-icons/fa';

// Import components
import SpaceBackground from '../components/login/SpaceBackground';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get token and email from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('❌ Mật khẩu xác nhận không khớp!');
      return;
    }
    
    if (password.length < 6) {
      toast.error('❌ Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          email,
          password,
          password_confirmation: confirmPassword
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        toast.success('✅ Đặt lại mật khẩu thành công!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(data.message || '❌ Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error('❌ Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  // If no token or email in URL, show error
  if (!token || !email) {
    return (
      <div className="min-h-screen bg-black overflow-hidden relative">
        <SpaceBackground simplified={true} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <div className="text-5xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Liên kết không hợp lệ
              </h1>
              <p className="text-blue-200 mb-6">
                Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FaArrowLeft />
                <span>Quay lại đăng nhập</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Space Background */}
      <SpaceBackground simplified={true} />
      
      {/* Back to Login Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <FaArrowLeft />
          <span>Quay lại đăng nhập</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4 text-center"
            >
              🔐
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Đặt lại mật khẩu
            </h1>
            
            <p className="text-blue-200">
              Nhập mật khẩu mới cho tài khoản của bạn
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Email
                  </label>
                  <div className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white">
                    {email}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-white mb-2 font-medium">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập mật khẩu mới"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-blue-200 text-sm mt-1">Ít nhất 6 ký tự</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-white mb-2 font-medium">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập lại mật khẩu mới"
                    required
                    disabled={isLoading}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <FaLock />
                      <span>Đặt lại mật khẩu</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Thành công!
                </h2>
                <p className="text-white mb-6">
                  Mật khẩu của bạn đã được cập nhật thành công.
                </p>
                <p className="text-blue-200">
                  Đang chuyển hướng đến trang đăng nhập...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;