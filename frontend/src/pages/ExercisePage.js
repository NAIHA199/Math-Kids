import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClipboardList, FaClock, FaStar } from 'react-icons/fa';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';
import { toast } from 'react-toastify';

const ExercisePage = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'toan', name: 'Toán học' },
    { id: 'logic', name: 'Tư duy logic' },
  ];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/exercises', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setExercises(data);
      } catch (error) {
        console.error('Lỗi khi load bài tập:', error);
        toast.error("Lỗi khi load bài tập!");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleStartExercise = (exerciseId) => {
    navigate(`/exercises/${exerciseId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Dễ':
        return 'text-green-400';
      case 'Trung bình':
        return 'text-yellow-400';
      case 'Khó':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredExercises =
    selectedCategory === 'all'
      ? exercises
      : exercises.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <SpaceBackground />
      <AuthenticatedNavbar />

      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Bài tập</h1>
            <p className="text-gray-400">
              Luyện tập các bài tập để củng cố kiến thức
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-400">Đang tải bài tập...</p>
          )}

          {/* No exercises */}
          {!loading && filteredExercises.length === 0 && (
            <p className="text-center text-gray-400">Chưa có bài tập nào</p>
          )}

          {/* Exercises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{exercise.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {exercise.description}
                    </p>
                  </div>
                  {exercise.completed && (
                    <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                      Đã hoàn thành
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FaClipboardList />
                    <span>{exercise.questions?.length || 0} câu hỏi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{exercise.time || '—'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-sm font-medium ${getDifficultyColor(
                      exercise.difficulty
                    )}`}
                  >
                    {exercise.difficulty || 'Không xác định'}
                  </span>
                  {exercise.completed && exercise.score && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar />
                      <span className="font-bold">{exercise.score}/100</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleStartExercise(exercise.id)}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  {exercise.completed ? 'Làm lại' : 'Bắt đầu'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
