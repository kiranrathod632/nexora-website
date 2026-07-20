import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddFunds from './pages/AddFunds';
import Invest from './pages/Invest';
import Academy from './pages/Academy';
import Profile from './pages/Profile';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CourseModal from './components/CourseModal';
import InvestModal from './components/InvestModal';
import AddFundsModal from './components/AddFundsModal';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import Toast from './components/Toast';

// Context
import { AppProvider, useApp } from './context/AppContext';

const AppContent = () => {
  const [modals, setModals] = useState({ login: false, register: false, course: false, invest: false, addFunds: false });
  const { isLoggedIn, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

  const switchModal = (from, to) => {
    closeModal(from);
    openModal(to);
  };

  const handleLogin = (userData) => {
    closeModal('login');
    navigate('/dashboard');
    showToast(`Welcome back, ${userData.name}! 👋`, 'success');
  };

  const handleRegister = (userData) => {
    closeModal('register');
    navigate('/dashboard');
    showToast('Account created successfully! Welcome to NEXORA 🚀', 'success');
  };

  const handleLogout = () => {
    navigate('/');
    showToast('Signed out successfully. See you soon!', 'info');
  };

  // Protect routes
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      openModal('login');
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <TickerBar />
      <Navbar onOpenModal={openModal} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home onOpenModal={openModal} />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/add-funds" element={<ProtectedRoute><AddFunds /></ProtectedRoute>} />
        <Route path="/invest" element={<ProtectedRoute><Invest /></ProtectedRoute>} />
        <Route path="/academy" element={<ProtectedRoute><Academy /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

      {/* Modals */}
      <LoginModal
        isOpen={modals.login}
        onClose={() => closeModal('login')}
        onSwitch={() => switchModal('login', 'register')}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={modals.register}
        onClose={() => closeModal('register')}
        onSwitch={() => switchModal('register', 'login')}
        onRegister={handleRegister}
      />
      <CourseModal
        isOpen={modals.course}
        onClose={() => closeModal('course')}
      />
      <InvestModal
        isOpen={modals.invest}
        onClose={() => closeModal('invest')}
      />
      <AddFundsModal
        isOpen={modals.addFunds}
        onClose={() => closeModal('addFunds')}
      />

      <Toast />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;