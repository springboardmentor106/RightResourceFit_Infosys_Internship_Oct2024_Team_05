import React from "react";
import "./Applied_job.css";

const AppliedJobs = () => {
  // Dummy data for applied jobs
  const dummyJobs = [
    {
      id: 1,
      title: "Sales Representative",
      company: "Google",
      description:
        "We are seeking a motivated and results-driven Sales Representative to join our growing team. The ideal candidate will have a passion for sales, excellent communication skills, and a desire to succeed in a dynamic and competitive environment.",
      appliedDate: "2024-03-15",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Fullstack Designer",
      company: "Google",
      description:
        "We are looking for a skilled Fullstack Developer to build and maintain web applications from concept to deployment. You will work on both the front-end and back-end, ensuring that applications are robust, scalable, and user-friendly.",
      appliedDate: "2024-03-14",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Apple",
      description:
        "Creating user-centered designs for digital products and experiences.",
      appliedDate: "2024-03-13",
      status: "Pending",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Amazon",
      description:
        "Leading product development and strategy for consumer-facing applications.",
      appliedDate: "2024-03-12",
      status: "Under Review",
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit job with id:", id);
    // we have to create function to edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete job with id:", id);
    // we need to create function delete logic here
  };

  return (
    <div className="applied-jobs-container">
      <h1>Applied Jobs</h1>

      <div className="jobs-list">
        {dummyJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="company-logo">
                <img
                  src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
                  alt={job.company}
                />
              </div>
              <div className="job-title-section">
                <h2>{job.title}</h2>
                <p className="company-name">{job.company}</p>
              </div>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(job.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="job-content">
              <p className="job-description">{job.description}</p>
              <div className="job-footer">
                <span className="applied-date">
                  Applied on: {job.appliedDate}
                </span>
                <span className="status-badge">{job.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
