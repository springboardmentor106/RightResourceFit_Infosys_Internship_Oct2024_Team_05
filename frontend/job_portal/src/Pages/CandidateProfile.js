import React, { useState } from 'react'; 
import Sidebar from './Sidebar'; 
import './CandidateProfile.css';

function CandidateProfile() {
  const [decision, setDecision] = useState(null); // Track HR's decision

  const handleAccept = () => {
    setDecision("Accepted");
    alert("The applicant has been accepted.");
    // Add logic to save decision to database if needed
  };

  const handleReject = () => {
    setDecision("Rejected");
    alert("The applicant has been rejected.");
    // Add logic to save decision to database if needed
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <h2>Candidate Summary</h2>
          <div className="header-buttons">
            <button onClick={handleAccept} className="accept-btn">Accept</button>
            <button onClick={handleReject} className="reject-btn">Reject</button>
          </div>
        </div>
        <div className="profile">
          <img src="profile-pic-url.jpg" alt="Candidate" />
          <div className="profile-details">
            <h3>Maria Kelly</h3>
            <p>Backend Developer</p>
            <p>Australia</p>
          </div>
        </div>
        <div className="about">
          <h4>About</h4>
          <p>
            I'm a backend developer with over 3 years of experience. I have a deep understanding of software
            principles and architecture...
          </p>
          <a href="https://github.com">Github.com</a>
        </div>
        <div className="skills">
          <h4>Professional</h4>
          <span>Java</span>
          <span>Python</span>
          <span>SQL</span>
          <span>C</span>
          <span>React.js</span>
          <span>Git</span>
          <span>MongoDB</span>
        </div>
        <div className="experience">
          <h4>Work Experience</h4>
          <p>Senior Backend Developer (Apr 2023 - Present) - USA</p>
          <p>Backend Developer (2021 - 2023) - Portugal, USA</p>
        </div>
        {decision && <div className={`decision ${decision.toLowerCase()}`}>Applicant {decision}</div>}
      </div>
    </div>
  );
}

export default CandidateProfile;

