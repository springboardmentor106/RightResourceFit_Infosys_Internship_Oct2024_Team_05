
import React, { useState } from 'react';
import './SignUpPage.css'; 
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const RecruiterSignUpPage = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    companyName: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/recruiter-register', {
        email: formData.email,
        username: formData.username,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        password: formData.password,
      });

      // Handle success
      setSuccessMessage(response.data.message || 'Sign-up successful!');
      setErrorMessage('');
      setFormData({
        email: '',
        username: '',
        companyName: '',
        jobTitle: '',
        password: '',
        confirmPassword: '',
      });
      alert("User registered Successfully");
      navigate('/recruiter-sigin')
      
    } catch (err) {
      // Handle error
      setErrorMessage(err.response?.data?.message || 'An error occurred.');
      setSuccessMessage('');
      
    }
  };

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
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Username Field */}
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Company Name Field */}
            <div className="input-group">
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Job Title Field */}
            <div className="input-group">
              <input
                type="text"
                id="jobTitle"
                placeholder="Job Title (e.g., Hiring Manager)"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="input-group password-group">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="input-group password-group">
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>}

            
            {successMessage && <p className="success-message">{successMessage}</p>} */}

            {/* Submit Button */}
            <div className="button-container">
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </div>

            <p className="login-prompt">
              Already have an account? <Link to="/recruiter-sigin">Sign In</Link>
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

