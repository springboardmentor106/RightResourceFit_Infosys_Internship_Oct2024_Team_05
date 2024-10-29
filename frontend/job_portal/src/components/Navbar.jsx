import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {  useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const navigate= useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for session token in localStorage to determine login status
        const sessionToken = localStorage.getItem("sessionToken");
        setIsLoggedIn(!!sessionToken); // 
    }, []);
    const handleLogout = async () => {
        try {
            const sessionToken = localStorage.getItem("sessionToken");

            await axios.post(
                "http://localhost:3000/api/logout", 
                {}, 
                { headers: { Authorization: `Bearer ${sessionToken}` } }
            );

            localStorage.removeItem("sessionToken");
            setIsLoggedIn(false);

            
            navigate('/signin');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
  return (
    

    
    
    
        <div className={`container ${isHomePage ? 'navbar-transparent' : 'navbar-solid'}`}>

            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                </svg>

                <p>Job Portal</p>

            </div>
            <div className="list">
                <ul>
                    
                    <li><Link to="/">Home</Link></li>
                    <li>About Us</li>
                    <li>Jobs</li>
                    <li><a href='#contact'>Contact Us</a></li>
                </ul>
            </div>
            <div className="button">
                {isLoggedIn ? (
            
                    <button onClick={handleLogout} style={{ color: 'white' }}>
                        Logout
                    </button>
                ) : (
            
                    <button>
                        <Link to="/signin" className="nav-link" style={{ color: 'white' }}>Sign In</Link>
                    </button>
                )}
                
                {/* <button  >
                    <Link to="/signin" className="nav-link" style={{ color: 'white' }}>Sign In</Link>
                </button> */}
                {/* <button >
                    <Link to="/signup" className="nav-link" style={{ color: 'white' }}>Sign Up</Link>
                </button> */}
            </div>

        </div>
    
    
  )
}

export default Navbar