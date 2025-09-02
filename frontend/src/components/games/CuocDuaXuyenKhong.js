import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

// Component style cho game
const GameStyles = () => (
  <style>{`
    .game-container-race {
      background: #0a0a1f;
      background-image: 
        radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .spaceship-race {
      transition: left 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Hiệu ứng nảy */
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff;
    }
    .feedback-correct {
      box-shadow: 0 0 25px 8px #4ade80; /* green-400 */
    }
    .feedback-incorrect {
      box-shadow: 0 0 25px 8px #f87171; /* red-400 */
      animation: shake 0.5s;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `}</style>
);

// Component chính của game
const CuocDuaXuyenKhong = ({ onBack, onComplete }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'levelComplete', 'gameOver'
    const [score, setScore] = useState(0);
    const [playerPosition, setPlayerPosition] = useState(0);
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [lives, setLives] = useState(3);

    // 🔥 Hàm tính số sao dựa trên điểm
    const calculateStars = (finalScore) => {
        return Math.min(3, Math.floor(finalScore / 50));
    };

    const handleGameOver = () => {
        setGameState('gameOver');
        const stars = calculateStars(score);
        onComplete?.(2, stars); // 👈 gameId = 5
    };
    const handleVictory = () => {
        setGameState('gameOver');
        const stars = calculateStars(score);
        onComplete?.(2, stars);
    };

    // Khi trả lời sai hết mạng → game over
    const handleAnswerClick = (answer) => {
        if (gameState !== 'playing') return;

        if (answer === question.answer) {
            setFeedback('correct');
            setPlayerPosition(prev => Math.min(prev + 15, 100));
            setScore(prevScore => prevScore + 10);
            setTimeout(prepareNewRound, 400);
        } else {
            setFeedback('incorrect');
            toast.error('Sai rồi, -1 mạng!', { icon: '💔' });
            setLives(prevLives => {
                const newLives = prevLives - 1;
                if (newLives <= 0) {
                    handleGameOver();
                }
                return newLives;
            });
        }

        setTimeout(() => setFeedback(''), 500);
    };

    // Khi đạt đến 1 mốc thắng cuối (ví dụ level 10 → thắng hẳn game)
    useEffect(() => {
        if (level > 10 && gameState === 'playing') {
            handleVictory();
        }
    }, [level, gameState]);


    const generateQuestion = useCallback((customLevel) => {
        const currentLevel = customLevel ?? level;
        const num1 = Math.floor(Math.random() * (currentLevel * 4)) + currentLevel;
        const num2 = Math.floor(Math.random() * 9) + 2;
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];

        let text = `${num1} ${op} ${num2}`;
        let answer;

        switch (op) {
            case '+': answer = num1 + num2; break;
            case '-':
                if (num1 < num2) {
                    [text, answer] = [`${num2} - ${num1}`, num2 - num1];
                } else {
                    answer = num1 - num2;
                }
                break;
            case '×': answer = num1 * num2; break;
            default: answer = num1 + num2;
        }
        return { text, answer };
    }, [level]);

    const prepareNewRound = useCallback((customLevel) => {
        const newQuestion = generateQuestion(customLevel ?? level);
        setQuestion(newQuestion);

        let answerOptions = new Set([newQuestion.answer]);
        while (answerOptions.size < 4) {
            const wrongAnswer = newQuestion.answer + Math.floor(Math.random() * 18) - 9;
            if (wrongAnswer !== newQuestion.answer && wrongAnswer >= 0) {
                answerOptions.add(wrongAnswer);
            }
        }
        setAnswers(Array.from(answerOptions).sort(() => Math.random() - 0.5));
    }, [generateQuestion]);

    const startGame = useCallback(() => {
        setScore(0);
        setLevel(1);
        setPlayerPosition(0);
        setLives(3);
        setGameState('playing');
        prepareNewRound();
    }, [prepareNewRound]);

    useEffect(() => {
        if (playerPosition >= 100 && gameState === 'playing') {
            setGameState('levelComplete');
            toast.success(`🎉 Hoàn thành Cấp độ ${level}!`, { autoClose: 2500 });

            setTimeout(() => {
                setLevel(prevLevel => {
                    const nextLevel = prevLevel + 1;
                    setPlayerPosition(0);
                    setScore(prevScore => prevScore + 100 * prevLevel);
                    prepareNewRound(nextLevel); // ✅ chuyền level mới
                    setGameState('playing');
                    return nextLevel;
                });
            }, 2500);
        }
    }, [playerPosition, gameState, level, prepareNewRound]);

   
    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Cuộc Đua Xuyên Không 🚀</h2>
                <p className="mb-6">Trả lời đúng để về đích. Hết mạng sẽ thua cuộc!</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <GameStyles />
            <div className={`relative w-full max-w-4xl h-[600px] game-container-race border-2 border-purple-500 overflow-hidden rounded-lg mx-auto transition-all duration-300 ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'incorrect' ? 'feedback-incorrect' : ''}`}>
                {gameState === 'gameOver' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-20">
                        <h2 className="text-6xl font-bold mb-4 text-white">Hết Lượt!</h2>
                        <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
                        <div className="space-x-4">
                            <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                            <button onClick={() => { const stars = calculateStars(score); onComplete?.(2,stars);}} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Lưu kết quả</button>
                            <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
                        </div>
                    </div>
                )}

                {[...Array(50)].map((_, i) => <div key={i} className="absolute bg-white rounded-full" style={{ width: `${Math.random()*2+1}px`, height: `${Math.random()*2+1}px`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random() }}></div>)}
                
                <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
                    <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
                    <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
                    <div className="text-2xl font-bold">Mạng: <span className="text-red-500 text-3xl">{'♥'.repeat(lives)}</span></div>
                </div>

                <div className="w-full h-full flex flex-col justify-center items-center space-y-12">
                    <div className="w-[90%] bg-white/10 h-8 rounded-full border-2 border-purple-400 p-1">
                        <div className="relative h-full">
                            <div className="absolute -top-6 -left-2 text-4xl spaceship-race" style={{ left: `${playerPosition}%`}}> 🛸 </div>
                            <div className="absolute -top-2 right-0 text-3xl">🏁</div>
                        </div>
                    </div>
                    {question && (gameState === 'playing' || gameState === 'levelComplete') && (
                        <div className="text-center">
                            <p className="text-5xl font-bold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{question.text} = ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {answers.map((ans, i) => (
                                    <button
                                      key={i}
                                      onClick={() => handleAnswerClick(ans)}
                                      disabled={gameState !== 'playing'}
                                      className="px-8 py-4 bg-purple-600 text-white text-3xl font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CuocDuaXuyenKhong;
