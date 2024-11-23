import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./CandidateProfile.module.css";
import { useLocation } from "react-router-dom";

function CandidateProfile() {
    const location=useLocation();
    const applicant=location.state;
    // if (!applicant) {
    //     return <p>No applicant data found!</p>;
    //   }
    const [decision, setDecision] = useState(null);

    const handleAccept = () => {
        setDecision("Accepted");
        alert("The applicant has been accepted.");
    };

    const handleReject = () => {
        setDecision("Rejected");
        alert("The applicant has been rejected.");
    };

    return (
        <div className={styles.profileContainer}>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Candidate Summary</h2>
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
                    <img
                        src="profile-pic-url.jpg"
                        alt="Candidate"
                    />
                    <div className={styles.profileDetails}>
                        <h3>{applicant.firstName} {applicant.lastName}</h3>
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
                <div className={styles.experience}>
                    <h4>Work Experience</h4>
                    <p>Senior Backend Developer (Apr 2023 - Present) - USA</p>
                    <p>Backend Developer (2021 - 2023) - Portugal, USA</p>
                </div>
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
