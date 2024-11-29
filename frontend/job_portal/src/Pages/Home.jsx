import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './home.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate=useNavigate()
    const handleClick = () => {
        navigate('/jobsearch');
      };


    const [latestJobs, setLatestjobs]=useState([]);
    const [user, setUser] = useState(null);

    const handleNavigatetoAllJobs=()=>{
        navigate('/all-jobs',{state:{user}})
    }

    const validateSession = async () => {
        try {
          const sessionToken = localStorage.getItem("sessionToken");  
    
          if (!sessionToken) {
            console.log("No session token found");
            return;
          }
    
          const response = await axios.post('http://localhost:3000/api/dashboard', null, {
            headers: {
              Authorization: `Bearer ${sessionToken}`, 
            },
          });
    
          if (response.status === 200) {
            console.log("Session validated"); 
            setUser(response.data.user);
            console.log(user._id)
          }
        } catch (error) {
          console.error("Error validating session", error);
        }
      };
    
    

    useEffect(()=>{
       

        const fetchJobs=async()=>{
            try{
                const response=await axios.get('http://localhost:3000/api/jobs/latest');
                setLatestjobs(response.data.jobs);
               // console.log("Fetched jobs:", response.data.jobs);
            }
            catch(error){
                console.error("Error fetching Jobs",error)
            }
        };
        validateSession();

        fetchJobs();

    },[])
    
    const handleApplyNow = (jobId) => {
        if (user) {
            console.log("Applying for Job ID:", jobId);  
            console.log("Job ID:", jobId);
            console.log("Applicant ID:", user._id);
            navigate('/jobapplicationform', { state: { jobId, applicantId: user._id } });
          } else {
            alert("Please log in to apply for jobs.");
          }
      };
  return (
    <div className='Home'>
        <Navbar/>
        <div className="image">
            {/* <img src="/Images/Homepage.jpg" alt="" /> */}
            <div className='purple'></div>
            <div className="search">
                <p>
                    Find Your Dream Job Today !!
                </p>
                <input type="text"  placeholder='Search for jobs ' onClick={handleClick}/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg> */}


            </div>
            

        </div>

        {/* <div className="categories">
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
        </div> */}


        <div className="recent_jobs">
            <h1>Recent Jobs Available</h1>
            <div className="jobs">
                {latestJobs.map((job)=>(
                    <div className="section" key={job._id}>
                    
                        <div className="logo">
                            <img src="/Images/google logo.webp" alt="" />
                        </div>
                        <div className="text">
                            <h2>{job.title}</h2>
                            <p>{job.description}</p>
                            <div className="button">
                            <button onClick={()=>handleApplyNow(job._id)}>
                                Apply Now
                            </button>
                            
                            </div>
                        
                        </div>
                    
                        <hr />
                </div>
                ))}
                
                
            </div>
            
        </div>
        <div className="link">
            <a onClick={handleNavigatetoAllJobs}>View More </a>
        </div>

    <Footer/>    
    </div>
  )
}

export default Home