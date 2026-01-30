import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { axiosInstance } from '../config/axiosInstance';

const VerifyEmail = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your email...');
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    try {
      setStatus('🔄 Verifying your email...');
      
      const response = await axiosInstance.get(`/verify-email/${token}`, {
        withCredentials: true
      });

      setStatus('✅ Email verified successfully!');
      toast.success('Email verified! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/'); 
      }, 2000);

    } catch (error) {
      setStatus('❌ Invalid or expired verification link');
      toast.error('Verification failed. Please register again.');
      
      setTimeout(() => {
        navigate('/'); 
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
        <div className="text-center">
          {/* Loading/Status Icon */}
          {loading ? (
            <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          ) : status.includes('✅') ? (
            <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-6">Email Verification</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{status}</p>
          
          {!loading && (
            <button
              onClick={() => navigate('/')}
              className="w-full bg-indigo-600 text-white py-3 px-8 rounded-2xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
