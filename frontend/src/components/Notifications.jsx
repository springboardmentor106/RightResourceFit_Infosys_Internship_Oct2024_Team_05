import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get the auth token from localStorage or your auth context
      const token = localStorage.getItem('authToken');
      
      const response = await axios.get('/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`/api/notifications/${notificationId}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(notifications.filter(n => n._id !== notificationId));
      setAnchorEl(null); // Close menu after clicking
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <IconButton 
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            maxHeight: 400,
            width: '300px'
          }
        }}
      >
        {loading ? (
          <MenuItem disabled>Loading notifications...</MenuItem>
        ) : error ? (
          <MenuItem disabled>{error}</MenuItem>
        ) : notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem 
              key={notification._id}
              onClick={() => handleMarkAsRead(notification._id)}
              sx={{ whiteSpace: 'normal', padding: 2 }}
            >
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {notification.title}
                </Typography>
                <Typography variant="body2">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default Notifications; 