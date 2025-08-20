import React from 'react';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';

// =================================================================================
// CÁC COMPONENT ICON (SVG) ĐỂ TRÁNH LỖI IMPORT
// =================================================================================
const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const ActivityIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
);

const ClockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


// =================================================================================
// DỮ LIỆU GIẢ (MOCK DATA)
// =================================================================================
const mockChildrenData = [
    { id: 1, name: 'Nguyễn Văn An', avatar: 'https://placehold.co/100x100/EEDC82/000000?text=A' },
    { id: 2, name: 'Trần Thị Bình', avatar: 'https://placehold.co/100x100/90EE90/000000?text=B' },
    { id: 3, name: 'Lê Minh Cường', avatar: 'https://placehold.co/100x100/ADD8E6/000000?text=C' },
];

const mockRecentActivities = [
    { child: 'Nguyễn Văn An', activity: 'Hoàn thành bài học "Phép Cộng"', time: '5 phút trước' },
    { child: 'Trần Thị Bình', activity: 'Chơi game "Vệ Binh Thiên Thạch" đạt 5000 điểm', time: '1 giờ trước' },
    { child: 'Nguyễn Văn An', activity: 'Làm bài tập "Phép Trừ Nâng Cao"', time: '3 giờ trước' },
    { child: 'Lê Minh Cường', activity: 'Đăng nhập vào hệ thống', time: 'Hôm qua' },
];

// =================================================================================
// CÁC COMPONENT CON
// =================================================================================

// Card hiển thị thông số tổng quan
const StatCard = ({ icon, title, value, unit }) => (
    <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-4">
        <div className="bg-slate-700 p-3 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-white text-2xl font-bold">
                {value} <span className="text-base font-normal text-slate-300">{unit}</span>
            </p>
        </div>
    </div>
);

// Card hiển thị thông tin một người con
const ChildCard = ({ child }) => (
    <div className="bg-slate-800 p-4 rounded-xl flex flex-col items-center text-center">
        <img src={child.avatar} alt={child.name} className="w-20 h-20 rounded-full mb-4 border-2 border-purple-500" />
        <h4 className="text-white font-semibold mb-2">{child.name}</h4>
        <button className="mt-auto w-full px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Xem chi tiết
        </button>
    </div>
);

const Children = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
            <AuthenticatedNavbar user={{ role: 'parent' }} />
            <div className="max-w-7xl mx-auto">

                {/* Phần tổng quan */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<UserIcon className="w-6 h-6 text-purple-400" />} title="Số lượng con" value={mockChildrenData.length} unit="tài khoản" />
                    <StatCard icon={<ClockIcon className="w-6 h-6 text-sky-400" />} title="Tổng thời gian học" value="12" unit="giờ" />
                    <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-green-400" />} title="Bài tập hoàn thành" value="85" unit="bài" />
                    <StatCard icon={<ActivityIcon className="w-6 h-6 text-amber-400" />} title="Hoạt động gần nhất" value="5" unit="phút trước" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cột chính: Quản lý con & Hoạt động gần đây */}
                    <main className="lg:col-span-2 space-y-8">
                        {/* Quản lý tài khoản con */}
                        <section className="bg-slate-800/50 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-white">Quản lý tài khoản con</h3>
                                <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                                    + Thêm con
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {mockChildrenData.map(child => (
                                    <ChildCard key={child.id} child={child} />
                                ))}
                            </div>
                        </section>

                        {/* Hoạt động gần đây */}
                        <section className="bg-slate-800/50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4">Hoạt động gần đây</h3>
                            <div className="space-y-4">
                                {mockRecentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                        <div>
                                            <p className="text-white font-medium">{activity.activity}</p>
                                            <p className="text-sm text-slate-400">{activity.child}</p>
                                        </div>
                                        <p className="text-sm text-slate-500">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* Cột phụ: Báo cáo & Cài đặt */}
                    <aside className="space-y-8">
                        <section className="bg-slate-800/50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4">Tiến độ học tập tuần</h3>
                            {/* Placeholder for chart */}
                            <div className="bg-slate-800 h-48 rounded-lg flex items-center justify-center">
                                <p className="text-slate-500">Biểu đồ đang được phát triển</p>
                            </div>
                        </section>
                         <section className="bg-slate-800/50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4">Cài đặt & Trợ giúp</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">Quản lý thông báo</button>
                                <button className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">Báo cáo sự cố</button>
                                <button className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">Trung tâm trợ giúp</button>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Children;