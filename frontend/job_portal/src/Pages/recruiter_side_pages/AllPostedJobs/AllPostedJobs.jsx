import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../Dashboard/Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/DeleteModal';
import { useLocation } from 'react-router-dom';



function AllPostedJobs() {
    const navigate = useNavigate();
    const [jobs,setJobs]=useState([]);
    const [editJob, setEditJob] = useState(null);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleViewApplicants = (jobId) => {
        navigate(`/applicants/${jobId}`);
    };

    const handleEditJob=(job)=>{
        setEditJob(job)
        navigate('/jobpostingpage',{ state: { job } })
    }
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
            setJobs(jobs.filter(job => job._id !== jobToDelete)); 
            // Update the UI after deletion
            alert("Job deleted successfully")
          } catch (error) {
            console.error("Error deleting job:", error);
          }
          setJobToDelete(null); 
        }
        
      };
  

  return (
    <>
    <Sidebar/>
    <div className="dashboard">
    <div className="recent-jobs">
        <h1>All Posted Jobs</h1>
    <div className="job-row">
          {jobs.map((job) => (
            <div className="job-card" key={job._id} onClick={() => handleViewApplicants(job._id)}>
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
    </div>
    </div>
    
    
    </>
    
  )
}

export default AllPostedJobs