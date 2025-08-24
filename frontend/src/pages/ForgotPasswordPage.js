import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

// Import components
import SpaceBackground from '../components/login/SpaceBackground';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        toast.success('📧 Đã gửi email đặt lại mật khẩu! Hãy kiểm tra hộp thư của bạn.');
      } else {
        toast.error(data.message || '❌ Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error('❌ Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4 text-center"
            >
              📧
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Quên mật khẩu?
            </h1>
            
            <p className="text-blue-200">
              {isSubmitted 
                ? "Kiểm tra email của bạn để đặt lại mật khẩu" 
                : "Nhập email của bạn để nhận liên kết đặt lại mật khẩu"}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập email của bạn"
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
                      <FaPaperPlane />
                      <span>Gửi liên kết đặt lại</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">🚀</div>
                <p className="text-white mb-4">
                  Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến:
                </p>
                <div className="bg-white/20 rounded-lg p-3 mb-6">
                  <p className="text-white font-medium">{email}</p>
                </div>
                <p className="text-blue-200 text-sm">
                  Nếu bạn không thấy email trong hộp thư đến, hãy kiểm tra thư mục spam.
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-blue-300 hover:text-blue-100 transition-colors"
              >
                ← Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;