import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./ProfilePage.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const ProfilePage = () => {
  const [activeContent, setActiveContent] = useState("Profile");
  const [recruiterDetails, setRecruiterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if profile data is in localStorage
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      console.log("Profile loaded from localStorage:", parsedProfile); // Log the profile here
    }
  }, []);

  if (!profile) {
    return <div>Loading or Profile data not available</div>;
  }



  // If profile is not available, show a loading state or a message
  
 

  // const fetchRecruiterDetails = async () => {
  //   try {
  //     const sessionToken = localStorage.getItem('sessionToken');  // Assuming session token is stored in localStorage

  //     if (!sessionToken) {
  //       throw new Error('No session token found.');
  //     }

  //     // Call the backend to validate session and fetch recruiter details
  //     const response = await axios.get('http://localhost:3000/api/recruiter/validate-session', {
  //       headers: {
  //         Authorization: `Bearer ${sessionToken}`,
  //       },
  //     });

  //     return response.data.recruiter;
  //   } catch (error) {
  //     console.error('Error fetching recruiter details:', error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   const getRecruiterDetails = async () => {
  //     try {
  //       const details = await fetchRecruiterDetails();
  //       console.log('Fetched Recruiter Details:',details)  // Fetch recruiter details
  //       setRecruiterDetails(details);
  //       console.log(recruiterDetails)
  //     } catch (error) {
  //       setError('Failed to load recruiter details.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getRecruiterDetails();
  // }, []);


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
                  <strong>Username:</strong> <span>{profile.user.username || "Give username"}</span>
                </div>
                <div className="profile-detail">
                  <strong>Phone Number:</strong> <span>{profile.user.contactNumber || "Enter Phone Number"}</span>
                </div>
                <div className="profile-detail">
                  <strong>Email ID:</strong> <span>{profile.user.email || "Enter Email"}</span>
                </div>
                <div className="profile-detail">
                  <strong>Company Role:</strong> <span>{profile.user.role || "Enter role"}</span>
                </div>
              </div>

              {/* Professional Links */}
              <div className="profile-card">
                <h2>Professional Links</h2>
                <div className="profile-detail">
                  <strong>LinkedIn:</strong>{" "}
                  <a href="{profile.user.address }" target="_blank" rel="noopener noreferrer">
                  {profile.user.address ? "View LinkedIn Profile" : "No LinkedIn Profile"}
                  </a>
                </div>
                <div className="profile-detail">
                  <strong>Website:</strong>{" "}
                  <a href="https://johndoe.dev" target="_blank" rel="noopener noreferrer">
                  {profile.user.website ? profile.website : "No website provided"}
                  </a>
                </div>
                <div className="profile-detail">
                  <strong>Industry Experience:</strong> <span>{profile.user.experience ? `${profile.user.experience} years in ${profile.user.company} as ${profile.user.role}` : "No experience details provided"}</span>
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
              <button className="edit-profile-button" onClick={()=>navigate('/hr-profile')}>✏️ Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
