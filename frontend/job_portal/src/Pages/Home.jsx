import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './home.css'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'


const Home = () => {
  return (
    <div className='Home'>
        <Navbar/>
        <div className="image">
            <img src="/Images/Homepage.jpg" alt="" />
            <div className="search">
                <p>
                    Find Your Dream Job Today !!
                </p>
                <input type="text"  placeholder='Search for jobs '/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>


            </div>
            

        </div>

        <div className="categories">
            <h2>Explore By Category</h2>
            <div className="row">
                <div className="category">
                    <div className="content">
                        <img src='/Images/design_icon.jpg'></img>
                        

                        <p className='title'>DESIGN</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/sales_icon.png'></img>

                        <p className='title'>SALES</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/marketing_icon.png'></img>

                        <p className='title'>MARKETING</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/finance_icon.png'></img>

                        <p className='title'>FINANCE</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="category">
                <div className="content">
                    <img src='/Images/tech_icon.png'></img>

                        <p className='title'>TECHNOLOGY</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/eng_icon.png'></img>

                        <p className='title'>ENGINEERING</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/bussiness_icon.png'></img>

                        <p className='title'>BUSSINESS</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="category">
                <div className="content">
                    <img src='/Images/hr_icon.png'></img>

                        <p className='title'>HR</p>
                        <div className="arrow">
                            <p>486 Jobs Available</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="recent_jobs">
            <h1>Recent Jobs Available</h1>
            <div className="jobs">
                <div className="section">
                    <div className="logo">
                        <img src="/Images/google logo.webp" alt="" />
                    </div>
                    <div className="text">
                        <h2>Software Developer</h2>
                        <p>Google looking for a skilled Software Developer , working on innovative solutions that impact millions globally. Responsibilities include designing, coding, testing, and deploying scalable applications while collaborating with cross-functional teams.</p>
                        <div className="button">
                        <button>
                            Apply Now
                        </button>
                    </div>
                    </div>
                    
                </div>
                <div className="section">
                    <div className="logo">
                        <img src="/Images/google logo.webp" alt="" />
                    </div>
                    <div className="text">
                        <h2>Email Marketing</h2>
                        <p>Google looking for a skilled Software Developer , working on innovative solutions that impact millions globally. Responsibilities include designing, coding, testing, and deploying scalable applications while collaborating with cross-functional teams.</p>
                        <div className="button">
                        <button>
                            Apply Now
                        </button>
                    </div>
                    </div>
                    
                </div>
                <div className="section">
                    <div className="logo">
                        <img src="/Images/google logo.webp" alt="" />
                    </div>
                    <div className="text">
                        <h2>Brand Designer</h2>
                        <p>Google looking for a skilled Software Developer , working on innovative solutions that impact millions globally. Responsibilities include designing, coding, testing, and deploying scalable applications while collaborating with cross-functional teams.</p>
                        <div className="button">
                        <button>
                            Apply Now
                        </button>
                    </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        <div className="link">
            <a href="">View More </a>
        </div>

    <Footer/>    
    </div>
  )
}

export default Home