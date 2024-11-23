import React, { useState } from 'react';
import './SignInPage.css'; 
import { Link } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const SignInPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Recruiter's Sign In</h2>
          <form className="login-form">
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
            <div className="login-options">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <br></br>
            <div className="button-group">
              <button type="submit" className="login-btn">Sign In</button>
              
            </div>
            <p className="sign-up">Not a member? <a href="/signup">Sign Up</a></p>
          </form>
        </div>
        <div className="login-right">
          <div className='login-right-text'>
            <h1>Welcome Back!</h1>
            <p>Welcome back, talent scout! Let’s find your next star performer.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
