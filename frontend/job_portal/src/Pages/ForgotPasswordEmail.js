import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './ForgotPasswordEmail.css';


const ForgotPasswordEmail = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          email
        },
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/forgotpasswordotp'); // Redirect to reset password page
        }, 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('Failed to send recovery code');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Forgot Password</h2>
          <br />
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your Email Id"
              value={email}
              onChange={handleChange}
            />
            <div className="otp">
              <p>We will send you a 4-digit recovery code to your Email</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Code sent! Redirecting...</p>}
            <div className="button-container" align="center">
              <button type="submit" className="signup-btn" style={{ color: 'white' }}><Link to='/forgotpasswordotp'> Send Code</Link>
               
              </button>
            </div>
          </form>
        </div>
        <div className="signup-right">
          <h1>Welcome!</h1>
          <p>
            Even the best applicants and recruiters lose their way sometimes. Let's recover your
            password and get back on track!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
