import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import ViewPage from './pages/ViewPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const address = localStorage.getItem('userAddress');
      const newIsLoggedIn = !!address;
      if (newIsLoggedIn !== isLoggedIn) {
        setIsLoggedIn(newIsLoggedIn);
        console.log('Login state updated:', newIsLoggedIn, 'Address:', address);
      }
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, [isLoggedIn]);

  const handleLogin = (address: string) => {
    if (address.startsWith('0x') && address.length === 66) {
      localStorage.setItem('userAddress', address);
      setIsLoggedIn(true); // Directly update state
      console.log('Navigating to /main');
    } else {
      console.log('Invalid address:', address);
      alert('Please enter a valid Sui address (e.g., 0x followed by 64 characters)');
    }
  };

  console.log('Current isLoggedIn:', isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/main" />} />
        <Route path="/main" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={isLoggedIn ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/update" element={isLoggedIn ? <UpdatePage /> : <Navigate to="/login" />} />
        <Route path="/view/:id" element={isLoggedIn ? <ViewPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;