import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthenticatedHomePage from './pages/AuthenticatedHomePage';
import LessonPage from './pages/LessonPage';
import GamePage from './pages/GamePage';
import RewardPage from './pages/RewardPage';
import ExercisePage from './pages/ExercisePage';
import StudentManagementPage from './pages/StudentManagementPage';
import ClassManagementPage from './pages/ClassManagementPage';
import ExerciseManagementPage from './pages/ExerciseManagementPage'; // ✅ đổi ở đây
import Children from './pages/ChildrenManagementPage';

import { getCurrentUser } from './utils/helpers';
import ReportPage from './pages/ReportPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Import the new AdminLessonPage component
import AdminLessonPage from './pages/AdminLessonPage';

// Import ProfilePage and SettingsPage components
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Import ExerciseDetailPage
import ExerciseDetailPage from './pages/ExerciseDetailPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch(user.role) {
      case 'student':
        return <Navigate to="/student-home" replace />;
      case 'teacher':
        return <Navigate to="/teacher-home" replace />;
      case 'parent':
        return <Navigate to="/parent-home" replace />;
      default:
        return <Navigate to="/home" replace />;
    }
  }
  
  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  if (user) {
    switch(user.role) {
      case 'student':
        return <Navigate to="/student-home" replace />;
      case 'teacher':
        return <Navigate to="/teacher-home" replace />;
      case 'parent':
        return <Navigate to="/parent-home" replace />;
      default:
        return <Navigate to="/home" replace />;
    }
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          } />
          
          <Route path="/reset-password" element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          } />
          
          {/* Role-specific homes */}
          <Route path="/student-home" element={
            <ProtectedRoute allowedRoles={['student']}>
              <AuthenticatedHomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/teacher-home" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AuthenticatedHomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/parent-home" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <AuthenticatedHomePage />
            </ProtectedRoute>
          } />
          
          {/* Profile */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Settings */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          
          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/student-dashboard" element={<Navigate to="/student-home" replace />} />
          <Route path="/teacher-dashboard" element={<Navigate to="/teacher-home" replace />} />
          <Route path="/parent-dashboard" element={<Navigate to="/parent-home" replace />} />
          
          <Route path="/home" element={
            <ProtectedRoute>
              {(() => {
                const user = getCurrentUser();
                if (user) {
                  switch(user.role) {
                    case 'student':
                      return <Navigate to="/student-home" replace />;
                    case 'teacher':
                      return <Navigate to="/teacher-home" replace />;
                    case 'parent':
                      return <Navigate to="/parent-home" replace />;
                    default:
                      return <Navigate to="/student-home" replace />;
                  }
                }
                return <Navigate to="/login" replace />;
              })()}
            </ProtectedRoute>
          } />
          
          {/* Student features */}
          <Route path="/lessons" element={
            <ProtectedRoute allowedRoles={['student']}>
              <LessonPage />
            </ProtectedRoute>
          } />
          
          <Route path="/games" element={
            <ProtectedRoute allowedRoles={['student']}>
              <GamePage />
            </ProtectedRoute>
          } />
          
          <Route path="/rewards" element={
            <ProtectedRoute allowedRoles={['student']}>
              <RewardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/exercises" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ExercisePage />
            </ProtectedRoute>
          } />

          {/* Mới: route chi tiết bài tập */}
          <Route path="/exercises/:exerciseId" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ExerciseDetailPage />
            </ProtectedRoute>
          } />
          
          {/* Teacher specific routes */}
          <Route path="/classes" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ClassManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/exercises-management" element={ // ✅ đổi từ assignments
            <ProtectedRoute allowedRoles={['teacher']}>
              <ExerciseManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/students" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <StudentManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={['teacher', 'parent']}>
              <ReportPage />
            </ProtectedRoute>
          } />
          
          {/* Parent specific routes */}
          <Route path="/children" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <Children />
            </ProtectedRoute>
          } />
          
          {/* Admin */}
          <Route path="/admin/lessons" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLessonPage />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
