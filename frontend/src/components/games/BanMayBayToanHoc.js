import React, { useState, useEffect, useCallback,useRef } from 'react';
import { toast } from 'react-toastify'; 

const SpaceShooterStyles = () => (
    <style>{`
      .game-container-shooter {
        background: #0a0a1f;
        background-image: 
          radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
        background-size: 40px 40px;
        cursor: none; /* Ẩn con trỏ chuột trong khu vực game */
      }
      .player-ship {
        transition: left 0.1s linear;
        text-shadow: 0 0 15px #0ff;
      }
      .enemy-ship {
        transition: transform 0.2s ease-in-out;
      }
      .enemy-ship:hover {
        transform: scale(1.1);
      }
    `}</style>
);

const BanMayBayToanHoc = ({ game, onBack, onComplete }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'victory', 'gameOver'
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(5);
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState(null);
    const [starsEarned, setStarsEarned] = useState(0);
    // State cho gameplay mới
    const [playerPos, setPlayerPos] = useState({ x: 400, y: 520 });
    const [enemies, setEnemies] = useState([]);
    const [projectiles, setProjectiles] = useState([]);

    // useRef để lưu vị trí tàu, giúp event listener luôn có giá trị mới nhất
    const playerPosRef = useRef(playerPos);
    useEffect(() => {
        playerPosRef.current = playerPos;
    }, [playerPos]);

    // useRef để game loop luôn có state mới nhất
    const stateRef = useRef();
    useEffect(() => {
        stateRef.current = { enemies, projectiles, level, score, lives, question };
    });
    /* hàm này lưu kết quả lại sau mỗi lần chơi xong để tạo lịch sử chơi game 
    const saveGameResult = async (score, stars) => {
        try {
            const res = await fetch("http://localhost:8000/api/games/4/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    score: score,
                    stars: stars,
                }),
            });

            const data = await res.json();
            console.log("Saved game completion:", data);
        } catch (err) {
            console.error("Error saving game result:", err);
        }
    };*/

  

    const generateQuestionForLevel = useCallback((currentLevel) => {
        let num1, num2, op, text, answer;

        if (currentLevel <= 5) { // Lớp 1
            op = Math.random() < 0.5 ? '+' : '-';
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            if (op === '-' && num1 < num2) [num1, num2] = [num2, num1];
            text = `${num1} ${op} ${num2}`;
            answer = op === '+' ? num1 + num2 : num1 - num2;
        } else if (currentLevel <= 10) { // Lớp 2
            op = Math.random() < 0.5 ? '+' : '-';
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 50) + 10;
            if (op === '-' && num1 < num2) [num1, num2] = [num2, num1];
            text = `${num1} ${op} ${num2}`;
            answer = op === '+' ? num1 + num2 : num1 - num2;
        } else { // Lớp 3-5
            op = Math.random() < 0.5 ? '×' : '÷';
            num2 = Math.floor(Math.random() * 9) + 2;
            answer = Math.floor(Math.random() * 9) + 2;
            num1 = num2 * answer;
            if (op === '×') {
                // SỬA LỖI: Chỉ gán lại num1, tránh gán num2 cho chính nó
                num1 = answer;
                text = `${num1} × ${num2}`;
                answer = num1 * num2;
            } else {
                text = `${num1} ÷ ${num2}`;
            }
        }
        
        setQuestion({ text, answer });
        
        // Tạo kẻ địch mang đáp án
        let answerOptions = new Set([answer]);
        while (answerOptions.size < 4) {
            const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
            if (wrongAnswer !== answer && wrongAnswer >= 0) {
                answerOptions.add(wrongAnswer);
            }
        }
        
        const shuffledAnswers = Array.from(answerOptions).sort(() => Math.random() - 0.5);
        const newEnemies = shuffledAnswers.map((ans, i) => ({
            id: `enemy-${Date.now()}-${i}`,
            value: ans,
            x: 100 + i * 200,
            y: -50,
            isCorrect: ans === answer,
        }));
        setEnemies(newEnemies);
    }, []);

    const startGame = useCallback(() => {
        setLevel(1);
        setLives(5);
        setScore(0);
        setStarsEarned(0);
        setPlayerPos({ x: 400, y: 520 });
        setProjectiles([]);
        generateQuestionForLevel(1);
        setGameState('playing');
    }, [generateQuestionForLevel]);

    // Điều khiển tàu
    useEffect(() => {
        if (gameState !== 'playing') return;
        const handleKeyDown = (e) => {
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                setPlayerPos(p => ({ ...p, x: Math.max(20, p.x - 20) }));
            } else if (e.key === 'ArrowRight') {
                setPlayerPos(p => ({ ...p, x: Math.min(896 - 70, p.x + 20) }));
            } else if (e.key === ' ') {
                const currentPos = playerPosRef.current;
                setProjectiles(p => [...p, { id: Date.now(), x: currentPos.x + 25, y: currentPos.y }]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // Game Loop chính
    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = setInterval(() => {
            // Di chuyển đạn
            setProjectiles(prev => prev.map(p => ({ ...p, y: p.y - 15 })).filter(p => p.y > -20));

            // Di chuyển kẻ địch và xử lý khi xuống đáy
            setEnemies(prevEnemies => prevEnemies.map(e => ({ ...e, y: e.y + 1 })).filter(e => {
                if (e.y > 600) {
                    if (e.isCorrect) {
                        toast.error("Bỏ lỡ đáp án đúng!");
                        setLives(l => {
                            const newLives = l - 1;
                            if (newLives <= 0) {
                                setGameState('gameOver');
                                onComplete?.(4, starsEarned);
                            }
                            return newLives;
                        });
                    }
                    return false;
                }
                return true;
            }));

            // Kiểm tra va chạm
            const { enemies, projectiles } = stateRef.current;
            let hitEnemy = null;
            let hitProjectile = null;

            for (const p of projectiles) {
                for (const e of enemies) {
                    if (Math.abs(p.x - (e.x + 32)) < 32 && Math.abs(p.y - (e.y + 32)) < 32) {
                        hitEnemy = e;
                        hitProjectile = p;
                        break;
                    }
                }
                if (hitEnemy) break;
            }
            
            if (hitEnemy) {
                setProjectiles(prev => prev.filter(p => p.id !== hitProjectile.id));
                setEnemies(prev => prev.filter(e => e.id !== hitEnemy.id));

                if (hitEnemy.isCorrect) {
                    toast.success('Chính xác!');
                    setStarsEarned(prevStars => prevStars + 1);
                   
                    setLevel(l => {
                            const newLevel = l + 1;
                            if (newLevel > 20) {
                                setGameState('victory');
                                onComplete?.(4, starsEarned + 1);
                            } else {
                                generateQuestionForLevel(newLevel);
                            }
                            return newLevel;
                    });
                   
                } else {
                    toast.error('Sai rồi!');
                    setLives(l => {
                        const newLives = l - 1;
                        if (newLives <= 0)  {
                            setGameState('gameOver');
                            onComplete?.(4, starsEarned); // Lưu kết quả với 1 sao khi thua
                        }

                        return newLives;
                    });
                }
            }
        }, 50);

        return () => clearInterval(gameLoop);
    }, [gameState, generateQuestionForLevel]);

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Bắn Máy Bay Toán Học 🛸</h2>
                <p className="mb-6">Điều khiển phi thuyền, bắn hạ các mục tiêu mang đáp án đúng.</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Bắt đầu</button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'victory' || gameState === 'gameOver') {
        return (
           <div className="relative w-full max-w-4xl h-[600px] game-container-shooter border-2 border-purple-500 rounded-lg mx-auto flex justify-center items-center">
               <SpaceShooterStyles />
               <div className="text-center text-white z-10 p-8 bg-black/70 rounded-lg">
                   <h2 className="text-5xl font-bold mb-4">{gameState === 'victory' ? '🎉 BẠN ĐÃ THẮNG! 🎉' : 'THUA CUỘC!'}</h2>
                   <p className="text-3xl mb-6">Số sao nhận được: <span className="text-yellow-400">{starsEarned}</span></p>
                   <div className="space-x-4">
                       <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                       <button onClick={() => setStarsEarned(prev => {onComplete(4, prev); return prev})} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Lưu kết quả</button>
                       <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Chơi lại</button>
                   </div>
               </div>
           </div>
       );
    }

    return (
        <div className="relative w-full max-w-4xl h-[600px] game-container-shooter border-2 border-purple-500 overflow-hidden rounded-lg mx-auto p-4 flex flex-col items-center">
            <SpaceShooterStyles />
            {/* Header */}
            <div className="w-full text-white flex justify-between items-center z-10">
                <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
                <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
                <div className="text-2xl font-bold">Mạng: <span className="text-red-500 text-3xl">{'♥'.repeat(lives)}</span></div>
            </div>

            {/* Câu hỏi */}
            <div className="absolute top-16 w-full text-center z-10">
                <p className="text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{question?.text} = ?</p>
            </div>

            {/* Vùng chơi game */}
            <div className="absolute inset-0">
                {/* Tàu người chơi */}
                <div className="player-ship absolute text-5xl" style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px` }}>🛸</div>

                {/* Kẻ địch */}
                {enemies.map(e => (
                    <div key={e.id} className="enemy-ship absolute w-16 h-16 bg-contain bg-no-repeat bg-center flex items-center justify-center text-3xl font-bold text-white"
                         style={{ left: `${e.x}px`, top: `${e.y}px`, backgroundImage: 'url(https://i.imgur.com/sC26amC.png)', textShadow: '1px 1px 5px #000' }}>
                        {e.value}
                    </div>
                ))}

                {/* Đạn */}
                {projectiles.map(p => (
                    <div key={p.id} className="absolute w-2 h-4 bg-cyan-300 rounded" style={{ left: `${p.x}px`, top: `${p.y}px`, boxShadow: '0 0 10px #0ff' }}></div>
                ))}
            </div>
        </div>
    );
};
export default BanMayBayToanHoc;