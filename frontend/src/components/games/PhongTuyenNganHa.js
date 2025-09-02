import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

// =================================================================================
// CẤU HÌNH GAME (GAME CONFIG)
// =================================================================================

const CONFIG = {
    WIDTH: 896,
    HEIGHT: 600,
    LIVES: 20,
    STARTING_GOLD: 400,
};

const PATH_WAYPOINTS = [
    { x: -50, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 450 },
    { x: 700, y: 450 }, { x: 700, y: 200 }, { x: CONFIG.WIDTH + 50, y: 200 },
];

const TOWER_TYPES = {
    standard: { name: 'Tháp Thường', icon: '🗼', cost: 50, damage: 10, range: 120, fireRate: 800, projectileSpeed: 6, projectileColor: '#60a5fa' },
    splash: { name: 'Tháp Bắn Lan', icon: '💣', cost: 80, damage: 15, range: 100, fireRate: 1200, projectileSpeed: 5, projectileColor: '#fb923c', splashRadius: 40 },
    slow: { name: 'Tháp Làm Chậm', icon: '❄️', cost: 70, damage: 2, range: 140, fireRate: 1000, projectileSpeed: 7, projectileColor: '#a5b4fc', slowEffect: { factor: 0.5, duration: 1500 } },
};

const ENEMY_TYPES = {
    standard: { name: 'Standard', health: 60, speed: 0.8, gold: 10, icon: '👽' },
    fast: { name: 'Fast', health: 30, speed: 1.5, gold: 8, icon: '👾' },
    tank: { name: 'Tank', health: 250, speed: 0.5, gold: 25, icon: '🤖' },
};

const WAVES = [
    { enemies: Array(10).fill('standard') },
    { enemies: [...Array(12).fill('standard'), ...Array(5).fill('fast')] },
    { enemies: [...Array(15).fill('standard'), { type: 'tank', delay: 5000 }] },
];

// Function to calculate stars based on waves completed
const calculateStars = (wavesCompleted) => {
    if (wavesCompleted >= 2) return 3;
    if (wavesCompleted >= 1) return 2;
    return 1;
};

// =================================================================================
// HÀM TIỆN ÍCH & VẼ
// =================================================================================

const getDistance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

const drawPath = (ctx) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 40;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(PATH_WAYPOINTS[0].x, PATH_WAYPOINTS[0].y);
    for (let i = 1; i < PATH_WAYPOINTS.length; i++) {
        ctx.lineTo(PATH_WAYPOINTS[i].x, PATH_WAYPOINTS[i].y);
    }
    ctx.stroke();
};

const drawTower = (ctx, tower) => {
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(TOWER_TYPES[tower.type].icon, tower.x, tower.y);
};

const drawEnemy = (ctx, enemy) => {
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(enemy.icon, enemy.x, enemy.y);
    const healthPercentage = enemy.currentHealth / enemy.health;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(enemy.x - 15, enemy.y - 25, 30, 5);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(enemy.x - 15, enemy.y - 25, 30 * healthPercentage, 5);
};

const drawProjectile = (ctx, p) => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
};

// =================================================================================
// COMPONENT CÂU HỎI TOÁN
// =================================================================================
const MathQuestionModal = ({ question, onAnswer }) => {
    if (!question) return null;

    return (
        <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-slate-700 text-white p-8 rounded-xl shadow-2xl text-center w-full max-w-md">
                <h3 className="text-3xl font-bold mb-6">{question.text}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswer(option)}
                            className="p-4 bg-purple-600 text-white font-bold text-2xl rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// =================================================================================
// COMPONENT CHÍNH
// =================================================================================
const PhongTuyenNganHa = ({ game, onBack, onComplete }) => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('menu');
    const [lives, setLives] = useState(CONFIG.LIVES);
    const [gold, setGold] = useState(CONFIG.STARTING_GOLD);
    const [wave, setWave] = useState(0);
    const [towers, setTowers] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [projectiles, setProjectiles] = useState([]);
    
    const [placingTowerType, setPlacingTowerType] = useState(null);
    const [selectedTower, setSelectedTower] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const [mathQuestion, setMathQuestion] = useState(null);
    const [pendingTower, setPendingTower] = useState(null);

    const gameDataRef = useRef({ towers, enemies, projectiles, lives, gold, wave });

    useEffect(() => {
        gameDataRef.current = { towers, enemies, projectiles, lives, gold, wave };
    }, [towers, enemies, projectiles, lives, gold, wave]);

    const startGame = useCallback(() => {
        setLives(CONFIG.LIVES);
        setGold(CONFIG.STARTING_GOLD);
        setWave(0);
        setTowers([]);
        setEnemies([]);
        setProjectiles([]);
        setSelectedTower(null);
        setGameState('playing');
        startNextWave(0);
    }, []);
    
    const startNextWave = (waveIndex) => {
        if (waveIndex >= WAVES.length) {
            if (gameDataRef.current.enemies.length === 0) setGameState('victory');
            return;
        }
        setWave(waveIndex);
        const waveData = WAVES[waveIndex];
        let enemyIdCounter = 0;
        let spawnDelay = 0;

        waveData.enemies.forEach((enemyInfo) => {
            const enemyTypeKey = typeof enemyInfo === 'string' ? enemyInfo : enemyInfo.type;
            const customDelay = typeof enemyInfo === 'object' ? enemyInfo.delay : 0;
            
            setTimeout(() => {
                const enemyType = ENEMY_TYPES[enemyTypeKey];
                const newEnemy = {
                    id: `enemy-${waveIndex}-${enemyIdCounter++}`, ...enemyType,
                    x: PATH_WAYPOINTS[0].x, y: PATH_WAYPOINTS[0].y,
                    currentHealth: enemyType.health, pathIndex: 0, effects: [],
                };
                setEnemies(prev => [...prev, newEnemy]);
            }, spawnDelay + customDelay);
            spawnDelay += 1200; // Tăng khoảng cách spawn
        });
    };

    const generateMathQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        
        const options = new Set([correctAnswer]);
        while (options.size < 4) {
            const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
                options.add(wrongAnswer);
            }
        }
        
        return {
            text: `${num1} + ${num2} = ?`,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            correctAnswer,
        };
    };

    const update = useCallback(() => {
        if (gameState !== 'playing' || mathQuestion) return;

        let newEnemies = [...gameDataRef.current.enemies];
        let newProjectiles = [...gameDataRef.current.projectiles];
        let livesLost = 0;
        let goldEarned = 0;

        newEnemies.forEach(enemy => {
            enemy.effects = enemy.effects.filter(effect => Date.now() < effect.expiresAt);
        });

        newEnemies = newEnemies.map(enemy => {
            if (enemy.pathIndex >= PATH_WAYPOINTS.length - 1) {
                livesLost++;
                return null;
            }
            const speedMultiplier = enemy.effects.reduce((acc, effect) => acc * effect.factor, 1);
            const currentSpeed = enemy.speed * speedMultiplier;
            const targetPoint = PATH_WAYPOINTS[enemy.pathIndex + 1];
            const distance = getDistance(enemy, targetPoint);
            if (distance < currentSpeed) {
                enemy.x = targetPoint.x;
                enemy.y = targetPoint.y;
                enemy.pathIndex++;
            } else {
                enemy.x += (targetPoint.x - enemy.x) / distance * currentSpeed;
                enemy.y += (targetPoint.y - enemy.y) / distance * currentSpeed;
            }
            return enemy;
        }).filter(Boolean);

        gameDataRef.current.towers.forEach(tower => {
            const now = Date.now();
            const type = TOWER_TYPES[tower.type];
            if (!tower.lastFired || now - tower.lastFired > type.fireRate) {
                const target = newEnemies.find(e => getDistance(tower, e) < type.range);
                if (target) {
                    newProjectiles.push({
                        id: `proj-${now}-${Math.random()}`, x: tower.x, y: tower.y,
                        targetId: target.id, speed: type.projectileSpeed,
                        color: type.projectileColor, towerType: tower.type,
                    });
                    tower.lastFired = now;
                }
            }
        });

        const hitEnemies = new Map();
        newProjectiles = newProjectiles.filter(p => {
            const targetIndex = newEnemies.findIndex(e => e.id === p.targetId);
            if (targetIndex === -1) return false;
            const target = newEnemies[targetIndex];
            const distance = getDistance(p, target);
            if (distance < p.speed) {
                const towerType = TOWER_TYPES[p.towerType];
                if (towerType.splashRadius) {
                    newEnemies.forEach(e => {
                        if (getDistance(target, e) <= towerType.splashRadius) {
                            hitEnemies.set(e.id, (hitEnemies.get(e.id) || 0) + towerType.damage);
                        }
                    });
                } else {
                    hitEnemies.set(target.id, (hitEnemies.get(target.id) || 0) + towerType.damage);
                }
                if (towerType.slowEffect) {
                    const effectIndex = target.effects.findIndex(e => e.type === 'slow');
                    if (effectIndex > -1) {
                        target.effects[effectIndex].expiresAt = Date.now() + towerType.slowEffect.duration;
                    } else {
                        target.effects.push({ type: 'slow', factor: towerType.slowEffect.factor, expiresAt: Date.now() + towerType.slowEffect.duration });
                    }
                }
                return false;
            } else {
                p.x += (target.x - p.x) / distance * p.speed;
                p.y += (target.y - p.y) / distance * p.speed;
                return true;
            }
        });

        if (hitEnemies.size > 0) {
            newEnemies = newEnemies.map(e => {
                if (hitEnemies.has(e.id)) {
                    e.currentHealth -= hitEnemies.get(e.id);
                }
                if (e.currentHealth <= 0) {
                    goldEarned += e.gold;
                    return null;
                }
                return e;
            }).filter(Boolean);
        }

        if (livesLost > 0) setLives(prev => Math.max(0, prev - livesLost));
        if (goldEarned > 0) setGold(prev => prev + goldEarned);
        setEnemies(newEnemies);
        setProjectiles(newProjectiles);

        if (gameDataRef.current.lives - livesLost <= 0) setGameState('gameOver');
        if (newEnemies.length === 0 && gameDataRef.current.wave >= WAVES.length - 1) setGameState('victory');

    }, [gameState, mathQuestion]);

    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
        ctx.fillStyle = '#0a0a1f';
        ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

        drawPath(ctx);
        gameDataRef.current.towers.forEach(t => drawTower(ctx, t));
        gameDataRef.current.enemies.forEach(e => drawEnemy(ctx, e));
        gameDataRef.current.projectiles.forEach(p => drawProjectile(ctx, p));

        if (placingTowerType) {
            const type = TOWER_TYPES[placingTowerType];
            ctx.globalAlpha = 0.5;
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(type.icon, mousePos.x, mousePos.y);
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, type.range, 0, Math.PI * 2);
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }
        
        if (selectedTower) {
             const type = TOWER_TYPES[selectedTower.type];
             ctx.globalAlpha = 0.3;
             ctx.fillStyle = 'white';
             ctx.beginPath();
             ctx.arc(selectedTower.x, selectedTower.y, type.range, 0, Math.PI * 2);
             ctx.fill();
             ctx.globalAlpha = 1.0;
        }
    }, [placingTowerType, mousePos, selectedTower]);

    useEffect(() => {
        let frameId;
        const gameLoop = () => {
            update();
            draw();
            frameId = requestAnimationFrame(gameLoop);
        };
        if (gameState === 'playing') {
            frameId = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(frameId);
    }, [gameState, draw, update]);

    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (placingTowerType) {
            const towerCost = TOWER_TYPES[placingTowerType].cost;
            if (gold < towerCost) {
                toast.warn('Không đủ vàng!');
                setPlacingTowerType(null);
                return;
            }
            setPendingTower({ x, y, type: placingTowerType });
            setMathQuestion(generateMathQuestion());
            setPlacingTowerType(null);
        } else {
            const clickedTower = towers.find(t => getDistance({x, y}, t) < 20);
            setSelectedTower(clickedTower || null);
        }
    };
    
    const handleQuestionAnswer = (answer) => {
        if (answer === mathQuestion.correctAnswer) {
            toast.success("Chính xác! Đã xây tháp.");
            const { x, y, type } = pendingTower;
            setTowers(prev => [...prev, { id: `tower-${Date.now()}`, x, y, type, lastFired: 0 }]);
            setGold(prev => prev - TOWER_TYPES[type].cost);
        } else {
            toast.error("Sai rồi! Thử lại nhé.");
        }
        setMathQuestion(null);
        setPendingTower(null);
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleSellTower = () => {
        if (!selectedTower) return;
        const sellValue = Math.floor(TOWER_TYPES[selectedTower.type].cost / 2);
        setGold(prev => prev + sellValue);
        setTowers(prev => prev.filter(t => t.id !== selectedTower.id));
        setSelectedTower(null);
    };

    const renderGameScreen = () => (
        <div className="w-full max-w-[1088px] mx-auto flex flex-col items-center relative">
            <div className="w-full flex justify-between items-center p-3 bg-slate-800 text-white rounded-t-lg">
                <div className="flex gap-4">
                    <div className="text-xl font-bold">❤️ {lives}</div>
                    <div className="text-xl font-bold">💰 {gold}</div>
                    <div className="text-xl font-bold">🌊 {wave + 1} / {WAVES.length}</div>
                </div>
                <button 
                    onClick={() => startNextWave(wave + 1)}
                    disabled={enemies.length > 0 || wave >= WAVES.length - 1}
                    className="px-4 py-2 bg-blue-600 rounded font-bold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Gọi Đợt Tiếp
                </button>
            </div>
            <div className="flex w-full">
                <canvas
                    ref={canvasRef}
                    width={CONFIG.WIDTH}
                    height={CONFIG.HEIGHT}
                    onClick={handleCanvasClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setPlacingTowerType(null)}
                    className="bg-slate-900 border-2 border-purple-500 rounded-bl-lg cursor-pointer"
                />
                <div className="w-48 bg-slate-800 p-3 flex flex-col gap-3 rounded-br-lg border-y-2 border-r-2 border-purple-500">
                    <h3 className="text-white font-bold text-center text-lg">Cửa Hàng</h3>
                    {Object.entries(TOWER_TYPES).map(([key, type]) => (
                        <button 
                            key={key}
                            onClick={() => { setPlacingTowerType(key); setSelectedTower(null); }}
                            disabled={gold < type.cost}
                            className="p-2 bg-slate-700 rounded text-white flex items-center gap-2 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                                <div className="font-bold text-left">{type.name}</div>
                                <div className="text-sm text-yellow-400">{type.cost}💰</div>
                            </div>
                        </button>
                    ))}
                    <div className="border-t border-slate-600 my-2"></div>
                    {selectedTower && (
                        <div className="text-white text-center p-2 bg-slate-900 rounded">
                             <h4 className="font-bold mb-2">Tháp Đã Chọn</h4>
                             <p>{TOWER_TYPES[selectedTower.type].name}</p>
                             <button onClick={handleSellTower} className="mt-2 w-full bg-red-600 hover:bg-red-700 rounded p-1 font-bold">
                                Bán (+{Math.floor(TOWER_TYPES[selectedTower.type].cost / 2)}💰)
                             </button>
                        </div>
                    )}
                </div>
            </div>
            <MathQuestionModal question={mathQuestion} onAnswer={handleQuestionAnswer} />
        </div>
    );

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-slate-800 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Phòng Tuyến Ngân Hà 🌌</h2>
                <p className="mb-6">Xây dựng hệ thống phòng thủ để ngăn chặn các đợt tấn công của quái vật ngoài hành tinh!</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'gameOver' || gameState === 'victory') {
        const stars = calculateStars(wave);
         return (
            <div className="relative w-full max-w-4xl text-white text-center bg-slate-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-6xl font-bold mb-4">
                    {gameState === 'victory' ? 'Chiến Thắng! 🏆' : 'Thất Bại! 💔'}
                </h2>
                <p className="text-3xl mb-6">Bạn đã qua được {wave} đợt.</p>
                <p className="text-2xl mb-4">Số sao nhận được: <span className="text-yellow-400">{stars} ⭐</span></p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={() => onComplete(3, stars)} className="px-6 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700 transition-colors">Lưu kết quả</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
                </div>
            </div>
        );
    }

    return renderGameScreen();
};

export default PhongTuyenNganHa;
