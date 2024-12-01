import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {  useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';


const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const navigate= useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

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
            setLogoutModalOpen(false);

            
            navigate('/signin');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
  return (
    

    <>
    
    
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
                    <li onClick={()=>navigate('/about')}>About Us</li>
                    <li onClick={()=>navigate('/all-jobs')}>Jobs</li>
                    <li><a href='#contact'>Contact Us</a></li>
                </ul>
            </div>
            <div className="button">
                {isLoggedIn ? (
                    <>
                    <div className="notification-icon" 
                    onClick={()=>navigate('/notification')}
                    >
                               
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"  />
                        </svg>

                    </div>
            
                    <button onClick={()=>setLogoutModalOpen(true) } style={{ color: 'white' }}>
                        Logout
                    </button>
                    </>
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
         <LogoutModal
         isOpen={isLogoutModalOpen}
         onClose={() => setLogoutModalOpen(false)}
         onConfirm={handleLogout}
     />
     </>
    
    
  )
}

export default Navbar