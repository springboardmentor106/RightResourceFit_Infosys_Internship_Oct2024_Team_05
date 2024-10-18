import React from 'react';
import './LoginPage.css';  

const LoginPage = () => {
  return (
    <div className="login-page">
        <div className="login-container">
      <div className="login-left">
        <h2>Sign In</h2>
        <form className="login-form">
          <div className="input-group">
            
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="input-group">
            
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="login-options">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <div className="google-login">
            <button className="google-btn">Continue with Google</button>
          </div>
          <p className="sign-up">Not a member? <a href="/signup">Sign Up</a></p>
        </form>
      </div>
      <div className="login-right">
        <h1>Welcome Back!</h1>
        <p>Looking for talent or a new career? Sign in and make it happen!</p>
      </div>
    </div>
    </div>
    
  );
};

export default LoginPage;