import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Main Dashboard
        </h1>

        <div className="flex justify-center flex-wrap main-buttons">
          <button
            onClick={() => navigate('/create')}
            className="btn btn-green"
          >
            Create Record
          </button>

          <button
            onClick={() => navigate('/update')}
            className="btn btn-blue"
          >
            Update Record
          </button>

          <button
            onClick={() => navigate('/view')}
            className="btn btn-purple"
          >
            View Record
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-red"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
