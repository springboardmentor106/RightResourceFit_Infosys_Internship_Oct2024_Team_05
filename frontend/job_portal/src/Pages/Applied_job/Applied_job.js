import React, { useEffect } from "react";
import "./Applied_job.css";
import axios from "axios";
import { useState } from "react";
import DeleteModal from '../../components/DeleteModal'
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";



const AppliedJobs = () => {
  
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [jobToDelete, setJobToDelete] = useState(null);  
  
  const navigate=useNavigate();

  const openDeleteModal = (jobId) => {
    setJobToDelete(jobId);  // Store the job ID to be deleted
    setIsModalOpen(true);    // Open the modal
  };
  
  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

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
            console.log("Session validated",response.data.user); 
            setUser(response.data.user);
            console.log(user._id)
          }
        } catch (error) {
          console.error("Error validating session", error);
        }
      };

      const fetchAppliedJobs = async (applicantId) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/applications/${applicantId}`);
          console.log("Jobs received from backend:", response.data.applications)
          setAppliedJobs(response.data.applications);
        } catch (error) {
          console.error("Error fetching applied jobs", error);
        }
      };
      useEffect(() => {
        const initialize = async () => {
          await validateSession(); 
        };
        initialize();
      }, []);
    
      useEffect(() => {
        if (user?._id) {
          fetchAppliedJobs(user._id); 
        }
      }, [user]);

     

      // const handleDeleteApplication = async (jobId) => {
      //   try {
      //     const confirmDelete = window.confirm("Are you sure you want to delete this job application?");
      //     if (!confirmDelete) {
      //       return; 
      //     }
      //     const applicantId = user._id;
      //     const response = await axios.delete(`http://localhost:3000/api/applications/${applicantId}/${jobId}`);
      //     console.log("Delete response:", response.data.message);
    
      //     setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.jobId._id !== jobId));
      //   } catch (error) {
      //     console.error("Error deleting job application", error);
      //   }
      // };
      // const handleDeleteApplication = (jobId) => {
      //   setJobToDelete(jobId);
      //   setIsModalOpen(true); // Show the delete confirmation modal
      // };
    
      // // Confirm delete and remove the job from state
      // const confirmDelete = async () => {
      //   try {
      //     const applicantId = user._id;
      //     const response = await axios.delete(
      //       `http://localhost:3000/api/applications/${applicantId}/${jobToDelete}`
      //     );
      //     console.log('Delete response:', response.data.message);
    
      //     // Remove the deleted job from the list in state
      //     setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.jobId._id !== jobToDelete));
    
      //     // Close the modal after deletion
      //     setIsModalOpen(false);
      //   } catch (error) {
      //     console.error('Error deleting job application', error);
      //   }
      // };
    
      // // Close the modal
      // const closeModal = () => {
      //   setIsModalOpen(false);
      // };
      const handleEditApplication = (jobId) => {
        const applicationData = appliedJobs.find((application) => application.jobId._id === jobId);
        navigate('/jobapplicationform', {
          state: {
            jobId: jobId,
            applicantId: user._id,
            applicationData,
          },
        });
      };

      const handleDeleteApplication = async () => {
        try {
          if (!jobToDelete) return;
    
          const applicantId = user._id;
          const response = await axios.delete(
            `http://localhost:3000/api/applications/${applicantId}/${jobToDelete}`
          );
          console.log("Delete response:", response.data.message);
    
          setAppliedJobs((prevJobs) =>
            prevJobs.filter((job) => job.jobId._id !== jobToDelete)
          );
          alert("Job Application deleted Successfully")
    
          setIsModalOpen(false); 
        } catch (error) {
          console.error("Error deleting job application", error);
        }
      };
    

  return (
    <>
      <Navbar/>
    <div className="applied-jobs-container">
      
      <h1>Applied Jobs</h1>

      <div className="jobs-list">
        {appliedJobs.map((application) => (
          <div key={application.id} className="job-card">
            <div className="job-header">
              
              <div className="job-title-section">
                <h2>{application.jobId.title} </h2>
                {/* <p className="company-name">{job.company}</p> */}
              </div>
              
            </div>

            <div className="job-content">
              <p className="job-description">{application.jobId.description}</p>
              <div className="job-footer">
                <span className="applied-date">
                  Location: {application.jobId.location}
                </span>
                <span className="status-badge">Email:  {application.email}</span>
              </div>
            </div>
            <div className="action-buttons">
                <button onClick={()=>handleEditApplication(application.jobId._id)} className="edit-btn" >
                  Edit
                </button>
                {/* <button onClick={() => handleDeleteApplication(application.jobId._id)} className="delete-btn" >
                  Delete
                </button> */}
                <button
                  onClick={() => openDeleteModal(application.jobId._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
    <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteApplication}
      />
    </>
  );
};

export default AppliedJobs;
