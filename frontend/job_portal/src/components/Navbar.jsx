import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {  useLocation } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage'
import SignUpPage from '../Pages/SignUpPage'


const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
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
                
                <button>
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </button>
                <button>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </button>
            </div>

        </div>
    
    
  )
}

export default Navbar