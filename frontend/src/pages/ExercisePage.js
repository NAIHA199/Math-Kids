import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaClipboardList, FaStar, FaClock } from 'react-icons/fa';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

const ExercisePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for exercises
  const exercises = [
    {
      id: 1,
      title: "Phép cộng có nhớ",
      description: "Luyện tập các phép cộng có nhớ trong phạm vi 100",
      difficulty: "Dễ",
      questions: 10,
      time: "15 phút",
      completed: true,
      score: 90,
      category: "toan"
    },
    {
      id: 2,
      title: "Phép trừ có nhớ",
      description: "Luyện tập các phép trừ có nhớ trong phạm vi 100",
      difficulty: "Dễ",
      questions: 10,
      time: "15 phút",
      completed: false,
      category: "toan"
    },
    {
      id: 3,
      title: "Bảng cửu chương",
      description: "Ôn tập bảng cửu chương từ 2 đến 9",
      difficulty: "Trung bình",
      questions: 20,
      time: "20 phút",
      completed: false,
      category: "toan"
    },
    {
      id: 4,
      title: "Phân số cơ bản",
      description: "Giới thiệu về phân số và các phép toán cơ bản",
      difficulty: "Trung bình",
      questions: 15,
      time: "25 phút",
      completed: false,
      category: "toan"
    },
    {
      id: 5,
      title: "Hình học cơ bản",
      description: "Nhận biết các hình học cơ bản và tính chất",
      difficulty: "Khó",
      questions: 12,
      time: "30 phút",
      completed: false,
      category: "toan"
    },
    {
      id: 6,
      title: "Toán logic",
      description: "Giải các bài toán logic và tư duy",
      difficulty: "Khó",
      questions: 8,
      time: "35 phút",
      completed: false,
      category: "logic"
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'toan', name: 'Toán học' },
    { id: 'logic', name: 'Tư duy logic' }
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  const handleStartExercise = (exerciseId) => {
    navigate(`/exercises/${exerciseId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Dễ': return 'text-green-400';
      case 'Trung bình': return 'text-yellow-400';
      case 'Khó': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

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
            <p className="text-gray-400">Luyện tập các bài tập để củng cố kiến thức</p>
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
                    <p className="text-gray-400 text-sm">{exercise.description}</p>
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
                    <span>{exercise.questions} câu hỏi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{exercise.time}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className={`text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  {exercise.completed && (
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
