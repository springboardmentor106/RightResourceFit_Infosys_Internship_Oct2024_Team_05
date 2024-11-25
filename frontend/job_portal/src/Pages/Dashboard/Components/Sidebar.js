// Sidebar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHome,
  faEnvelope,
  faBuilding,
  faUsers,
  faCalendarAlt,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setActiveContent }) => {
  const [isMinimized, setIsMinimized] = useState(false); // State for minimized sidebar
  const navigate=useNavigate()

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="logo" onClick={() => setIsMinimized(!isMinimized)}>
        <FontAwesomeIcon icon={faBriefcase} />
        <span className={isMinimized ? 'hidden' : ''}>Job Portal</span>
      </div>

      <ul className="nav-menu">
        <li className="nav-item" onClick={() => navigate('/hrdashboard')}>
          <FontAwesomeIcon icon={faHome} />
          <span className={isMinimized ? 'hidden' : ''}>Dashboard</span>
        </li>
        <li className="nav-item" onClick={() => setActiveContent("Messages")}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={isMinimized ? 'hidden' : ''}>
            Messages
            <span className="badge">1</span>
          </span>
        </li>
        <li className="nav-item" onClick={() => setActiveContent("Company Profile")}>
          <FontAwesomeIcon icon={faBuilding} />
          <span className={isMinimized ? 'hidden' : ''}>Company Profile</span>
        </li>
        <li className="nav-item" onClick={() => setActiveContent("All Applicants")}>
          <FontAwesomeIcon icon={faUsers} />
          <span className={isMinimized ? 'hidden' : ''}>All Applicants</span>
        </li>
        <li className="nav-item" onClick={() => navigate('/all-posted-jobs')}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span className={isMinimized ? 'hidden' : ''}>Job Listing</span>
        </li>
        <li className="nav-item" onClick={() => setActiveContent("My Schedule")}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span className={isMinimized ? 'hidden' : ''}>My Schedule</span>
        </li>
      </ul>

      <div className="settings-section">
        <h4 className={isMinimized ? 'hidden' : ''}>SETTINGS</h4>
        <ul>
          <li className="nav-item" onClick={() => setActiveContent("Settings")}>
            <FontAwesomeIcon icon={faCog} />
            <span className={isMinimized ? 'hidden' : ''}>Settings</span>
          </li>
          <li className="nav-item" onClick={() => setActiveContent("Help Center")}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span className={isMinimized ? 'hidden' : ''}>Help Center</span>
          </li>
        </ul>
      </div>

      <div className="profile-section">
        <img
          className="profile-pic"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
        />
        <div className={`profile-info ${isMinimized ? 'hidden' : ''}`}>
          <div className="profile-name">Maria Kelly</div>
          <div className="profile-role">Head of External Affairs</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
