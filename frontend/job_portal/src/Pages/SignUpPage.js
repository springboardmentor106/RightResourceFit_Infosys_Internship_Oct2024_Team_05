import React from 'react';
import './SignUpPage.css';  // Import CSS for styling

const SignUpPage = () => {
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
          <div className="input-group">
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <input type="password" id="confirm-password" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
          <div className="google-signup">
            <button className="google-btn">Continue with Google</button>
          </div>
          <p className="login-prompt">Already have an account? <a href="#">Login</a></p>
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
