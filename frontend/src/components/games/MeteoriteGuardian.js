import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const ICON_IMAGES = [
  'https://i.imgur.com/9Jt2Y5A.png',
  'https://i.imgur.com/lJ4c4d5.png',
  'https://i.imgur.com/S5i1sJc.png',
  'https://i.imgur.com/d3a9p6g.png',
  'https://i.imgur.com/O3G0g2X.png',
  'https://i.imgur.com/e5wT9dZ.png',
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

const MeteoriteGuardian = ({ onBack, onComplete }) => {
  const [gameState, setGameState] = useState('menu'); // 'menu'|'playing'|'gameOver'
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState(null);
  const [meteors, setMeteors] = useState([]);
  const [level, setLevel] = useState(1);

  const startedRef = useRef(false);     // biết game đã start chưa (để tránh effect chạy lúc mount)
  const prevLivesRef = useRef(lives);   // để dò thay đổi lives (chỉ act khi giảm)
  const timeoutRef = useRef(null);      // để clear timeout meteor

  // Tạo câu hỏi dựa trên cấp (không đọc `level` nội bộ — truyền vào)
  const generateQuestion = useCallback((currentLevel) => {
    const num1 = Math.floor(Math.random() * (currentLevel * 5)) + currentLevel;
    const num2 = Math.floor(Math.random() * 9) + 2;
    return { text: `${num1} × ${num2}`, answer: num1 * num2 };
  }, []);

  // 50 điểm = 1 sao, tối đa 3 sao
  const calculateStars = (finalScore) => Math.floor(finalScore / 1);

  // Tạo meteors dùng level được truyền
  const createMeteors = useCallback((correctAnswer, lvl) => {
    let answers = new Set([correctAnswer]);
    while (answers.size < 4) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (wrongAnswer !== correctAnswer && wrongAnswer > 0) answers.add(wrongAnswer);
    }

    const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);
    const newMeteors = shuffledAnswers.map((ans, i) => {
      const randomImage = ICON_IMAGES[Math.floor(Math.random() * ICON_IMAGES.length)];
      // animationDuration giảm khi level tăng (trò khó dần)
      const animationDuration = Math.max(1.2, Math.random() * 2 + (5 - lvl * 0.5));
      return {
        id: `meteor-${Date.now()}-${i}`,
        value: ans,
        left: `${10 + i * 22}%`,
        isCorrect: ans === correctAnswer,
        animationDuration,
        imageUrl: randomImage,
      };
    });

    // set meteors (thay đổi sẽ kích hoạt timeout effect)
    setMeteors(newMeteors);
  }, []);

  // Hàm chuyển vòng chơi (tạo câu + meteors) dùng luôn khi event (click, level up, mất mạng)
  const nextRound = useCallback((lvl) => {
    const currentLevel = typeof lvl === 'number' ? lvl : level;
    const q = generateQuestion(currentLevel);
    setQuestion(q);
    createMeteors(q.answer, currentLevel);
  }, [generateQuestion, createMeteors, level]);

  // Start game
  const startGame = useCallback(() => {
    startedRef.current = true;
    prevLivesRef.current = 3;
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameState('playing');
    nextRound(1);
  }, [nextRound]);

  // Khi người chơi bắn 1 meteor
  const handleMeteorClick = (meteor) => {
    if (gameState !== 'playing') return;

    if (meteor.isCorrect) {
      // đúng → tăng điểm
      const newScore = score + 10;
      setScore(newScore);

      // Nếu đạt mốc 50 * k → lên cấp (handled here so toast & nextRound đồng bộ)
      if (newScore % 50 === 0) {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        toast.success(`🎉 Lên cấp ${nextLevel}!`);
        nextRound(nextLevel);
      } else {
        // qua câu tiếp theo ở cùng level
        nextRound(level);
      }
    } else {
      // sai → mất mạng (event handler, an toàn gọi setState)
      setLives(prev => Math.max(prev - 1, 0));
    }
  };

  // Effect: khi meteors thay đổi, đặt timeout để giảm mạng nếu không bắn kịp
  useEffect(() => {
    // clear previous
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (gameState !== 'playing' || meteors.length === 0) return;

    const correctMeteor = meteors.find(m => m.isCorrect);
    if (!correctMeteor) return;

    // đặt timeout giảm lives sau animationDuration giây
    timeoutRef.current = setTimeout(() => {
      // giảm lives; lives effect sẽ xử lý tiếp (toast / nextRound / gameOver)
      setLives(prev => Math.max(prev - 1, 0));
    }, correctMeteor.animationDuration * 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [meteors, gameState]);

  // Effect: theo dõi lives thay đổi — chỉ react khi lives giảm (tránh chạy lúc mount)
  useEffect(() => {
    if (!startedRef.current) {
      prevLivesRef.current = lives;
      return;
    }

    if (lives < prevLivesRef.current) {
      // mất mạng
      if (lives <= 0) {
        // hết mạng -> kết thúc
        setGameState('gameOver');
      } else {
        // mất 1 mạng nhưng chưa hết -> báo & next round
        toast.error('Bạn đã bỏ lỡ đáp án đúng!');
        nextRound(level);
      }
    }

    prevLivesRef.current = lives;
  }, [lives, level, nextRound]);

  // Khi component unmount, clear timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Lưu kết quả: tính sao tại thời điểm bấm nút và gọi onComplete
  const handleSaveResult = () => {
  const stars = calculateStars(score); // tính lại ngay thời điểm lưu
  console.log("Saving result with stars:", stars);
  onComplete?.(1, stars);
};

  return (
    <>
      <MeteoriteGuardianStyles />
      {gameState === 'menu' && (
        <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Vệ Binh Thiên Thạch ☄️</h2>
          <p className="mb-6">Bảo vệ hành tinh bằng cách bắn hạ các thiên thạch có đáp án đúng!</p>
          <div className="space-x-4">
            <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
            <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Bắt đầu</button>
          </div>
        </div>
      )}

      {gameState !== 'menu' && (
        <div className="relative w-full max-w-4xl h-[600px] game-container-meteorite border-2 border-purple-500 overflow-hidden rounded-lg mx-auto">
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-20">
              <h2 className="text-5xl font-bold mb-4 text-white">Kết thúc!</h2>
              <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
              <p className="text-3xl mb-6 text-white">⭐ Sao: <span className="text-yellow-300">{calculateStars(score)}</span></p>
              <div className="space-x-4">
                <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                <button onClick={handleSaveResult} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">Lưu kết quả</button>
                <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">Chơi lại</button>
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
              <span className="text-gray-200" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.9)' }}>{meteor.value}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeteoriteGuardian;
