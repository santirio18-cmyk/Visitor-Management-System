import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VisitorDashboard from './components/Dashboard/VisitorDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import SecondLevelApproverDashboard from './components/Dashboard/SecondLevelApproverDashboard';
import ThirdLevelApproverDashboard from './components/Dashboard/ThirdLevelApproverDashboard';
import PublicRequestForm from './components/Public/PublicRequestForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<PublicRequestForm />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/manager" element={!user ? <Login /> : user?.role === 'warehouse_manager' ? <ManagerDashboard /> : <Navigate to="/" />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            {user?.role === 'visitor' ? (
              <VisitorDashboard />
            ) : user?.role === 'second_level_approver' ? (
              <SecondLevelApproverDashboard />
            ) : user?.role === 'third_level_approver' ? (
              <ThirdLevelApproverDashboard />
            ) : (
              <ManagerDashboard />
            )}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  // Get basename for GitHub Pages (only in production, not on localhost)
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const basename = isLocalhost ? '/' : (process.env.PUBLIC_URL || '/Visitor-Management-System');
  
  return (
    <AuthProvider>
      <Router basename={basename}>
        <div className="App">
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

