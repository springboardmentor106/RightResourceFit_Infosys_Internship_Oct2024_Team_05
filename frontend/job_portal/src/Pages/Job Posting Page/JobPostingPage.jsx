import React from 'react';
import Sidebar from './Siderbar';
import Nav from './Nav';
import JobForm from './JobPostingFrom';
import './JobPostingPage.css';

function JobPostingPage() {
  return (
    <div className="job-posting-page">
      <Sidebar />
      <div className="main-content">
        <Nav />
        <div className="job-form-container-wrapper">
          <JobForm />
        </div>
      </div>
    </div>
  );
}

export default JobPostingPage;
