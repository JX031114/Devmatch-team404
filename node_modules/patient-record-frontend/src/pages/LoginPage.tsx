import React from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
  onLogin: (address: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLogin = (address: string) => {
    console.log('Attempting login with address:', address);
    onLogin(address); // Pass to App for state update
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;