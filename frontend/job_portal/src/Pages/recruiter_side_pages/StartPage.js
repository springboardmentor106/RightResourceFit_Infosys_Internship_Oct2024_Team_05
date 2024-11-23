import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "recruiter") {
      navigate("/recruiter");
    } else {
      navigate("/applicant");
    }
  };

  return (
    <div className="start-page">
      <h1>How do you want to proceed?</h1>
      <p>Select your role to continue:</p>
      <div className="button-container">
        <button
          className="start-btn"
          onClick={() => handleSelection("recruiter")}
        >
          I'm a Recruiter
        </button>
        <button
          className="start-btn"
          onClick={() => handleSelection("applicant")}
        >
          I'm an Applicant
        </button>
      </div>
    </div>
  );
};

export default StartPage;
