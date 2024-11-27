import React, { useState } from 'react';
import './ForgotPassword.css';  // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Forgot Password</h2>
          <br></br>
          <form className="signup-form">
            
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Enter your new Password"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input-group password-group">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm Password"
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            <div className='button-container' align="center">
              <button type="submit" className="signup-btn"><Link to='/'style={{ color: 'white' }}>Reset Password</Link></button>
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

export default ForgotPassword;
