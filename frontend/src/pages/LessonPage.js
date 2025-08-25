import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// =================================================================================
// CÁC COMPONENT MOCK & ICON (Để khắc phục lỗi import)
// =================================================================================

// Icons (thay thế cho thư viện react-icons)
const FaArrowLeft = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>;
const FaArrowRight = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>;
const FaSpinner = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>;

// Mock Components
const AuthenticatedNavbar = ({ user }) => {
    return <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 text-gray-800">Đây là Navbar (Role: {user.role})</nav>;
};

// =================================================================================
// CÁC COMPONENT BÀI TẬP MỚI
// =================================================================================
const ExerciseWrapper = ({ title, instructions, children, onComplete }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{instructions}</p>
        <div className="space-y-4">{children}</div>
        <div className="text-center mt-8">
            <button onClick={onComplete} className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
                Hoàn thành
            </button>
        </div>
    </div>
);

const FillInTheBlankSection = ({ sectionData, onComplete }) => (
    <ExerciseWrapper title="Điền vào chỗ trống" instructions={sectionData.instructions} onComplete={onComplete}>
        {sectionData.questions.map((q, index) => (
            <div key={index} className="flex items-center gap-2">
                <span className="font-mono">{q.sentence.replace('__', '')}</span>
                <input type="text" className="w-16 text-center border-b-2 border-gray-300 focus:border-purple-500 outline-none" />
            </div>
        ))}
    </ExerciseWrapper>
);

const DragDropSection = ({ sectionData, onComplete }) => (
     <ExerciseWrapper title="Kéo thả" instructions={sectionData.instructions} onComplete={onComplete}>
        {sectionData.questions.map((q, index) => (
            <div key={index}>
                <p className="font-mono mb-2">{q.sentence.replace('__', ' [___] ')}</p>
                <div className="flex gap-2">
                    {q.options.map(opt => <div key={opt} className="bg-gray-200 px-3 py-1 rounded-md cursor-pointer">{opt}</div>)}
                </div>
            </div>
        ))}
    </ExerciseWrapper>
);

const MatchingSection = ({ sectionData, onComplete }) => (
    <ExerciseWrapper title="Nối cặp" instructions={sectionData.instructions} onComplete={onComplete}>
        <div className="flex justify-around">
            <div className="space-y-2">{sectionData.pairs.map(p => <div key={p.left} className="bg-blue-100 p-2 rounded">{p.left}</div>)}</div>
            <div className="space-y-2">{sectionData.pairs.map(p => <div key={p.right} className="bg-green-100 p-2 rounded">{p.right}</div>)}</div>
        </div>
    </ExerciseWrapper>
);

const FindWrongSection = ({ sectionData, onComplete }) => (
    <ExerciseWrapper title="Tìm đáp án sai" instructions={sectionData.instructions} onComplete={onComplete}>
        {sectionData.questions.map((q, index) => (
            <div key={index} className="grid grid-cols-2 gap-3">
                {q.choices.map(choice => (
                    <button key={choice} className="p-3 rounded-lg border-2 text-left transition-all bg-gray-100 border-gray-200 hover:bg-purple-100 hover:border-purple-300">
                        {choice}
                    </button>
                ))}
            </div>
        ))}
    </ExerciseWrapper>
);

// =================================================================================
// CƠ SỞ DỮ LIỆU GIẢ LẬP (MOCK DATABASE)
// =================================================================================
const mockDatabase = {
    lessons: {
      1: [ { id: 1, title: "Số đếm từ 1 đến 10", description: "Học đếm số và nhận biết các con số", icon: "🔢", exercises: 5 }, { id: 2, title: "Phép cộng đơn giản", description: "Cộng các số trong phạm vi 10", icon: "➕", exercises: 8 }, { id: 3, title: "Phép trừ đơn giản", description: "Trừ các số trong phạm vi 10", icon: "➖", exercises: 6 }, { id: 4, title: "Hình học cơ bản", description: "Nhận biết các hình dạng cơ bản", icon: "🔷", exercises: 4 }, { id: 5, title: "So sánh số", description: "Lớn hơn, nhỏ hơn, bằng nhau", icon: "⚖️", exercises: 5 } ],
      2: [ { id: 6, title: "Số đếm từ 1 đến 100", description: "Học đếm và viết số đến 100", icon: "💯", exercises: 10 }, { id: 7, title: "Phép cộng có nhớ", description: "Cộng các số có tổng lớn hơn 10", icon: "➕", exercises: 12 }, { id: 8, title: "Phép trừ có nhớ", description: "Trừ các số lớn hơn 10", icon: "➖", exercises: 10 }, { id: 9, title: "Bảng cửu chương 2, 5", description: "Học thuộc bảng nhân 2 và 5", icon: "✖️", exercises: 8 }, { id: 10, title: "Đo lường cơ bản", description: "Đo độ dài, khối lượng đơn giản", icon: "📏", exercises: 6 } ],
    },
    lessonDetails: {
        '1': { // === THÊM DỮ LIỆU MẪU CHO BÀI HỌC ID 1 ===
            exercises: [
                { id: 'ex1-1', exerciseType: 'matching', instructions: 'Nối số với cách đọc đúng:', pairs: [ { left: '1', right: 'Một' }, { left: '2', right: 'Hai' }, { left: '3', right: 'Ba' }, { left: '4', right: 'Bốn' } ] },
                { id: 'ex1-2', exerciseType: 'fill-in-the-blank', instructions: 'Điền số còn thiếu vào dãy số:', questions: [ { sentence: '1, 2, __, 4, 5', correctAnswer: '3' } ] },
            ]
        },
        '2': { // === DỮ LIỆU TỪ FILE ExcerciseSeeder.php ĐÃ ĐƯỢC CẬP NHẬT VÀO ĐÂY ===
            exercises: [
                { id: 'ex2-1', exerciseType: 'fill-in-the-blank', instructions: 'Điền kết quả đúng vào ô trống:', questions: [ { sentence: '3 + 4 = __', correctAnswer: '7' }, { sentence: '6 + 2 = __', correctAnswer: '8' }, { sentence: '5 + 5 = __', correctAnswer: '10' }, { sentence: '7 + 1 = __', correctAnswer: '8' } ] },
                { id: 'ex2-2', exerciseType: 'drag-drop', instructions: 'Kéo thả đáp án đúng vào ô trống:', questions: [ { sentence: '2 + 5 = __', options: ['6', '7', '8'], correctAnswer: '7' }, { sentence: '4 + 3 = __', options: ['6', '7', '9'], correctAnswer: '7' }, { sentence: '9 + 0 = __', options: ['9', '10', '8'], correctAnswer: '9' } ] },
                { id: 'ex2-3', exerciseType: 'matching', instructions: 'Nối phép tính ở cột A với đáp án ở cột B:', pairs: [ { left: '2 + 3', right: '5' }, { left: '4 + 4', right: '8' }, { left: '1 + 6', right: '7' }, { left: '5 + 2', right: '7' } ] },
                { id: 'ex2-4', exerciseType: 'find-wrong', instructions: 'Trong các phép tính sau, hãy chọn phép tính sai:', questions: [ { choices: ['2 + 2 = 4', '3 + 5 = 9', '6 + 1 = 7', '4 + 4 = 8'], wrongAnswer: '3 + 5 = 9' }, { choices: ['1 + 3 = 4', '7 + 2 = 10', '5 + 5 = 10', '6 + 0 = 6'], wrongAnswer: '7 + 2 = 10' } ] }
            ],
            summary: { type: 'result-summary', title: 'Kết quả & Nhận xét', feedback: [ { range: '90-100%', message: 'Xuất sắc! 👏 Con đã làm đúng gần như tất cả!' }, { range: '70-89%', message: 'Rất tốt! 👍 Con chỉ cần ôn lại một chút thôi.' }, { range: '50-69%', message: 'Cũng ổn, nhưng con nên luyện tập thêm nhé 💪' }, { range: '0-49%', message: 'Không sao đâu, hãy xem lại bài giảng và thử lại nha 🌱' } ] }
        },
        '5': { 
            exercises: [
                { id: 'ex5-1', exerciseType: 'find-wrong', title: 'Chọn đáp án đúng', questions: [ { choices: ['3 > 5', '5 > 2', '2 > 1', '1 > 3'], wrongAnswer: '3 > 5' } ] }
            ]
        }
    }
};

// =================================================================================
// COMPONENT CHÍNH: LessonPage
// =================================================================================

const LessonPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();

    const [lessonData, setLessonData] = React.useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
    const [completedExercises, setCompletedExercises] = React.useState(new Set());
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchLessonData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const allLessons = Object.values(mockDatabase.lessons).flat();
                const lessonInfo = allLessons.find(l => l.id.toString() === lessonId);
                const lessonDetails = mockDatabase.lessonDetails[lessonId];

                if (!lessonInfo || !lessonDetails) {
                    throw new Error('Không tìm thấy bài học hoặc bài học chưa có nội dung.');
                }

                const fullLessonData = {
                    ...lessonInfo,
                    exercises: lessonDetails.exercises, // Dùng 'exercises' thay vì 'sections'
                };
                
                setLessonData(fullLessonData);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLessonData();
    }, [lessonId]);

    const handleExerciseComplete = () => {
        toast.info(`Hoàn thành phần ${currentExerciseIndex + 1}!`);
        handleNextExercise();
    };

    const renderCurrentExercise = () => {
        if (!lessonData || !lessonData.exercises) return null;
        const exercise = lessonData.exercises[currentExerciseIndex];
        
        // === LOGIC RENDER ĐÃ ĐƯỢC CẬP NHẬT ĐỂ HIỂN THỊ CÁC LOẠI BÀI TẬP MỚI ===
        switch (exercise.exerciseType) {
            case 'fill-in-the-blank': return <FillInTheBlankSection sectionData={exercise} onComplete={handleExerciseComplete} />;
            case 'drag-drop': return <DragDropSection sectionData={exercise} onComplete={handleExerciseComplete} />;
            case 'matching': return <MatchingSection sectionData={exercise} onComplete={handleExerciseComplete} />;
            case 'find-wrong': return <FindWrongSection sectionData={exercise} onComplete={handleExerciseComplete} />;
            default: return <div className="bg-white rounded-2xl p-6 shadow-lg">Loại bài tập không xác định: {exercise.exerciseType}</div>;
        }
    };

    const handleNextExercise = () => {
        const newCompleted = new Set(completedExercises).add(currentExerciseIndex);
        setCompletedExercises(newCompleted);

        if (currentExerciseIndex < lessonData.exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            toast.success('Chúc mừng! Bạn đã hoàn thành tất cả bài tập! 🎉');
            navigate(`/dashboard`); 
        }
    };

    const handlePrevExercise = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center"><FaSpinner className="animate-spin text-purple-600 text-4xl" /></div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi</h2>
                <p className="text-gray-700 mb-6">{error}</p>
                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">Quay lại</button>
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{lessonData?.title}</h1>
                </div>

                <div className="flex items-center gap-2 mb-8">
                    {lessonData?.exercises?.map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-2 rounded-full transition-colors duration-500 ${
                                completedExercises.has(index) || index < currentExerciseIndex
                                    ? 'bg-green-500'
                                    : index === currentExerciseIndex
                                    ? 'bg-purple-500'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentExerciseIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderCurrentExercise()}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handlePrevExercise}
                        disabled={currentExerciseIndex === 0}
                        className="flex items-center px-5 py-3 rounded-lg font-semibold text-gray-700 bg-white shadow-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                        <FaArrowLeft className="mr-2" />
                        Trước
                    </button>
                    {/* Nút "Tiếp theo" bị ẩn vì mỗi bài tập có nút "Hoàn thành" riêng */}
                    <button
                        onClick={handleNextExercise}
                        className="flex items-center px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all invisible"
                    >
                        {currentExerciseIndex === lessonData?.exercises?.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                        <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
