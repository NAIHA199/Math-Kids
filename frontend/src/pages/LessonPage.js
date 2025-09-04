import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../components/exercise/Question";
import AuthenticatedNavbar from "../components/layout/AuthenticatedNavbar";
import SpaceBackground from "../components/ui/SpaceBackground";
import { toast } from "react-toastify";

const ExerciseDetailPage = ({ updateTotalStars }) => {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});
  const [completed, setCompleted] = useState(false);

  // Lấy dữ liệu bài tập từ backend
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8000/api/exercises/${exerciseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Lỗi khi load bài tập:", error);
        toast.error("Lỗi khi tải bài tập!");
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [exerciseId]);

  // Chọn đáp án
  const handleAnswerSelect = (optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex,
    });
  };

  // Xem kết quả từng câu
  const handleAnswer = (result) => {
    setShowResults({
      ...showResults,
      [currentQuestionIndex]: result,
    });
  };

  // Câu tiếp theo
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Câu trước
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Hoàn thành bài tập
  const handleComplete = async () => {
    const updatedResults = {};
    questions.forEach((q, i) => {
      const userAnswer = selectedOptions[i];
      updatedResults[i] = {
        isCorrect: userAnswer === q.correctAnswer,
        correctAnswer: q.correctAnswer,
      };
    });
    setShowResults(updatedResults);
    setCompleted(true);

    const totalQ = questions.length;
    const correctQ = Object.values(updatedResults).filter(
      (r) => r.isCorrect
    ).length;
    const progressPercent = 100;
    const scorePercent = Math.round((correctQ / totalQ) * 100);
    const stars = scorePercent >= 90 ? 1 : 0;

    try {
      await fetch("http://localhost:8000/api/completions/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          completable_type: "exercise",
          completable_id: exerciseId,
          progress: progressPercent,
          score: scorePercent,
          status: "completed",
          stars: stars,
        }),
      });
      toast.success(`🎉 Hoàn thành bài tập! Bạn đạt ${stars} ⭐`);

      // Cập nhật tổng sao
      try {
        const resStars = await fetch(
          "http://localhost:8000/api/users/me/progress",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const dataStars = await resStars.json();
        updateTotalStars(dataStars.totalStars);
      } catch (error) {
        console.error("Lỗi khi cập nhật tổng sao:", error);
      }
    } catch {
      toast.error("Lỗi khi lưu tiến trình!");
    }
  };

  const handleExit = () => {
    navigate("/exercises");
  };

  // Tính % progress
  const progressPercent =
    questions.length > 0
      ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-black text-white">
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

          {/* Hiển thị tiến trình */}
          <div className="mb-4 text-center text-gray-300">
            Câu {currentQuestionIndex + 1}/{questions.length} (
            {progressPercent}%)
          </div>

          {!loading && questions[currentQuestionIndex] && (
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
          )}

          {/* Nếu đã hoàn thành thì hiện kết quả chi tiết */}
          {completed && (
            <div className="mb-8 bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 text-center">
                Kết quả chi tiết
              </h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const result = showResults[index];
                  const userAnswer = selectedOptions[index];
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <p className="font-medium mb-2">
                        Câu {index + 1}: {question.question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        {(question?.options || []).map((option, optIndex) => {
                          let optionStyle = "p-2 rounded text-sm ";
                          if (optIndex === question.correctAnswer) {
                            optionStyle +=
                              "bg-green-900/30 border border-green-500";
                          } else if (
                            optIndex === userAnswer &&
                            !result?.isCorrect
                          ) {
                            optionStyle +=
                              "bg-red-900/30 border border-red-500";
                          } else {
                            optionStyle += "bg-gray-700/50";
                          }
                          return (
                            <div key={optIndex} className={optionStyle}>
                              <span className="font-medium">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>{" "}
                              {option}
                              {optIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-400">
                                  ✓ Đáp án đúng
                                </span>
                              )}
                              {optIndex === userAnswer &&
                                optIndex !== question.correctAnswer && (
                                  <span className="ml-2 text-red-400">
                                    ✗ Bạn chọn
                                  </span>
                                )}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className={`font-medium ${
                          result?.isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {result?.isCorrect
                          ? "✅ Trả lời đúng!"
                          : "❌ Trả lời sai!"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Điều hướng câu hỏi */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || completed}
              className="px-6 py-3 bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>Câu trước</span>
            </button>

            {!completed ? (
              currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOptions[currentQuestionIndex] === undefined}
                  className="px-6 py-3 bg-green-600 rounded-lg disabled:opacity-50 hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <span>Câu tiếp theo</span>
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <span>Hoàn thành</span>
                </button>
              )
            ) : (
              <button
                onClick={() => navigate("/exercises")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
              >
                <span>Quay về danh sách</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
