import React from 'react';
import './forgotPassword_email.css'; // Import CSS for styling

const ForgotPasswordEmail = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-left">
          <h2>FORGOT PASSWORD</h2>
          
          <form className="forgot-password-form">
            <p className="text-gray-600 mb-6">We will send you a recovery code to set or reset your password</p>
            <div className="input-group">
              <input type="email" id="email" placeholder="Enter Email Id" />
            </div>
            <button type="submit" className="forgot-password-btn">Send Code</button>
          </form>
        </div>
        <div className="forgot-password-right">
          <h1>Welcome Back!</h1>
          <p>Looking for talent or a new career? Sign in and make it happen!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
