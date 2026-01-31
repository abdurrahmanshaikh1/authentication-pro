import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { axiosInstance } from '../config/axiosInstance';
// import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Verifying your email...');
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    try {
      setStatus('🔄 Verifying your email...');

      await axiosInstance.get(`/auth/verify-email/${token}`, {
        withCredentials: true,
      });

      setStatus('Email verified successfully!');
      alert('Email verified! Redirecting to home...');

      
      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus('❌ Invalid or expired verification link');
      alert('Verification failed. Please register again.');

      // ❌ FAILURE → LOGIN
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-md w-full border">
        <div className="text-center">

          {loading ? (
            <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
              ⏳
            </div>
          ) : status.includes('✅') ? (
            <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              ❌
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Email Verification
          </h2>

          <p className="text-lg text-gray-600 mb-6">{status}</p>

          {!loading && status.includes('✅') && (
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
            >
              Go to Home
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
