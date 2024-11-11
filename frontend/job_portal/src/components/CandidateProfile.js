import React from 'react';
import './CandidateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function CandidateProfile() {
  return (
    <div className="profile-container">
      <div className="sidebar">
        <h2>Job Portal</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Messages</li>
            <li>Company Profile</li>
            <li>All Applicants</li>
            <li>Job Listing</li>
            <li>My Schedule</li>
          </ul>
        </nav>
        <div className="profile-info">
          <img src="profile-pic-url.jpg" alt="User" />
          <p>Maria Kelly</p>
        </div>
      </div>

      <div className="content">
        <div className="header">
          <h2>Candidate Summary</h2>
          <button>View Details</button>
        </div>

        <div className="profile">
          <img src="profile-pic-url.jpg" alt="Candidate" />
          <div className="profile-details">
            <h3>Maria Kelly</h3>
            <p><FontAwesomeIcon icon={faBriefcase} /> Backend Developer</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Australia</p>
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
      </div>
    </div>
  );
}

export default CandidateProfile;
