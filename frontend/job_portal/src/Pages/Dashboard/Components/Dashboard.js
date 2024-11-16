// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import DeleteModal from '../../../components/DeleteModal';



function Dashboard() {
  const navigate = useNavigate();
  const [latestJobs, setLatestJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostJobClick = () => {
    navigate('/jobpostingpage');}

    useEffect(() => {
      const fetchLatestJobs = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/jobs/latest');
          setLatestJobs(response.data.jobs);
        } catch (error) {
          console.error('Error fetching latest jobs:', error);
        }
      };
  
      fetchLatestJobs();
    }, []);

    const handleDeleteJob = async (jobId,isConfirmed) => {

      // const isConfirmed = window.confirm("Are you sure you want to delete this job?");
      if (!isConfirmed) {
        setJobToDelete(jobId);
        setIsModalOpen(true);
        return;
      }

      setIsModalOpen(false);

      if(jobToDelete){
        try {
          await axios.delete('http://localhost:3000/api/jobs/delete', { data: { jobId:jobToDelete } }); // Specify jobId in the data object
          setLatestJobs(latestJobs.filter(job => job._id !== jobToDelete)); 
          // Update the UI after deletion
          alert("Job deleted successfully")
        } catch (error) {
          console.error("Error deleting job:", error);
        }
        setJobToDelete(null); 
      }
      
    };

    const handleEditJob=(job)=>{
        setEditJob(job)
        navigate('/jobpostingpage',{ state: { job } })
    }
    
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
                    <button className=' post-job-btn edit' onClick={()=>handleEditJob(job)}>Edit</button>
                    <button className='post-job-btn delete' onClick={() => handleDeleteJob(job._id,false)}>Delete</button>
                    <DeleteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={(isConfirmed) => handleDeleteJob(jobToDelete, isConfirmed)}
                    />
                      
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