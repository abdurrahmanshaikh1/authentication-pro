import React from "react";

const RegisterSuccess = () => {
  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Almost done!</h2>
        <p className="text-gray-600 mb-6">
          A verification link has been sent to your email. <br />
          Please check your inbox and click the link to verify your account.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
          Go to Email
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
