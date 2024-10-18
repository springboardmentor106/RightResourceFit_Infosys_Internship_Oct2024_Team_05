import React from 'react';
import { FaLock } from 'react-icons/fa';
import './App.css';

function ForgotPassword() {
  return (
    <div className="App flex justify-center py-10 bg-gray-100 h-screen items-center">
      <div className="w-4/5 max-w-5xl bg-white rounded-lg shadow-md flex h-4/6 max-h-[650px]">
        {/* Left Section - Forgot Password Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-black mb-8">FORGOT PASSWORD</h1>
          <form className="w-full max-w-sm">
            {/* New Password Input */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Confirm Password Input */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg w-full text-lg font-bold" style={{ backgroundColor: '#7f5cf1' }}>
              Reset Password
            </button>
          </form>
        </div>
        {/* Right Section - Welcome Back Message */}
        <div className="w-1/2 bg-gradient-to-r from-purple-500 to-purple-700 text-white flex flex-col justify-center items-center p-10 rounded-r-lg" style={{ background: 'linear-gradient(45deg, #7f5cf1, #5a3bed)' }}>
          <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-xl text-center leading-relaxed">
            Looking for talent or a new career? <br /> Sign in and make it happen!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
