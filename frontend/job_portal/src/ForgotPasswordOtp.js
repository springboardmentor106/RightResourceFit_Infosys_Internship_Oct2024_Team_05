import React, { useState } from 'react';
import './ForgotPasswordOtp.css';  // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons

const ForgotPasswordOtp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Reset Password</h2>
          <br></br>
          <form className="signup-form">
            
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Enter your OTP"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="otp">
              <p>A 4-digit code has been sent to your email-id</p>
            </div>
            
            
            <div className='button-container' align="center">
              <button type="submit" className="signup-btn">Enter Code</button>
            </div>
            <div className='button-container' align="center">
              <button type="submit" className="signup-btn">Resend Code</button>
            </div>
            
            
          </form>
        </div>
        <div className="signup-right">
          <h1>Welcome!</h1>
          <p>Lost your password? Let's headhunt you a new one!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
