// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';


function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back</h1>
        <button className="post-job-btn">+ Post A Job</button>
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
        <div className="job-row">
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

        {/* Row for next two job cards */}
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
        </div>

        <a href="/" className="view-more">View More &gt;&gt;</a>
      </div>
    </div>
  );
}

export default Dashboard;
