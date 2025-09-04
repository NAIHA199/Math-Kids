import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../components/layout/AuthenticatedNavbar";
import SpaceBackground from "../components/ui/SpaceBackground";

// --- Icons ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

// --- Badge trạng thái ---
const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: { text: "Hoàn thành", classes: "bg-green-500 text-green-100" },
    "in-progress": { text: "Đang làm", classes: "bg-yellow-500 text-yellow-100" },
    overdue: { text: "Quá hạn", classes: "bg-red-500 text-red-100" },
  };
  const currentStatus = statusStyles[status] || { text: "Không xác định", classes: "bg-gray-500 text-gray-100" };
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${currentStatus.classes}`}>
      {currentStatus.text}
    </span>
  );
};

const ExerciseManagementPage = () => {
  const [exercises, setExercises] = useState([]);
  const token = localStorage.getItem("token"); // token lưu trong localStorage

  // --- Load danh sách bài tập ---
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/exercises", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setExercises(data);
      } catch (error) {
        console.error("Lỗi khi load exercises:", error);
      }
    };
    fetchExercises();
  }, [token]);

  // --- Xóa bài tập ---
  const handleDelete = async (exerciseId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài tập này không?")) return;

    try {
      await fetch(`http://localhost:8000/api/exercises/${exerciseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setExercises(exercises.filter((e) => e.id !== exerciseId));
    } catch (error) {
      console.error("Lỗi khi xóa exercise:", error);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-black text-white">
      <SpaceBackground />
      <AuthenticatedNavbar user={{ role: "teacher" }} />

      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tên bài tập</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Khối</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ngày giao</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {exercises.map((exercise) => (
                    <tr key={exercise.id} className="hover:bg-gray-700/50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{exercise.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{exercise.grade?.name || "Chưa có khối"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{exercise.assigned_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={exercise.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-4">
                          <button className="text-blue-400 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                            <EditIcon />
                            <span>Sửa</span>
                          </button>
                          <button
                            onClick={() => handleDelete(exercise.id)}
                            className="text-red-500 hover:text-red-400 transition duration-300 flex items-center space-x-1"
                          >
                            <TrashIcon />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {exercises.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-400">Chưa có bài tập nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseManagementPage;
