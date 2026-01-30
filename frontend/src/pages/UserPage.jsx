import { useState, useEffect } from 'react';
import { User, Phone, LogOut, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        credentials: 'include',  // Cookie automatic jayega
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-md w-full border border-white/50">
        {/* Profile Header */}
        <div className="text-center mb-10">
          <div className="w-28 h-28 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <User className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            {user.name}
          </h1>
          <p className="text-gray-600 text-lg">Welcome Back!</p>
        </div>

        {/* User Details */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500">
            <Mail className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <p className="font-semibold text-gray-900 text-lg">Email</p>
              <p className="text-xl font-medium text-gray-800 mt-1 break-all">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-l-4 border-green-500">
            <Phone className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <p className="font-semibold text-gray-900 text-lg">Mobile</p>
              <p className="text-xl font-medium text-gray-800 mt-1">{user.mobile}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-sm text-gray-600 font-mono">ID: {user._id}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
        >
          <LogOut className="w-6 h-6" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
