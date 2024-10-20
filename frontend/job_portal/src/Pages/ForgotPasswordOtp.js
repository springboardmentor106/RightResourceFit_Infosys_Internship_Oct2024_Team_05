import React, { useState, useEffect } from 'react';
import './ForgotPasswordOtp.css';  // Import CSS for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons

const ForgotPasswordOtp = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const [otp, setOtp] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially

  // Toggle password visibility (OTP visibility)
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle form submission for OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit OTP to backend (implement your backend request here)
    console.log('Entered OTP:', otp);
  };

  // Resend OTP logic
  const handleResend = async () => {
    setIsResendDisabled(true); // Disable the resend button
    setTimer(60); // Reset the timer to 60 seconds
    // Implement resend OTP request logic here
    console.log('OTP resent');
  };

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable resend button after 60 seconds
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Reset Password</h2>
          <br />
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="otp"
                placeholder="Enter your OTP"
                value={otp}
                onChange={handleOtpChange}
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="otp">
              <p>A 4-digit code has been sent to your email</p>
            </div>

            <div className="button-container" align="center">
              <button type="submit" className="signup-btn">
                Enter Code
              </button>
            </div>

            <div className="button-container" align="center">
              <button
                type="button"
                className="signup-btn"
                onClick={handleResend}
                disabled={isResendDisabled}
              >
                Resend Code {isResendDisabled && `(${timer}s)`}
              </button>
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
