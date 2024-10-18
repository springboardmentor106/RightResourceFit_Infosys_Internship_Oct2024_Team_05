import React from 'react';
import './createPassword_new.css'; // Import CSS for styling

const CreatePasswordNew = () => {
  return (
    <div className="create-password-page">
      <div className="create-password-container">
        <div className="create-password-left">
          <h2>FORGOT PASSWORD</h2>
          <form className="create-password-form">
            <div className="input-group">
              <input type="password" id="new-password" placeholder="Enter New Password" />
            </div>
            <div className="input-group">
              <input type="password" id="confirm-password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="create-password-btn">Reset Password</button>
          </form>
        </div>
        <div className="create-password-right">
          <h1>Welcome Back!</h1>
          <p>Looking for talent or a new career? Sign in and make it happen!</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordNew;
