import React, { useState } from 'react';
import './SignUpPage.css';  // Import CSS for styling
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons

const SignUpPage = () => {
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
          <h2>Sign Up</h2>
          <form className="signup-form">
            <div className="input-group">
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password"
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
              <button type="submit" className="signup-btn">Sign Up</button>
            </div>
            
            <p className="login-prompt">Already have an account? <Link to="/signin">Sign In</Link></p>
          </form>
        </div>
        <div className="signup-right">
          <h1>Welcome!</h1>
          <p>Sign up now to discover new opportunities or explore talent!</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
