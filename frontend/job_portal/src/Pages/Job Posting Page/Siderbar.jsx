import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">JobHuntly</h2>
      <ul className="sidebar-menu">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#messages">Messages</a></li>
        <li><a href="#company-profile">Company Profile</a></li>
        <li><a href="#all-applicants">All Applicants</a></li>
        <li><a href="#job-listing">Job Listing</a></li>
        <li><a href="#my-schedule">My Schedule</a></li>
      </ul>
      <div className="sidebar-settings">
        <a href="#settings">Settings</a>
        <a href="#help">Help Center</a>
      </div>
      <div className="sidebar-user">
        <img src="https://via.placeholder.com/40" alt="User Avatar" />
        <span>Maria Kelly</span>
      </div>
    </div>
  );
}

export default Sidebar;
