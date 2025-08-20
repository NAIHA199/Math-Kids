import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';

// =================================================================================
// CÁC COMPONENT MOCK & ICON (Để khắc phục lỗi import)
// =================================================================================


// Các icon SVG thay thế cho react-icons để loại bỏ dependency
const FaArrowLeft = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>;
const FaArrowRight = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>;
const FaSpinner = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 66.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>;


// =================================================================================
// CÁC COMPONENT CON CHO TỪNG LOẠI NỘI DUNG BÀI HỌC
// =================================================================================

const VideoSection = ({ sectionData }) => (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{sectionData.title}</h3>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-inner">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={sectionData.videoUrl}
                title={sectionData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
        {sectionData.duration && (
            <p className="text-sm text-gray-500 mt-3 text-right">Thời lượng: {sectionData.duration}</p>
        )}
    </div>
);

const ContentSection = ({ sectionData }) => (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{sectionData.title}</h3>
        {sectionData.image && (
            <img
                src={sectionData.image}
                alt={sectionData.title}
                className="float-right w-1/3 ml-4 mb-2 rounded-lg shadow-md hidden sm:block"
            />
        )}
        <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: sectionData.content }}
        />
    </div>
);

const QuizSection = ({ sectionData, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const question = sectionData.questions[currentQuestionIndex];

    const handleAnswerClick = (optionIndex) => {
        if (isAnswered) return;

        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        const isCorrectAnswer = optionIndex === question.correct;
        if (isCorrectAnswer) {
            setScore(score + 1);
            toast.success('Chính xác!');
        } else {
            toast.error('Chưa đúng rồi!');
        }

        setTimeout(() => {
            if (currentQuestionIndex < sectionData.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsAnswered(false);
                setSelectedAnswer(null);
            } else {
                onQuizComplete(score + (isCorrectAnswer ? 1 : 0), sectionData.questions.length);
            }
        }, 1500);
    };

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{sectionData.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
                Câu {currentQuestionIndex + 1} / {sectionData.questions.length}
            </p>
            <p className="text-lg font-semibold text-gray-700 mb-6">{question.q}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option, index) => {
                    const isCorrect = index === question.correct;
                    const isSelected = index === selectedAnswer;
                    let buttonClass = 'bg-gray-100 hover:bg-indigo-100 text-gray-800';
                    if (isAnswered && isSelected) {
                        buttonClass = isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                    } else if (isAnswered && isCorrect) {
                        buttonClass = 'bg-green-500 text-white';
                    }

                    return (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswerClick(index)}
                            disabled={isAnswered}
                            className={`p-4 rounded-lg font-medium text-left transition-colors duration-300 ${buttonClass}`}
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};


// =================================================================================
// COMPONENT CHÍNH CỦA TRANG BÀI HỌC
// =================================================================================

const LessonPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();

    const [lessonData, setLessonData] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [completedSections, setCompletedSections] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessonData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockApiData = {
                    id: lessonId,
                    title: `Bài học về Phép Cộng (Lớp 1)`,
                    grade: 1,
                    sections: [
                        { id: 'sec1', type: 'video', title: 'Video: Giới thiệu Phép Cộng', videoUrl: 'https://www.youtube.com/embed/Phbp2Y_P2CE?si=L-a_lqYw2n_yZz0o', duration: '5:30' },
                        { id: 'sec2', type: 'content', title: 'Lý thuyết cơ bản', content: '<h3>Phép cộng là gì?</h3><p>Phép cộng là một trong bốn phép tính cơ bản, dùng để gộp các nhóm đối tượng lại với nhau. Ví dụ: 2 quả táo cộng 3 quả táo bằng 5 quả táo.</p>', image: 'https://placehold.co/400x200/3b82f6/ffffff?text=2+3=5' },
                        { id: 'sec3', type: 'quiz', title: 'Kiểm tra nhanh', questions: [
                            { q: '2 + 2 = ?', options: ['3', '4', '5', '6'], correct: 1 },
                            { q: '5 + 3 = ?', options: ['6', '7', '8', '9'], correct: 2 },
                        ]},
                        { id: 'sec4', type: 'content', title: 'Tổng kết', content: '<h3>Chúc mừng!</h3><p>Bạn đã nắm được những kiến thức cơ bản về phép cộng. Hãy tiếp tục làm bài tập để thành thạo hơn nhé!</p>' }
                    ]
                };

                if (!mockApiData) {
                    throw new Error('Không tìm thấy bài học.');
                }
                setLessonData(mockApiData);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLessonData();
    }, [lessonId]);

    const handleQuizComplete = (score, total) => {
        toast.info(`Bạn đã trả lời đúng ${score}/${total} câu!`);
        setTimeout(handleNextSection, 1000);
    };

    const renderCurrentSection = () => {
        if (!lessonData) return null;
        const section = lessonData.sections[currentSectionIndex];
        
        switch (section.type) {
            case 'video': return <VideoSection sectionData={section} />;
            case 'content': return <ContentSection sectionData={section} />;
            case 'quiz': return <QuizSection sectionData={section} onQuizComplete={handleQuizComplete} />;
            default: return <div className="bg-white rounded-2xl p-6 shadow-lg">Nội dung không xác định.</div>;
        }
    };

    const handleNextSection = () => {
        const newCompleted = new Set(completedSections).add(currentSectionIndex);
        setCompletedSections(newCompleted);

        if (currentSectionIndex < lessonData.sections.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
            toast.success('Chúc mừng! Bạn đã hoàn thành bài học! 🎉');
            navigate(`/dashboard`); 
        }
    };

    const handlePrevSection = () => {
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <FaSpinner className="animate-spin text-purple-600 text-4xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi</h2>
                <p className="text-gray-700 mb-6">{error}</p>
                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AuthenticatedNavbar user={{ role: 'student' }} />
            <div className="container mx-auto max-w-4xl px-4 py-8 pt-24">
                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-purple-700 font-medium mb-2">
                        <FaArrowLeft className="mr-2" />
                        Quay lại danh sách
                    </button>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        {lessonData?.title}
                    </h1>
                </div>

                <div className="flex items-center gap-2 mb-8">
                    {lessonData?.sections.map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-2 rounded-full transition-colors duration-500 ${
                                completedSections.has(index) || index < currentSectionIndex
                                    ? 'bg-green-500'
                                    : index === currentSectionIndex
                                    ? 'bg-purple-500'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSectionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderCurrentSection()}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handlePrevSection}
                        disabled={currentSectionIndex === 0}
                        className="flex items-center px-5 py-3 rounded-lg font-semibold text-gray-700 bg-white shadow-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                        <FaArrowLeft className="mr-2" />
                        Trước
                    </button>
                    <button
                        onClick={handleNextSection}
                        className="flex items-center px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all"
                    >
                        {currentSectionIndex === lessonData?.sections.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                        <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
