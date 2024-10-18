import React from "react";
import "./forgotPassword_otp.css"; // Import CSS for styling

const ForgotPasswordOtp = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-left">
          <h2>FORGOT PASSWORD</h2>
          <form className="forgot-password-form">
            <p className="text-gray-600 mb-6">
              .A 4-digit code has been sent to your Email-Id
            </p>

            <div className="input-group">
              <input
                type="text"
                id="otp"
                maxLength="4"
                placeholder="Enter OTP"
              />
            </div>
            <button type="submit" className="forgot-password-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="forgot-password-right">
          <h1>Welcome Back!</h1>
          <p>Looking for talent or a new career? Sign in and make it happen!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
