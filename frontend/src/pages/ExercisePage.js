import React, { useState } from 'react';
import Question from '../components/exercise/Question';
import questions from '../utils/Question.json';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

const ExercisePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex
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
    setShowResults({
      ...showResults,
      [currentQuestionIndex]: {
        isCorrect: selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].correct,
        correctAnswer: questions[currentQuestionIndex].correct
      }
    });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setShowResults({});
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <SpaceBackground />
      
      <AuthenticatedNavbar />
      
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Bài tập Toán</h1>
          
          <Question
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOptions[currentQuestionIndex]}
            showResult={showResults[currentQuestionIndex]}
            onSelectOption={handleAnswerSelect}
          />
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              Câu trước
            </button>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Câu tiếp theo
              </button>
            ) : (
              <button
                onClick={handleSubmitAnswer}
                className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Kết thúc
              </button>
            )}
          </div>
          
          {Object.keys(showResults).length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Làm lại
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
