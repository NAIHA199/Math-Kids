import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../components/exercise/Question';
import questions from '../utils/Question.json';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

const ExerciseDetailPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});
  const [showAllResults, setShowAllResults] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleAnswer = (result) => {
    setShowResults({
      ...showResults,
      [currentQuestionIndex]: result
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAnswer = () => {
    // Đánh dấu đã hoàn thành tất cả câu hỏi
    setShowAllResults(true);
    
    // Đảm bảo câu hỏi hiện tại được lưu kết quả nếu chưa có
    if (!showResults[currentQuestionIndex] && selectedOptions[currentQuestionIndex] !== undefined) {
      const isCorrect = selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer;
      setShowResults({
        ...showResults,
        [currentQuestionIndex]: {
          isCorrect,
          correctAnswer: questions[currentQuestionIndex].correctAnswer
        }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setShowResults({});
    setShowAllResults(false);
  };

  const handleExit = () => {
    navigate('/exercises');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <SpaceBackground />
      
      <AuthenticatedNavbar />
      
      <div className="relative z-10 pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Bài tập Toán
            </h1>
            <button
              onClick={handleExit}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Thoát</span>
            </button>
          </div>
          
          <div className="mb-8">
            <Question
              question={questions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedOption={selectedOptions[currentQuestionIndex]}
              showResult={showResults[currentQuestionIndex]}
              onSelectOption={handleAnswerSelect}
              onAnswer={handleAnswer}
            />
          </div>
          
          {/* Hiển thị tất cả kết quả sau khi ấn Kết thúc */}
          {showAllResults && (
            <div className="mb-8 bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 text-center">Kết quả chi tiết</h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const result = showResults[index];
                  const userAnswer = selectedOptions[index];
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <p className="font-medium mb-2">Câu {index + 1}: {question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        {question.options.map((option, optIndex) => {
                          let optionStyle = "p-2 rounded text-sm ";
                          
                          if (optIndex === question.correctAnswer) {
                            optionStyle += "bg-green-900/30 border border-green-500";
                          } else if (optIndex === userAnswer && !result?.isCorrect) {
                            optionStyle += "bg-red-900/30 border border-red-500";
                          } else {
                            optionStyle += "bg-gray-700/50";
                          }
                          
                          return (
                            <div key={optIndex} className={optionStyle}>
                              <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                              {optIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-400">✓ Đáp án đúng</span>
                              )}
                              {optIndex === userAnswer && optIndex !== question.correctAnswer && (
                                <span className="ml-2 text-red-400">✗ Bạn chọn</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className={`font-medium ${result?.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {result?.isCorrect ? '✅ Trả lời đúng!' : '❌ Trả lời sai!'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || showAllResults}
              className="px-6 py-3 bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>Câu trước</span>
            </button>
            
            {showAllResults && (
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
              >
                <span>Làm lại</span>
              </button>
            )}
            
            {!showAllResults && (
              <>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!showResults[currentQuestionIndex]} // Chỉ cho phép chuyển tiếp khi đã trả lời
                    className="px-6 py-3 bg-green-600 rounded-lg disabled:opacity-50 hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <span>Câu tiếp theo</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!showResults[currentQuestionIndex]} // Chỉ cho phép kết thúc khi đã trả lời câu cuối
                    className="px-6 py-3 bg-purple-600 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <span>Kết thúc</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;