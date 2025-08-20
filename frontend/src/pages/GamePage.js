import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';


import MeteoriteGuardian from '../components/games/MeteoriteGuardian';
import CuocDuaXuyenKhong from '../components/games/CuocDuaXuyenKhong';
import PhongTuyenNganHa from '../components/games/PhongTuyenNganHa';
import BanMayBayToanHoc from '../components/games/BanMayBayToanHoc';

const getCurrentUser = () => ({ name: 'Student', role: 'student' });
// 2. Định nghĩa danh sách game
const GAMES = [
    {
        id: 'meteorite-guardian',
        name: 'Vệ Binh Thiên Thạch',
        description: 'Bắn thiên thạch chứa đáp án đúng để bảo vệ hành tinh.',
        icon: '☄️',
        component: MeteoriteGuardian,
    },
    {
        id: 'space-race',
        name: 'Cuộc Đua Xuyên Không',
        description: 'Trả lời đúng để tăng tốc phi thuyền và về đích trước.',
        icon: '🚀',
        component: CuocDuaXuyenKhong,
    },
    {
        id: 'galaxy-defense',
        name: 'Phòng Tuyến Ngân Hà',
        description: 'Xây tháp phòng thủ chiến lược để chặn các đợt quái vật.',
        icon: '🗼',
        component: PhongTuyenNganHa,
    },
    {
        id: 'math-plane-shooter', 
        name: 'Bắn Máy Bay Toán Học',
        description: 'Điều khiển máy bay và bắn hạ kẻ địch bằng các phép toán.',
        icon: '✈️',
        component: BanMayBayToanHoc,
    }
];

// Component Card Game được thiết kế lại
const GameCard = ({ game, onSelect }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-purple-500 hover:-translate-y-2"
        onClick={() => onSelect(game.id)}
    >
        <div className="text-7xl mb-5 transition-transform duration-300 group-hover:scale-110">{game.icon}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{game.name}</h2>
        <p className="text-gray-400 text-sm mb-4 h-16">{game.description}</p>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-purple-400 font-semibold text-sm">Chơi ngay →</span>
        </div>
    </motion.div>
);

// Component Menu chọn game được thiết kế lại
const GameMenu = ({ onSelectGame }) => (
    <div className="w-full max-w-5xl mx-auto text-center px-4">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        >
            Trung Tâm Trò Chơi
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 mb-12"
        >
            Chọn một trò chơi để bắt đầu cuộc phiêu lưu tri thức của bạn!
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES.map(game => (
                <GameCard key={game.id} game={game} onSelect={onSelectGame} />
            ))}
        </div>
    </div>
);

// Component GamePage chính
const GamePage = () => {
    const [activeGameId, setActiveGameId] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập!');
            navigate('/login');
            return;
        }
        setUser(currentUser);
    }, [navigate]);

    const handleSelectGame = (gameId) => {
        setActiveGameId(gameId);
    };

    const handleBackToMenu = () => {
        setActiveGameId(null);
    };

    const ActiveGame = GAMES.find(g => g.id === activeGameId)?.component;

    return (
        <div className="min-h-screen w-full bg-slate-900 text-white overflow-hidden relative">
            {/* Hiệu ứng nền */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            
            <AuthenticatedNavbar user={user} />
            
            <div className="relative z-10 flex justify-center items-center min-h-screen pt-20 p-4">
                <AnimatePresence mode="wait">
                    {ActiveGame ? (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="w-full flex justify-center"
                        >
                            <ActiveGame onBack={handleBackToMenu} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                             className="w-full flex justify-center"
                        >
                            <GameMenu onSelectGame={handleSelectGame} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GamePage;
