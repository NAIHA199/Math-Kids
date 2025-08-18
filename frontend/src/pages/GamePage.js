import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/helpers';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import { toast } from 'react-toastify';

import MeteoriteGuardian from '../games/MeteoriteGuardian';
import CuocDuaXuyenKhong from '../games/CuocDuaXuyenKhong';
import PhongTuyenNganHa from '../games/PhongTuyenNganHa';
import BanMayBayToanHoc from '../games/BanMayBayToanHoc';

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

// Component Menu chọn game
const GameMenu = ({ onSelectGame }) => (
    <div className="text-center p-8 bg-gray-800 text-white rounded-lg w-full max-w-5xl mx-auto shadow-2xl">
        <h1 className="text-5xl font-bold mb-8">Trung Tâm Trò Chơi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES.map(game => (
                <div
                    key={game.id}
                    className="bg-gray-700 p-6 rounded-lg cursor-pointer transform hover:scale-105 hover:bg-purple-700 transition-all duration-300 flex flex-col items-center text-center"
                    onClick={() => onSelectGame(game.id)}
                >
                    <div className="text-6xl mb-4">{game.icon}</div>
                    <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
                    <p className="text-gray-300 flex-grow">{game.description}</p>
                </div>
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
        <div className="min-h-screen bg-gray-900">
            <AuthenticatedNavbar user={user} />
            <div className="pt-20 flex justify-center items-center min-h-screen p-4">
                {ActiveGame ? (
                    <ActiveGame onBack={handleBackToMenu} />
                ) : (
                    <GameMenu onSelectGame={handleSelectGame} />
                )}
            </div>
        </div>
    );
};

export default GamePage;
