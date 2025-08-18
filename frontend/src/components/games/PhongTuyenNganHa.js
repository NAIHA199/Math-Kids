import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { toast } from 'react-toastify'; // Bỏ comment nếu bạn cần dùng toast

// Các hằng số cấu hình game
const GAME_CONFIG = {
    lives: 20,
    startingGold: 150,
    towerCost: 50,
    towerRange: 120,
    towerDamage: 10,
    towerFireRate: 800,
    gameScreenWidth: 896,
    gameScreenHeight: 600,
};

const PATH_WAYPOINTS = [
    { x: -50, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 450 },
    { x: 700, y: 450 }, { x: 700, y: 200 }, { x: GAME_CONFIG.gameScreenWidth + 50, y: 200 },
];

const ENEMY_TYPES = {
    standard: { health: 60, speed: 1.2, gold: 10, icon: '👽' },
    fast: { health: 30, speed: 2.5, gold: 8, icon: '👾' },
    tank: { health: 250, speed: 0.8, gold: 25, icon: '🤖' },
};

const WAVES = [
    { enemies: Array(8).fill('standard') },
    { enemies: [...Array(10).fill('standard'), ...Array(5).fill('fast')] },
    { enemies: [...Array(15).fill('standard'), { type: 'tank', delay: 5000 }] },
    { enemies: [...Array(10).fill('fast'), ...Array(10).fill('standard'), { type: 'tank', delay: 2000 }] },
    { enemies: [...Array(15).fill('fast'), ...Array(3).fill('tank')] },
    { enemies: [...Array(10).fill('standard'), ...Array(10).fill('fast'), ...Array(5).fill('tank')] },
];

// Component style
const TowerDefenseGameStyles = () => (
    <style>{`
      .game-container-td {
        background: #0a0a1f;
        background-image: 
          radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
        background-size: 40px 40px;
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>') 16 16, auto;
      }
      .tower-placement-mode {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="rgba(0, 255, 0, 0.5)" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>') 16 16, auto;
      }
    `}</style>
);

// Component chính của game
const PhongTuyenNganHa = ({ onBack }) => {
    // States của game
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver', 'victory'
    const [lives, setLives] = useState(GAME_CONFIG.lives);
    const [gold, setGold] = useState(GAME_CONFIG.startingGold);
    const [wave, setWave] = useState(0);
    const [towers, setTowers] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [projectiles, setProjectiles] = useState([]);
    const [isPlacingTower, setIsPlacingTower] = useState(false);
    
    // Refs để quản lý game loop và các timers
    const gameLoopRef = useRef();
    const lastFrameTimeRef = useRef();
    const towerFireTimers = useRef({});

    // Hàm bắt đầu game
    const startGame = useCallback(() => {
        setLives(GAME_CONFIG.lives);
        setGold(GAME_CONFIG.startingGold);
        setWave(0);
        setTowers([]);
        setEnemies([]);
        setProjectiles([]);
        setIsPlacingTower(false);
        setGameState('playing');
        // Bắt đầu đợt quái đầu tiên
        startNextWave(0);
    }, []);

    // Hàm bắt đầu đợt quái mới
    const startNextWave = (waveIndex) => {
        if (waveIndex >= WAVES.length) {
            setGameState('victory');
            return;
        }
        setWave(waveIndex);
        const waveData = WAVES[waveIndex];
        let enemyIdCounter = 0;
        let spawnDelay = 0;

        waveData.enemies.forEach((enemyInfo) => {
            const enemyType = typeof enemyInfo === 'string' ? enemyInfo : enemyInfo.type;
            const customDelay = typeof enemyInfo === 'object' ? enemyInfo.delay : 0;
            
            setTimeout(() => {
                const newEnemy = {
                    id: `enemy-${waveIndex}-${enemyIdCounter++}`,
                    ...ENEMY_TYPES[enemyType],
                    x: PATH_WAYPOINTS[0].x,
                    y: PATH_WAYPOINTS[0].y,
                    currentHealth: ENEMY_TYPES[enemyType].health,
                    pathIndex: 0,
                };
                setEnemies(prev => [...prev, newEnemy]);
            }, spawnDelay + customDelay);
            spawnDelay += 1000; // Khoảng cách giữa các quái
        });
    };
    
    // Game Loop chính
    const gameLoop = useCallback((timestamp) => {
        if (lastFrameTimeRef.current === undefined) {
            lastFrameTimeRef.current = timestamp;
        }
        // SỬA LỖI 1: Biến `deltaTime` không được sử dụng.
        // const deltaTime = timestamp - lastFrameTimeRef.current; 
        // Ghi chú: Biến này rất hữu ích để làm cho chuyển động mượt mà trên các máy tính có tốc độ khác nhau (frame-rate independent).
        // Tuy nhiên, vì logic hiện tại không dùng đến nó, ta sẽ tạm ẩn đi để sửa lỗi.
        lastFrameTimeRef.current = timestamp;

        if (gameState !== 'playing') return;

        // 1. Di chuyển quái vật
        let newEnemies = [];
        let livesLost = 0;
        let goldEarned = 0;

        enemies.forEach(enemy => {
            if (enemy.pathIndex >= PATH_WAYPOINTS.length - 1) {
                livesLost++;
                return; // Bỏ qua quái đã đi hết đường
            }

            const targetPoint = PATH_WAYPOINTS[enemy.pathIndex + 1];
            const dx = targetPoint.x - enemy.x;
            const dy = targetPoint.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemy.speed) {
                enemy.pathIndex++;
                enemy.x = targetPoint.x;
                enemy.y = targetPoint.y;
            } else {
                enemy.x += (dx / distance) * enemy.speed;
                enemy.y += (dy / distance) * enemy.speed;
            }

            if (enemy.currentHealth > 0) {
                newEnemies.push(enemy);
            } else {
                goldEarned += enemy.gold;
            }
        });

        if (livesLost > 0) setLives(prev => Math.max(0, prev - livesLost));
        if (goldEarned > 0) setGold(prev => prev + goldEarned);
        
        // 2. Tháp tấn công
        let newProjectiles = [...projectiles];
        towers.forEach(tower => {
            const now = Date.now();
            if (!towerFireTimers.current[tower.id] || now - towerFireTimers.current[tower.id] > GAME_CONFIG.towerFireRate) {
                const target = newEnemies.find(enemy => {
                    const dx = enemy.x - tower.x;
                    const dy = enemy.y - tower.y;
                    return Math.sqrt(dx * dx + dy * dy) < GAME_CONFIG.towerRange;
                });

                if (target) {
                    newProjectiles.push({
                        id: `proj-${now}-${Math.random()}`,
                        x: tower.x,
                        y: tower.y,
                        targetId: target.id,
                        speed: 5,
                    });
                    towerFireTimers.current[tower.id] = now;
                }
            }
        });
        
        // 3. Di chuyển và xử lý đạn
        newProjectiles = newProjectiles.filter(p => {
            const target = newEnemies.find(e => e.id === p.targetId);
            if (!target) return false;

            const dx = target.x - p.x;
            const dy = target.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < p.speed) {
                target.currentHealth -= GAME_CONFIG.towerDamage;
                return false; // Đạn trúng đích
            } else {
                p.x += (dx / distance) * p.speed;
                p.y += (dy / distance) * p.speed;
                return true; // Đạn tiếp tục bay
            }
        });

        setEnemies(newEnemies);
        setProjectiles(newProjectiles);

        // 4. Kiểm tra điều kiện thắng/thua/qua màn
        if (newEnemies.length === 0 && wave < WAVES.length && document.hidden === false) {
             // SỬA LỖI 2: Biến `totalEnemiesInWave` không được sử dụng.
             // const totalEnemiesInWave = WAVES[wave].enemies.length;
             
             // Logic qua màn có thể được cải thiện ở đây
             if (wave < WAVES.length - 1) {
                // startNextWave(wave + 1); // Logic gọi wave tiếp theo có thể được kích hoạt bằng nút bấm
             } else if (wave === WAVES.length - 1 && newEnemies.length === 0) {
                // setGameState('victory'); // Điều kiện thắng khi hết quái ở wave cuối
             }
        }
        if (lives <= 0) {
            setGameState('gameOver');
        }

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [enemies, projectiles, towers, gameState, lives, wave]);

    // Bắt đầu và dừng game loop
    useEffect(() => {
        if (gameState === 'playing') {
            lastFrameTimeRef.current = performance.now();
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameState, gameLoop]);

    // Xử lý click để đặt tháp
    const handleGameScreenClick = (e) => {
        if (!isPlacingTower) return;
        if (gold < GAME_CONFIG.towerCost) {
            // toast.warn('Không đủ vàng!');
            setIsPlacingTower(false);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setTowers(prev => [...prev, { id: `tower-${Date.now()}`, x, y }]);
        setGold(prev => prev - GAME_CONFIG.towerCost);
        setIsPlacingTower(false);
    };

    // Render menu
    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Phòng Tuyến Ngân Hà  defending️</h2>
                <p className="mb-6">Xây tháp để ngăn chặn các đợt tấn công của quái vật ngoài hành tinh!</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
                </div>
            </div>
        );
    }
    
    // Render màn hình game over/victory
    if (gameState === 'gameOver' || gameState === 'victory') {
         return (
            <div className="relative w-full max-w-4xl h-[600px] bg-black/80 flex flex-col justify-center items-center z-20 rounded-lg mx-auto">
                <h2 className="text-6xl font-bold mb-4 text-white">
                    {gameState === 'victory' ? 'Chiến Thắng! 🏆' : 'Thất Bại!'}
                </h2>
                <p className="text-3xl mb-6 text-white">Bạn đã qua được {wave} đợt.</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
                </div>
            </div>
        );
    }

    // Render game chính
    return (
        <>
            <TowerDefenseGameStyles />
            <div className="w-full max-w-4xl mx-auto">
                {/* UI điều khiển */}
                <div className="flex justify-between items-center p-3 bg-gray-800 text-white rounded-t-lg">
                    <div className="text-xl font-bold">❤️ Mạng: {lives}</div>
                    <div className="text-xl font-bold">💰 Vàng: {gold}</div>
                    <div className="text-xl font-bold">🌊 Đợt: {wave + 1} / {WAVES.length}</div>
                    <button 
                        onClick={() => setIsPlacingTower(true)} 
                        disabled={gold < GAME_CONFIG.towerCost || isPlacingTower}
                        className="px-4 py-2 bg-green-600 rounded font-bold hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Mua Tháp ({GAME_CONFIG.towerCost} vàng)
                    </button>
                     <button 
                        onClick={() => startNextWave(wave + 1)}
                        disabled={enemies.length > 0 || wave >= WAVES.length - 1}
                        className="px-4 py-2 bg-blue-600 rounded font-bold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Gọi Đợt Tiếp
                    </button>
                </div>

                {/* Màn hình game */}
                <div
                    onClick={handleGameScreenClick}
                    className={`relative game-container-td border-2 border-purple-500 overflow-hidden rounded-b-lg ${isPlacingTower ? 'tower-placement-mode' : ''}`}
                    style={{ width: GAME_CONFIG.gameScreenWidth, height: GAME_CONFIG.gameScreenHeight }}
                >
                    {/* Vẽ đường đi */}
                    <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                        <polyline
                            points={PATH_WAYPOINTS.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="40"
                            strokeLinejoin="round"
                        />
                    </svg>
                    
                    {/* Vẽ tháp */}
                    {towers.map(tower => (
                        <div key={tower.id} className="absolute text-4xl" style={{ left: tower.x - 20, top: tower.y - 20, zIndex: 10 }}>
                            🗼
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/20 rounded-full" style={{width: GAME_CONFIG.towerRange * 2, height: GAME_CONFIG.towerRange * 2}}></div>
                        </div>
                    ))}
                    
                    {/* Vẽ quái vật */}
                    {enemies.map(enemy => (
                        <div key={enemy.id} className="absolute text-3xl" style={{ left: enemy.x - 15, top: enemy.y - 15, zIndex: 20 }}>
                            {enemy.icon}
                            {/* Thanh máu */}
                            <div className="absolute -bottom-2 w-8 h-1 bg-red-500 rounded">
                                <div className="h-full bg-green-500 rounded" style={{ width: `${(enemy.currentHealth / enemy.health) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Vẽ đạn */}
                    {projectiles.map(p => (
                        <div key={p.id} className="absolute w-2 h-2 bg-yellow-300 rounded-full" style={{ left: p.x - 2, top: p.y - 2, zIndex: 30, boxShadow: '0 0 5px yellow' }}></div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default PhongTuyenNganHa;
