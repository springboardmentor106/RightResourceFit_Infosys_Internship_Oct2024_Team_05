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
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LogoutModal from "../../../components/LogoutModal";

const Sidebar = ({ setActiveContent }) => {
  const [isMinimized, setIsMinimized] = useState(false); // State for minimized sidebar
  const navigate=useNavigate()
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    // Check if profile data is in localStorage
    //const storedProfile = localStorage.getItem('profileData');
    const storedUserDetails = localStorage.getItem("userDetails");
    // if (storedProfile) {
    //   setProfile(JSON.parse(storedProfile));
    // }
    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails);
      setProfile(parsedUserDetails);
      //console.log("UserDetails loaded from localStorage:", parsedUserDetails);
    }
  }, []);
  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const handleButtonClick=()=>{
    if(profile){
     // localStorage.removeItem('profileData');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('sessionToken'); 
      setProfile(null)
      setIsModalOpen(false); 
      navigate('/recruiter-sigin');
    }
    else{
      navigate('/recruiter-sigin');
    }
  }

  const handleLogoutClick = () => {
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

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
        <li className="nav-item" onClick={() => navigate('/messages')}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={isMinimized ? 'hidden' : ''}>
            Messages
            <span className="badge"></span>
          </span>
        </li>
        <li className="nav-item" onClick={()=>navigate('/hr-profilePage')}>
          <FontAwesomeIcon icon={faBuilding} />
          <span className={isMinimized ? 'hidden' : ''} >Company Profile</span>
        </li>
        <li className="nav-item" onClick={() => setActiveContent("All Applicants")}>
          <FontAwesomeIcon icon={faUsers} />
          <span className={isMinimized ? 'hidden' : ''}>All Applicants</span>
        </li>
        <li className="nav-item" onClick={() => navigate('/all-posted-jobs')}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span className={isMinimized ? 'hidden' : ''}>Job Listing</span>
        </li>
        {/* <li className="nav-item" onClick={() => setActiveContent("My Schedule")}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span className={isMinimized ? 'hidden' : ''}>My Schedule</span>
        </li> */}
      </ul>

      {/* <div className="settings-section">
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
      </div> */}
      <div className="logout">
  <button
    style={{
      backgroundColor: '#ff4d4f', 
      color: 'white',
      fontSize: '16px', 
      padding: '10px 20px', 
      border: 'none', 
      borderRadius: '5px', 
      cursor: 'pointer', 
      transition: 'background-color 0.3s, transform 0.2s',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#e43c3d')} 
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff4d4f')}
    onClick={handleLogoutClick}
  >
    {profile ? 'Logout' : 'Sign In'}
  </button>
</div>
      <div className="profile-section">
        <img
          className="profile-pic"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          onClick={()=>navigate('/hr-profilePage')}
        />
        <div className={`profile-info ${isMinimized ? 'hidden' : ''}`}>
          <div className="profile-name" onClick={()=>navigate('/hr-profilePage')}>{profile.username || "Give username"}</div>
          <div className="profile-role">{profile.role} in {profile.company}</div>
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleButtonClick}
      />
    </div>
  );
};

export default Sidebar;
