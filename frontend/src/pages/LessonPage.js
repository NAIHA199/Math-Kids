import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthenticatedNavbar from "../components/layout/AuthenticatedNavbar";
import SpaceBackground from "../components/ui/SpaceBackground";

// Icon SVG
const FaArrowLeft = () => (
  <svg viewBox="0 0 448 512" width="1em" height="1em">
    <path
      fill="currentColor"
      d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
    ></path>
  </svg>
);
const FaArrowRight = () => (
  <svg viewBox="0 0 448 512" width="1em" height="1em">
    <path
      fill="currentColor"
      d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
    ></path>
  </svg>
);
const FaSpinner = () => (
  <svg viewBox="0 0 512 512" width="1em" height="1em">
    <path
      fill="currentColor"
      d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
    ></path>
  </svg>
);

// Parse JSON an toàn
const parseQuestions = (questions) => {
  try {
    return typeof questions === "string" ? JSON.parse(questions) : questions;
  } catch {
    return [];
  }
};

// Component danh sách bài học
function LessonsList({ lessons, onSelect, currentId }) {
  return (
    <div className="w-1/4 p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-4">Danh sách bài học</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="mb-2">
            <button
              onClick={() => onSelect(lesson.id)}
              className={`block w-full text-left p-2 rounded ${
                lesson.id === currentId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {lesson.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LessonPageWrapper() {
  const { lessonId: paramId } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState(paramId || null);
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Lấy danh sách bài học
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/lessons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        if (!lessonId && data.length > 0) {
          setLessonId(data[0].id);
          navigate(`/lessons/${data[0].id}`);
        }
      })
      .catch((err) => console.error(err));
  }, [lessonId, navigate]);

  // Lấy dữ liệu bài học
  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/lessons/${lessonId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => {
        setLessonData(data);
        setCurrentSection(0);
        setUserAnswers({});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch dữ liệu:", err);
        toast.error("Không tải được dữ liệu bài học!");
        setLoading(false);
      });
  }, [lessonId]);

  const handleSelectLesson = (id) => {
    setLessonId(id);
    navigate(`/lessons/${id}`);
  };

  const handleAnswer = (qIndex, optIndex) => {
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleComplete = async () => {
    const sections = lessonData.sections || [];
    try {
      const progressPercent = Math.round(
        ((currentSection + 1) / sections.length) * 100
      );

      let scorePercent = null;
      if (sections.some((sec) => sec.type === "practice")) {
        const practiceSections = sections.filter((sec) => sec.type === "practice");
        let totalQ = 0,
          correctQ = 0;
        practiceSections.forEach((sec) => {
          const questions = parseQuestions(sec.questions);
          questions.forEach((q, i) => {
            totalQ++;
            if (userAnswers[i] === q.correct) correctQ++;
          });
        });
        if (totalQ > 0) scorePercent = Math.round((correctQ / totalQ) * 100);
      }

      let stars = 0;
      if (progressPercent === 100) {
        const value = scorePercent ?? progressPercent;
        if (value === 100) stars = 1;
        else stars = 0;
      }

      await fetch("http://localhost:8000/api/completions/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          completable_type: "lesson",
          completable_id: lessonId,
          progress: progressPercent,
          score: scorePercent,
          status: "completed",
          stars: stars,
        }),
      });

      toast.success(`🎉 Hoàn thành bài học! Bạn đạt ${stars} ⭐`);
      navigate("/student-home");
    } catch {
      toast.error("Lỗi khi lưu tiến trình!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <SpaceBackground />
        <div className="relative z-10 text-center">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <p>Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) return <p>Không có dữ liệu bài học</p>;

  const sections = lessonData.sections || [];
  const section = sections[currentSection] || {};

  return (
    <div className="min-h-screen bg-black text-white flex">
      <LessonsList
        lessons={lessons}
        onSelect={handleSelectLesson}
        currentId={lessonId}
      />

      <div className="flex-1 relative z-10 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <AuthenticatedNavbar
          onLogout={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        />

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Quay lại
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">
              {lessonData.title}
            </h1>
            <p className="text-gray-400">{lessonData.description}</p>
          </div>

          {/* Section Content */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

            {section.type === "intro" && section.content && (
              <p className="text-gray-300">{section.content}</p>
            )}

            {section.type === "video" && section.video_url && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={section.video_url}
                  title="Bài giảng"
                  className="w-full h-96 rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}

            {section.type === "practice" && (
              <div>
                {parseQuestions(section.questions).map((q, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium mb-2">{q.question}</p>
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(i, idx)}
                        className={`block w-full text-left p-2 rounded mb-1 ${
                          userAnswers[i] === idx
                            ? "bg-blue-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    {userAnswers[i] !== undefined && (
                      <p
                        className={`mt-1 text-sm ${
                          userAnswers[i] === q.correct
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {userAnswers[i] === q.correct
                          ? "Đúng!"
                          : `Sai! Đáp án đúng: ${q.options[q.correct]}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "summary" && section.content && (
              <p className="text-gray-300">{section.content}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
              disabled={currentSection === 0}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              <FaArrowLeft /> Trước
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentSection((prev) =>
                    Math.min(prev + 1, sections.length - 1)
                  )
                }
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
              >
                Tiếp <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
              >
                Hoàn thành
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
