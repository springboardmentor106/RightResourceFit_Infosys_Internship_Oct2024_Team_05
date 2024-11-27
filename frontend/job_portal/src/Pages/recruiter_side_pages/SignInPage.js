import React, { useState } from 'react';
import './SignInPage.css'; 
import { Link } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignInPage = () => {

  const navigate=useNavigate()
  const [passwordShown, setPasswordShown] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  //const history = useHistory();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/recruiter-login', {
        username,
        password,
      });

      // On successful login
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // Redirect to another page (e.g., dashboard) after successful login
      //history.push('/dashboard');
      alert('Logged-In successfully')
      const profileData = localStorage.getItem('profileData');
    
    // If profile data exists, navigate to the dashboard
    if (profileData) {
      navigate('/hrdashboard');
    } else {
      // If no profile data, redirect to profile creation form
      navigate('/recruiter-details-form');
    }


    } catch (err) {
      // Handle error (invalid credentials or server error)
      // setErrorMessage(err.response?.data?.message || 'An error occurred.');
      // setSuccessMessage('');
      // console.log(errorMessage)
      // console.log(err.response.data)
      console.log(err)
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Recruiter's Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" id="username" placeholder="Username"  value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <p className="sign-up">Not a member? <a href="/recruiter-sigup">Sign Up</a></p>
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
