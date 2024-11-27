import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Notifications from './Notifications';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Notifications />
          {/* Add other header items here (e.g., user menu, login/logout buttons) */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;