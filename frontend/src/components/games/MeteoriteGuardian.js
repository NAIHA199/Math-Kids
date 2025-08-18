import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

// Các hằng số và component style chỉ dành riêng cho game này
const ICON_IMAGES = [
    'https://i.imgur.com/9Jt2Y5A.png', // Hành tinh
    'https://i.imgur.com/lJ4c4d5.png', // Sao chóng mặt
    'https://i.imgur.com/S5i1sJc.png', // Ngôi sao
    'https://i.imgur.com/d3a9p6g.png', // Sao lấp lánh
    'https://i.imgur.com/O3G0g2X.png', // Tia sáng
    'https://i.imgur.com/e5wT9dZ.png', // Sấm sét
];

const MeteoriteGuardianStyles = () => (
    <style>{`
      .game-container-meteorite {
        background: #0a0a1f;
        background-image: 
          radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
        background-size: 40px 40px;
      }
      @keyframes fall {
          0% { top: -100px; transform: rotate(0deg); }
          100% { top: 100%; transform: rotate(360deg); }
      }
    `}</style>
);

// Component chính của game
const MeteoriteGuardian = ({ onBack }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [question, setQuestion] = useState(null);
    const [meteors, setMeteors] = useState([]);
    const [level, setLevel] = useState(1);

    const generateQuestion = useCallback(() => {
        const num1 = Math.floor(Math.random() * (level * 5)) + level;
        const num2 = Math.floor(Math.random() * 9) + 2;
        return { text: `${num1} × ${num2}`, answer: num1 * num2 };
    }, [level]);

    const createMeteors = useCallback((correctAnswer) => {
        let answers = new Set([correctAnswer]);
        while (answers.size < 4) {
            const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
            if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
                answers.add(wrongAnswer);
            }
        }

        const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);

        const newMeteors = shuffledAnswers.map((ans, i) => {
            const randomImage = ICON_IMAGES[Math.floor(Math.random() * ICON_IMAGES.length)];
            return {
                id: `meteor-${Date.now()}-${i}`,
                value: ans,
                left: `${10 + i * 22}%`,
                isCorrect: ans === correctAnswer,
                animationDuration: Math.random() * 2 + (5 - level * 0.5),
                imageUrl: randomImage,
            };
        });
        setMeteors(newMeteors);
    }, [level]);

    const startGame = useCallback(() => {
        setScore(0);
        setLevel(1);
        setLives(3);
        const newQuestion = generateQuestion();
        setQuestion(newQuestion);
        createMeteors(newQuestion.answer);
        setGameState('playing');
    }, [generateQuestion, createMeteors]);
    
    useEffect(() => {
        if (gameState !== 'playing' || !meteors.length) {
            return;
        }

        const correctMeteor = meteors.find(m => m.isCorrect);
        if (!correctMeteor) return;

        const timerId = setTimeout(() => {
            setLives(prevLives => {
                if (prevLives > 0 && gameState === 'playing') {
                    toast.error('Bạn đã bỏ lỡ đáp án đúng!');
                    const newLives = prevLives - 1;
                    if (newLives <= 0) {
                        setGameState('gameOver');
                    } else {
                        const newQuestion = generateQuestion();
                        setQuestion(newQuestion);
                        createMeteors(newQuestion.answer);
                    }
                    return newLives;
                }
                return prevLives;
            });
        }, correctMeteor.animationDuration * 1000);

        return () => clearTimeout(timerId);
    }, [meteors, gameState, generateQuestion, createMeteors]);


    const handleMeteorClick = useCallback((meteor) => {
        if (gameState !== 'playing') return;

        if (meteor.isCorrect) {
            toast.success('+10 điểm!');
            setScore(prevScore => {
                const newScore = prevScore + 10;
                if (newScore > 0 && newScore % 50 === 0) {
                    setLevel(prevLevel => {
                        toast.success(`🎉 Lên cấp ${prevLevel + 1}!`);
                        return prevLevel + 1;
                    });
                }
                return newScore;
            });

            const newQuestion = generateQuestion();
            setQuestion(newQuestion);
            createMeteors(newQuestion.answer);
        } else {
            toast.error('Sai rồi!');
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                    setGameState('gameOver');
                }
                return newLives;
            });
        }
    }, [gameState, createMeteors, generateQuestion]);

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Vệ Binh Thiên Thạch ☄️</h2>
                <p className="mb-6">Bảo vệ hành tinh bằng cách bắn hạ các thiên thạch có đáp án đúng!</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <MeteoriteGuardianStyles />
            <div className="relative w-full max-w-4xl h-[600px] game-container-meteorite border-2 border-purple-500 overflow-hidden rounded-lg mx-auto">
                {gameState === 'gameOver' && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-20">
                        <h2 className="text-5xl font-bold mb-4 text-white">Kết thúc!</h2>
                        <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
                        <div className="space-x-4">
                            <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                            <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
                        </div>
                    </div>
                )}
                
                <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
                    <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
                    <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
                    <div className="text-2xl font-bold">Mạng: <span className="text-red-500 text-3xl">{'♥'.repeat(lives)}</span></div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-purple-800 p-4 rounded-lg text-4xl font-bold z-10 shadow-lg">
                    {question?.text} = ?
                </div>
                
                {meteors.map(meteor => (
                    <div
                        key={meteor.id}
                        onClick={() => handleMeteorClick(meteor)}
                        className="absolute flex items-center justify-center w-24 h-24 bg-contain bg-no-repeat bg-center cursor-pointer text-white text-3xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        style={{ 
                            backgroundImage: `url("${meteor.imageUrl}")`, 
                            left: meteor.left,
                            animation: `fall ${meteor.animationDuration}s linear`,
                            animationPlayState: gameState === 'playing' ? 'running' : 'paused'
                        }}
                    >
                        <span 
                            className="text-gray-200" 
                            style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.9)' }}
                        >
                            {meteor.value}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MeteoriteGuardian;
