import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const LoginPage = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(false); // Reset success state
    const { username, password } = formData;

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          username,
          password,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("User logged-in successfully!");

        // Handle successful login, e.g., save session token to local storage
        localStorage.setItem("sessionToken", data.sessionToken);
        setSuccess(true);
        setTimeout(() => {
          navigate("/"); // Redirect to a dashboard or home page
        }, 1000); // 1 seconds delay
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("Failed to log in");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Login successful!</p>}
            <div className="login-options">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <br />
            <div className="button-group">
              <button type="submit" className="login-btn">
                Sign In
              </button>
            </div>
            <p className="sign-up">
              Not a member? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
        <div className="login-right">
          <div className="login-right-text">
            <h1>Welcome Back!</h1>
            <p>
              Looking for talent or a new career? Sign in and make it happen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
