import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Main Dashboard</h1>
      <div className="max-w-md mx-auto space-y-4">
        <button
          onClick={() => navigate('/create')}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Create Record
        </button>
        <button
          onClick={() => navigate('/update')}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Update Record
        </button>
        <button
          onClick={() => navigate('/view')}
          className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
        >
          View Record
        </button>
      </div>
    </div>
  );
};

export default MainPage;