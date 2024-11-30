import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./CandidateProfile.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CandidateProfile() {
    const location=useLocation();
    const navigate=useNavigate()
    const applicant=location.state;
    console.log(applicant)
    const [appStatus,setAppStatus]=useState("review")
    //console.log(applicant)
    // if (!applicant) {
    //     return <p>No applicant data found!</p>;
    //   }
    const [decision, setDecision] = useState(null);

    const handleAccept =async () => {
        setDecision("Accepted");
        setAppStatus("Accepted")
        alert("The applicant has been accepted.");
        navigate(`/applicants/${applicant.jobId}`,{ state: { appStatus:  "accepted"} })

        try {
            await axios.post('http://localhost:3000/api/notifications', {
              recipientId: applicant.applicantId, 
              type: 'status_update',
              jobId: applicant.jobId, 
              message: 'Your application has been accepted!'
            });
          } catch (error) {
            console.error("Error sending notification:", error);
          }
        
        
        

    };

    const handleReject =async () => {
        setDecision("Rejected");
        alert("The applicant has been rejected.");
        localStorage.setItem(applicant.applicantId, "Rejected");
        navigate(`/applicants/${applicant.jobId}`,{ state: { appStatus:"rejected"  } })


        try {
            await axios.post('http://localhost:3000/api/notifications', {
              recipientId: applicant.applicantId, 
              type: 'status_update',
              jobId: applicant.jobId, 
              message: 'Your application has been rejected.'
            });
          } catch (error) {
            console.error("Error sending notification:", error);
          }
    };

    return (
        <div className={styles.profileContainer}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Candidate Summary</h1>
                    <div className={styles.headerButtons}>
                        <button
                            onClick={handleAccept}
                            className={styles.acceptBtn}
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleReject}
                            className={styles.rejectBtn}
                        >
                            Reject
                        </button>
                    </div>
                </div>
                <div className={styles.profile}>
                    {/* <img
                        src="profile-pic-url.jpg"
                        alt="Candidate" 
                    /> */}
                    <div className={styles.profileDetails}>
                        <h2>{applicant.firstName} {applicant.lastName}</h2>
                        <p>Backend Developer</p>
                        <p>{applicant.gender}</p>
                    </div>
                </div>
                <div className={styles.about}>
                    <h4>About</h4>
                    <p>
                        I'm a backend developer with over 3 years of experience. 
                        I have a deep understanding of software principles and architecture...
                    </p>
                    <a href="https://github.com">Github.com</a>
                </div>
                <div className={styles.skills}>
                    <h4>Professional</h4>
                    <span>Java</span>
                    <span>Python</span>
                    <span>SQL</span>
                    <span>C</span>
                    <span>React.js</span>
                    <span>Git</span>
                    <span>MongoDB</span>
                </div>
                {/* <div className={styles.experience}>
                    <h4>Work Experience</h4>
                    <p>Senior Backend Developer (Apr 2023 - Present) - USA</p>
                    <p>Backend Developer (2021 - 2023) - Portugal, USA</p>
                </div> */}
                {applicant.resume && (
                    <div className={styles.resume}>
                        <h4>Resume</h4>
                        {/* Display the resume link */}
                        <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                            Click here to view the resume
                        </a>
                    </div>
                )}
                {decision && (
                    <div
                        className={`${styles.decision} ${
                            decision === "Accepted"
                                ? styles.accepted
                                : styles.rejected
                        }`}
                    >
                        Applicant {decision}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CandidateProfile;
