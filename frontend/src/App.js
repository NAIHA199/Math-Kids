
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
import AssignmentManagementPage from './pages/AssignmentManagementPage';
import Children from './pages/ChildrenManagementPage';

import { getCurrentUser } from './utils/helpers';
import ReportPage from './pages/ReportPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  if (user) {
    return <Navigate to="/home" replace />;
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
          
          {/* Protected routes - Main authenticated home */}
          <Route path="/home" element={
            <ProtectedRoute>
              <AuthenticatedHomePage />
            </ProtectedRoute>
          } />
          
          {/* Legacy dashboard redirects */}
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/student-dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/teacher-dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/parent-dashboard" element={<Navigate to="/home" replace />} />
          
          {/* Student features */}
          <Route path="/lessons" element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          } />
          
          <Route path="/games" element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } />
          
          <Route path="/rewards" element={
            <ProtectedRoute>
              <RewardPage />
            </ProtectedRoute>
          } />
          

          
          <Route path="/exercises" element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          } />
          
          {/* Teacher specific routes */}
          <Route path="/classes" element={
            <ProtectedRoute>
              <ClassManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/assignments" element={
            <ProtectedRoute>
              <AssignmentManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/students" element={
            <ProtectedRoute>
              <StudentManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          } />
          
          {/* Parent specific routes */}
          <Route path="/children" element={
            <ProtectedRoute>
              <Children />
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
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