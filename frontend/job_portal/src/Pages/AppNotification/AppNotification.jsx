import React from 'react';
import './AppNotification.css';
import Navbar from '../../components/Navbar';
import { useState,useEffect } from 'react';
import axios from 'axios';

function AppNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = "671fcd064118d9c6b172a66e"; 
        const response = await axios.get(`http://localhost:3000/api/notifications/${userId}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <>
      <Navbar />
      <div className="notification-container">
      {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`notification-card ${
              notification.message.includes('accepted') ? 'accepted' : 'rejected'
            }`}
          >
            <h2>{`Job ${notification.message.includes('accepted') ? 'Accepted' : 'Rejected'}`} </h2>
            <p>{notification.message}</p>
          </div>
        ))}
       
        {/* <div className="notification-card accepted">
          <h2>Job Accepted For HR Manager</h2>
          <p>Your application for the position has been accepted!</p>
        </div>
        
        
        <div className="notification-card rejected">
          <h2>Job Rejected For Product Manager</h2>
          <p>Your application for the position has been rejected.</p>
        </div> */}
      </div>
    </>
  );
}

export default AppNotification;