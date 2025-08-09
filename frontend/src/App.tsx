import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import ViewPage from './pages/ViewPage';

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const address = localStorage.getItem('userAddress');
      const newIsLoggedIn = !!address;
      if (newIsLoggedIn !== isLoggedIn) {
        setIsLoggedIn(newIsLoggedIn);
        console.log('Login state updated:', newIsLoggedIn, 'Address:', address);
        if (newIsLoggedIn) {
          navigate('/main'); // Ensure navigation on state change
        }
      }
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, [isLoggedIn, navigate]);

  const handleLogin = (address: string) => {
    console.log('Attempting login with address:', address);
    if (address.startsWith('0x') && address.length === 66) {
      console.log('Address validated successfully');
      localStorage.setItem('userAddress', address);
      setIsLoggedIn(true);
      console.log('Navigating to /main');
      // Force navigation with a slight delay to ensure state propagates
      setTimeout(() => {
        navigate('/main');
        window.location.href = '/main'; // Fallback to full page reload
      }, 0);
    } else {
      console.log('Invalid address:', address);
      alert('Please enter a valid Sui address (e.g., 0x followed by 64 characters)');
    }
  };

  console.log('Current isLoggedIn:', isLoggedIn);

  return (
    <Routes>
      <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/main" />} />
      <Route path="/main" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
      <Route path="/create" element={isLoggedIn ? <CreatePage /> : <Navigate to="/login" />} />
      <Route path="/update" element={isLoggedIn ? <UpdatePage /> : <Navigate to="/login" />} />
      <Route path="/view/:id" element={isLoggedIn ? <ViewPage /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;