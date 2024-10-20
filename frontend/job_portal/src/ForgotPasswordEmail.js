import React from 'react';
import './ForgotPasswordEmail.css';  // Import CSS for styling
 // Import eye icons

const ForgotPasswordEmail = () => {
  

  

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Forgot Password</h2>
          <br></br>
          <form className="signup-form">
            
           <input type="text" placeholder='Enter your Email Id'/>
            <div className="otp">
              <p>We will send you a 4-digit recovery code to your Email</p>
            </div>
            
            
            <div className='button-container' align="center">
              <button type="submit" className="signup-btn">Send Code</button>
            </div>
            
            
            
          </form>
        </div>
        <div className="signup-right">
          <h1>Welcome!</h1>
          <p>Even the best applicants and recruiters lose their way sometimes. Let's recover your password and get back on track!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
