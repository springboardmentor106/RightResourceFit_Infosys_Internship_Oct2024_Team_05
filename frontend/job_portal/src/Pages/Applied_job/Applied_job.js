import React, { useEffect } from "react";
import "./Applied_job.css";
import axios from "axios";
import { useState } from "react";
import DeleteModal from '../../components/DeleteModal'

const AppliedJobs = () => {
  // Dummy data for applied jobs
  // const dummyJobs = [
  //   {
  //     id: 1,
  //     title: "Sales Representative",
  //     company: "Google",
  //     description:
  //       "We are seeking a motivated and results-driven Sales Representative to join our growing team. The ideal candidate will have a passion for sales, excellent communication skills, and a desire to succeed in a dynamic and competitive environment.",
  //     appliedDate: "2024-03-15",
  //     status: "Under Review",
  //   },
  //   {
  //     id: 2,
  //     title: "Fullstack Designer",
  //     company: "Google",
  //     description:
  //       "We are looking for a skilled Fullstack Developer to build and maintain web applications from concept to deployment. You will work on both the front-end and back-end, ensuring that applications are robust, scalable, and user-friendly.",
  //     appliedDate: "2024-03-14",
  //     status: "Interview Scheduled",
  //   },
  //   {
  //     id: 3,
  //     title: "UX Designer",
  //     company: "Apple",
  //     description:
  //       "Creating user-centered designs for digital products and experiences.",
  //     appliedDate: "2024-03-13",
  //     status: "Pending",
  //   },
  //   {
  //     id: 4,
  //     title: "Product Manager",
  //     company: "Amazon",
  //     description:
  //       "Leading product development and strategy for consumer-facing applications.",
  //     appliedDate: "2024-03-12",
  //     status: "Under Review",
  //   },
  // ];
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);  
  // const [jobToDelete, setJobToDelete] = useState(null);    

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

      const handleDeleteApplication = async (jobId) => {
        try {
          const confirmDelete = window.confirm("Are you sure you want to delete this job application?");
          if (!confirmDelete) {
            return; 
          }
          const applicantId = user._id;
          const response = await axios.delete(`http://localhost:3000/api/applications/${applicantId}/${jobId}`);
          console.log("Delete response:", response.data.message);
    
          setAppliedJobs((prevJobs) => prevJobs.filter((job) => job.jobId._id !== jobId));
        } catch (error) {
          console.error("Error deleting job application", error);
        }
      };
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
    

  return (
    <div className="applied-jobs-container">
      <h1>Applied Jobs</h1>

      <div className="jobs-list">
        {appliedJobs.map((application) => (
          <div key={application.id} className="job-card">
            <div className="job-header">
              
              <div className="job-title-section">
                <h2>{application.jobId.title}</h2>
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
                <button className="edit-btn" >
                  Edit
                </button>
                <button onClick={() => handleDeleteApplication(application.jobId._id)} className="delete-btn" >
                  Delete
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
