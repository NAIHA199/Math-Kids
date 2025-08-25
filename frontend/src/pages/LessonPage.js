import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import SpaceBackground from '../components/ui/SpaceBackground';

// =================================================================================
// CÁC COMPONENT ICON (SVG) ĐỂ TRÁNH LỖI IMPORT
// =================================================================================
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
            ></iframe>
        </div>
        <p className="mt-4 text-gray-700">{sectionData.description}</p>
    </div>
);

const PracticeSection = ({ sectionData, onAnswer, userAnswers }) => {
    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{sectionData.title}</h3>
            <div className="space-y-6">
                {sectionData.questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-gray-800 mb-2">{q.question}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((option, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => onAnswer(index, optIndex)}
                                    className={`p-3 text-left rounded-lg transition-colors ${userAnswers[index] === optIndex 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 hover:bg-gray-200'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {userAnswers[index] !== undefined && (
                            <div className={`mt-2 text-sm font-medium ${userAnswers[index] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                                {userAnswers[index] === q.correct ? 'Đúng!' : `Sai! Đáp án đúng là: ${q.options[q.correct]}`}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const IntroSection = ({ sectionData }) => (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{sectionData.title}</h2>
        <p className="text-lg opacity-90">{sectionData.content}</p>
        <div className="mt-6 flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
                <div className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                    🚀
                </div>
            </div>
        </div>
    </div>
);

const SummarySection = ({ sectionData }) => (
    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{sectionData.title}</h2>
        <p className="text-lg opacity-90">{sectionData.content}</p>
        <div className="mt-6 flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
                <div className="bg-white text-green-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                    ✨
                </div>
            </div>
        </div>
        <div className="mt-6 bg-white/20 rounded-xl p-4">
            <h3 className="font-bold mb-2">💡 Ghi nhớ:</h3>
            <ul className="list-disc pl-5 space-y-1">
                <li>Luôn ôn tập lại bài học sau mỗi ngày</li>
                <li>Thực hành thêm các bài tập tương tự</li>
                <li>Chơi game để củng cố kiến thức</li>
            </ul>
        </div>
    </div>
);

// =================================================================================
// COMPONENT CHÍNH
// =================================================================================

const LessonPage = () => {
    const { grade, subject, lessonId } = useParams();
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [lessonData, setLessonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});

    // Mock data cho bài học
    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            const mockLesson = {
                id: lessonId,
                title: `Bài học ${lessonId}`,
                description: "Mô tả bài học",
                sections: [
                    {
                        id: 'intro',
                        title: 'Giới thiệu',
                        type: 'intro',
                        content: 'Chào mừng bạn đến với bài học hôm nay! Trong bài học này, chúng ta sẽ tìm hiểu về các khái niệm cơ bản và cách áp dụng chúng vào thực tế.'
                    },
                    {
                        id: 'video',
                        title: 'Video bài giảng',
                        type: 'video',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        description: 'Hãy xem video dưới đây để hiểu rõ hơn về chủ đề của chúng ta ngày hôm nay.'
                    },
                    {
                        id: 'practice',
                        title: 'Thực hành',
                        type: 'practice',
                        questions: [
                            { question: "Đâu là số lớn nhất trong các số sau?", options: ["15", "23", "19", "17"], correct: 1 },
                            { question: "Kết quả của phép tính 12 + 8 là bao nhiêu?", options: ["18", "19", "20", "21"], correct: 2 },
                            { question: "Hình nào có 4 cạnh bằng nhau?", options: ["Hình chữ nhật", "Hình tam giác", "Hình vuông", "Hình tròn"], correct: 2 }
                        ]
                    },
                    {
                        id: 'summary',
                        title: 'Tổng kết',
                        type: 'summary',
                        content: 'Chúng ta đã cùng nhau tìm hiểu về các khái niệm cơ bản ngày hôm nay. Hãy nhớ ôn tập lại bài và thực hành thêm để nắm vững kiến thức nhé!'
                    }
                ]
            };
            setLessonData(mockLesson);
            setLoading(false);
        }, 500);
    }, [lessonId]);

    const handleNextSection = () => {
        if (currentSection < lessonData.sections.length - 1) {
            setCurrentSection(currentSection + 1);
        }
    };

    const handlePrevSection = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleAnswer = (questionIndex, optionIndex) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: optionIndex
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
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

    const renderSection = () => {
        const section = lessonData.sections[currentSection];
        
        switch (section.type) {
            case 'intro':
                return <IntroSection sectionData={section} />;
            case 'video':
                return <VideoSection sectionData={section} />;
            case 'practice':
                return <PracticeSection sectionData={section} onAnswer={handleAnswer} userAnswers={userAnswers} />;
            case 'summary':
                return <SummarySection sectionData={section} />;
            default:
                return <div>Loại nội dung không hỗ trợ</div>;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Space Background */}
            <SpaceBackground />
            
            {/* Navbar */}
            <AuthenticatedNavbar onLogout={handleLogout} />
            
            {/* Main Content */}
            <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <button 
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" />
                            <span>Quay lại</span>
                        </button>
                        <h1 className="text-3xl font-bold text-white mb-2">{lessonData?.title}</h1>
                        <p className="text-gray-400">Khám phá và học hỏi qua từng bước một</p>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Bước {currentSection + 1}</span>
                            <span>{lessonData.sections.length} phần</span>
                        </div>
                        <div className="bg-gray-800 rounded-full h-2">
                            <motion.div 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentSection + 1) / lessonData.sections.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>

                    {/* Section Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderSection()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePrevSection}
                            disabled={currentSection === 0}
                            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                                currentSection === 0 
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                        >
                            <FaArrowLeft className="mr-2" />
                            Trước
                        </button>
                        
                        {currentSection < lessonData.sections.length - 1 ? (
                            <button
                                onClick={handleNextSection}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
                            >
                                Tiếp theo
                                <FaArrowRight className="ml-2" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    toast.success("🎉 Bạn đã hoàn thành bài học!");
                                    navigate('/student-home');
                                }}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-colors"
                            >
                                Hoàn thành
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;