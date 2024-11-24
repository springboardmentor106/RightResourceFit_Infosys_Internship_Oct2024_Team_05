import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [activeContent, setActiveContent] = useState("Profile");

  return (
    <div className="profile-page">
      {/* Sidebar Component */}
      <Sidebar setActiveContent={setActiveContent} />

      <div className="main-content">
        {activeContent === "Profile" && (
          <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header">
              <h1>👤 Your Profile</h1>
              <p>Manage your profile information and keep it up to date.</p>
            </div>

            {/* Grid Layout for Cards */}
            <div className="profile-grid">
              {/* Personal Details */}
              <div className="profile-card">
                <h2>Personal Details</h2>
                <div className="profile-detail">
                  <strong>Name:</strong> <span>John Doe</span>
                </div>
                <div className="profile-detail">
                  <strong>Phone Number:</strong> <span>+1 234 567 890</span>
                </div>
                <div className="profile-detail">
                  <strong>Email ID:</strong> <span>john.doe@example.com</span>
                </div>
                <div className="profile-detail">
                  <strong>Company Role:</strong> <span>Software Engineer</span>
                </div>
              </div>

              {/* Professional Links */}
              <div className="profile-card">
                <h2>Professional Links</h2>
                <div className="profile-detail">
                  <strong>LinkedIn:</strong>{" "}
                  <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
                    View LinkedIn Profile
                  </a>
                </div>
                <div className="profile-detail">
                  <strong>Website:</strong>{" "}
                  <a href="https://johndoe.dev" target="_blank" rel="noopener noreferrer">
                    johndoe.dev
                  </a>
                </div>
                <div className="profile-detail">
                  <strong>Industry Experience:</strong> <span>5 years in Web Development</span>
                </div>
              </div>

              {/* Statistics */}
              <div className="profile-card stats-card">
                <h2 className="statistics">📊 Statistics</h2>
                <div className="stat-detail">
                  <span className="stat-number">25</span>
                  <span className="stat-label">Jobs Posted</span>
                </div>
                <div className="stat-detail">
                  <span className="stat-number">120</span>
                  <span className="stat-label">Applications Received</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="button-container">
              <button className="edit-profile-button">✏️ Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
