// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';



function Dashboard() {
  const navigate = useNavigate();
  const [latestJobs, setLatestJobs] = useState([]);

  const handlePostJobClick = () => {
    navigate('/jobpostingpage');}

    useEffect(() => {
      const fetchLatestJobs = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/jobs/latest');
          setLatestJobs(response.data.jobs); // Assuming backend sends { jobs: [...] }
        } catch (error) {
          console.error('Error fetching latest jobs:', error);
        }
      };
  
      fetchLatestJobs();
    }, []);

    const handleDeleteJob = async (jobId) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this job?");
      if(isConfirmed){
        try {
          await axios.delete('http://localhost:3000/api/jobs/delete', { data: { jobId } }); // Specify jobId in the data object
          setLatestJobs(latestJobs.filter(job => job._id !== jobId)); 
          // Update the UI after deletion
          alert("Job deleted successfully")
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      }
      
    };
    
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back</h1>
        <button className="post-job-btn" onClick={handlePostJobClick}>+ Post A Job</button>
      </header>

      <div className="stats">
        <div className="stat-item purple">
          <span>76</span>
          <p>New candidates to review</p>
        </div>
        <div className="stat-item green">
          <span>3</span>
          <p>Schedule for today</p>
        </div>
        <div className="stat-item blue">
          <span>24</span>
          <p>Messages received</p>
        </div>
      </div>

      <div className="job-updates">
        <h2>Job Updates</h2>
      </div>

      <div className="recent-jobs">
        <h2>Recently Posted Jobs</h2>

        {/* Row for first two job cards */}
        {/* <div className="job-row">
          <div className="job-card">
            <div className="job-info">
              <img src="https://via.placeholder.com/40" alt="company logo" />
              <div>
                <span className="job-type">Full-Time</span>
                <p>Web Developer</p>
                <small>5 applied of 10 capacity</small>
              </div>
            </div>
          </div>

          <div className="job-card">
            <div className="job-info">
              <img src="https://via.placeholder.com/40" alt="company logo" />
              <div>
                <span className="job-type">Part-Time</span>
                <p>Data Analyst</p>
                <small>2 applied of 5 capacity</small>
              </div>
            </div>
          </div>
        </div>

       
        <div className="job-row">
          <div className="job-card">
            <div className="job-info">
              <img src="https://via.placeholder.com/40" alt="company logo" />
              <div>
                <span className="job-type">Contract</span>
                <p>Project Manager</p>
                <small>8 applied of 12 capacity</small>
              </div>
            </div>
          </div>

          <div className="job-card">
            <div className="job-info">
              <img src="https://via.placeholder.com/40" alt="company logo" />
              <div>
                <span className="job-type">Internship</span>
                <p>UI/UX Designer</p>
                <small>3 applied of 6 capacity</small>
              </div>
            </div>
          </div>
        </div> */}

<div className="job-row">
          {latestJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-info">
                {/* <img src="https://via.placeholder.com/40" alt="company logo" /> */}
                <div>
                  <h1><span className="job-type">{job.title}</span></h1>
                  <p>{job.description}</p>
                  {/* <small>{job.appliedCount} applied of {job.capacity} capacity</small> */}
                 <div className="btn">
                    <button className=' post-job-btn edit'>Edit</button>
                    <button className='post-job-btn delete' onClick={() => handleDeleteJob(job._id)}>Delete</button>
                      
                 </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a href="/" className="view-more">View More &gt;&gt;</a>
      </div>
    </div>
  );
}

export default Dashboard;
