import React from 'react';
import './AppNotification.css';
import Navbar from '../../components/Navbar';

function AppNotification() {
  return (
    <>
      <Navbar />
      <div className="notification-container">
        {/* Accepted Notification */}
        <div className="notification-card accepted">
          <h2>Job Accepted For HR Manager</h2>
          <p>Your application for the position has been accepted!</p>
        </div>
        
        {/* Rejected Notification */}
        <div className="notification-card rejected">
          <h2>Job Rejected For Product Manager</h2>
          <p>Your application for the position has been rejected.</p>
        </div>
      </div>
    </>
  );
}

export default AppNotification;