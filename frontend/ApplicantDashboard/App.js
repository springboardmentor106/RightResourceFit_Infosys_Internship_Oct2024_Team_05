import React from "react";
import "./App.css";  // Import CSS

const App = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fas fa-briefcase"></i>
        <span>JobHuntly</span>
      </div>

      <ul className="nav-menu">
        <li className="nav-item active">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <i className="fas fa-envelope"></i>
          <span>
            Messages <span className="notification">1</span>
          </span>
        </li>
        <li className="nav-item">
          <i className="fas fa-building"></i>
          <span>Company Profile</span>
        </li>
        <li className="nav-item">
          <i className="fas fa-users"></i>
          <span>All Applicants</span>
        </li>
        <li className="nav-item">
          <i className="fas fa-briefcase"></i>
          <span>Job Listing</span>
        </li>
        <li className="nav-item">
          <i className="fas fa-calendar-alt"></i>
          <span>My Schedule</span>
        </li>
      </ul>

      <div className="settings-section">
        <h4>SETTINGS</h4>
        <ul>
          <li className="nav-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </li>
          <li className="nav-item">
            <i className="fas fa-question-circle"></i>
            <span>Help Center</span>
          </li>
        </ul>
      </div>

      <div className="profile-section">
        <img
          className="profile-pic"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Maria Kelly"
        />
        <span className="profile-name">Maria Kelly</span>
        <span className="profile-role">Head of External Affairs</span>
      </div>
    </div>
  );
};

export default App;
