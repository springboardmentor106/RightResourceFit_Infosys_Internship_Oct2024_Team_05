import React, { useState } from "react";
import "./SignUpPage.css"; // Import CSS for styling
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const SignUpPage = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Success state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Update state when input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    const { email, username, password, confirmPassword } = formData;

    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }


    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          email,
          username,
          password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (e.g., redirect to login)
        alert("User registered successfully!");

        setSuccess(true); // Set success state
        setTimeout(() => {
          navigate("/signin"); // Redirect after 2 seconds
        }, 1000); // 1 seconds delay
      } else {
        // Handle error response
        setErrorMessage(data.message || "Registration failed");
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // setErrorMessage(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group password-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ?  <FaEye />:<FaEyeSlash /> }
              </span>
            </div>
            <div className="input-group password-group">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordShown ?  <FaEye />:<FaEyeSlash /> }
              </span>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="button-container" align="center">
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </div>

            <p className="login-prompt">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
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
