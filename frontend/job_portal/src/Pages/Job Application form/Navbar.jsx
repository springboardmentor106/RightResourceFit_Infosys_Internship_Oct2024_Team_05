// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Job Portal</h1>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#jobs">Jobs</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
