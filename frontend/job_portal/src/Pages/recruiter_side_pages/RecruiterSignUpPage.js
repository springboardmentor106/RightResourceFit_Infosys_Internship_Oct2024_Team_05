import React, { useState } from 'react';
import './SignUpPage.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const RecruiterSignUpPage = () => {
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
          <h2>Recruiter's Sign Up</h2>
          <form className="signup-form">
            {/* Email Field */}
            <div className="input-group">
              <input type="email" id="email" placeholder="Email" required />
            </div>

            {/* Username Field */}
            <div className="input-group">
              <input type="text" id="username" placeholder="Username" required />
            </div>

            {/* Company Name Field */}
            <div className="input-group">
              <input type="text" id="company-name" placeholder="Company Name" required />
            </div>

            {/* Job Title Field */}
            <div className="input-group">
              <input type="text" id="job-title" placeholder="Job Title (e.g., Hiring Manager)" required />
            </div>

            {/* Password Field */}
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="input-group password-group">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm Password"
                required
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit Button */}
            <div className="button-container">
              <button type="submit" className="signup-btn">Sign Up</button>
            </div>

            <p className="login-prompt">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
        <div className="signup-right">
          <h1>Welcome!</h1>
          <p>Ready to transform recruitment? Join us and make hiring a breeze!</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSignUpPage;
