import React, { useState, useEffect } from 'react';

const Question = ({ question, selectedOption, showResult, onSelectOption, totalQuestions = 5, currentQuestion = 1, onAnswer }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Reset state khi câu hỏi thay đổi
  useEffect(() => {
    setIsAnswered(false);
    setIsCorrect(null);
  }, [question.id]);

  const handleSelectOption = (option, index) => {
    if (!isAnswered) {
      onSelectOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== undefined && selectedOption !== null) {
      const correct = selectedOption === question.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      
      // Gọi callback để thông báo kết quả
      if (onAnswer) {
        onAnswer({
          isCorrect: correct,
          correctAnswer: question.correctAnswer
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto border border-purple-500/30 backdrop-blur-sm">
      {/* Header với tiến trình */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-gray-300">
          Câu hỏi {currentQuestion} / {totalQuestions}
        </div>
      </div>

      {/* Nội dung câu hỏi */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          {question.question}
        </h2>
        
        {/* Các lựa chọn trả lời */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => {
            let buttonStyle = "p-4 rounded-xl border-2 text-left transition-all duration-300 ";
            
            if (isAnswered) {
              // After submitting - show correct/incorrect
              if (index === question.correctAnswer) {
                buttonStyle += "border-green-500 bg-green-900/30 transform scale-105";
              } else if (selectedOption === index) {
                buttonStyle += "border-red-500 bg-red-900/30";
              } else {
                buttonStyle += "border-gray-600 bg-gray-800/50";
              }
            } else {
              // Before submitting - show selection state
              if (selectedOption === index) {
                buttonStyle += "border-purple-500 bg-purple-900/30 transform scale-105";
              } else {
                buttonStyle += "border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-purple-900/20";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(option, index)}
                disabled={isAnswered}
                className={buttonStyle}
              >
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold
                    ${isAnswered 
                      ? index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : selectedOption === index
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-700 text-gray-300'
                      : selectedOption === index
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-white">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phản hồi sau khi trả lời */}
      {isAnswered && (
        <div className={`
          p-4 rounded-xl mb-6 text-center border-2
          ${isCorrect ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}
        `}>
          <p className="font-bold text-lg">
            {isCorrect ? '🎉 Chính xác! Tốt lắm!' : '😅 Không đúng rồi, hãy thử lại!'}
          </p>
          {question.explanation && (
            <p className="mt-2 text-gray-200">{question.explanation}</p>
          )}
        </div>
      )}

      {/* Nút hành động */}
      {!isAnswered && (
        <div className="text-center">
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === undefined || selectedOption === null}
            className={`
              bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full
              ${selectedOption === undefined || selectedOption === null
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition duration-300 shadow-lg'
              }
            `}
          >
            Kiểm Tra
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;