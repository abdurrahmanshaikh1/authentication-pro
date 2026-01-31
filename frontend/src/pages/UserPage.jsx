import React from 'react';
import { useNavigate } from 'react-router';

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-600 mb-6">Click below to go to your profile page</p>
      <button
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
        onClick={() => navigate('/home/profile')}
      >
        Go to Profile
      </button>
    </div>
  );
};

export default UserPage;
