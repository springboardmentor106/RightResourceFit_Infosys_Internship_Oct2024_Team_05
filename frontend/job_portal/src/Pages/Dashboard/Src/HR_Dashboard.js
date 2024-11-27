// src/App.js
import React from 'react';
import Sidebar from '../Components/Sidebar';

import Dashboard from '../Components/Dashboard';
import './App.css';

function HR_Dashboard() {
  return (
    <div className="app">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default HR_Dashboard;
