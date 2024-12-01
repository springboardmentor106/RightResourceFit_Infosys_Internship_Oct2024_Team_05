import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../home.css'
import { useLocation } from 'react-router-dom';



function AllJobs() {
    const [jobs,setJobs]=useState([]);
    //const [user, setUser] = useState(null);
    const navigate=useNavigate();
    const location=useLocation();
    const user=location.state?.user || null;


    

    useEffect(()=>{
        const fetchJobs=async()=>{
            try {
                const response=await axios.get('http://localhost:3000/api/alljobs');
                setJobs(response.data.jobs)
                console.log("fetched jobs:",response.data.jobs)
                
            } catch (error) {
                console.error("Error Fetching all jobs from frontend")
            }
        }

        fetchJobs();
    },[])

    const handleApplyNow = (jobId) => {
        
            console.log("Applying for Job ID:", jobId);  
            navigate('/jobapplicationform', { state: { jobId, applicantId: user._id } });
          
      };
    
  return (
    <div>
        <Navbar/>
        <div className="recent_jobs">
            <h1>All Jobs</h1>
            <div className="jobs">
                {jobs.map((job)=>(
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
    </div>
  )
}

export default AllJobs