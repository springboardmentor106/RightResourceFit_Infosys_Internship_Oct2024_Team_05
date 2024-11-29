import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./JobPostingFrom.css";

function JobForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [jobMode, setJobMode] = useState('');
  const [experience, setExperience] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [jobId, setJobId] = useState(null);
  const [errors, setErrors] = useState({}); // State to track error messages

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const locationState = useLocation().state;

  useEffect(() => {
    if (locationState?.job) {
      const { _id, title, description, skills, location , jobMode, experience, salaryRange, jobType} = locationState.job;
      setJobId(_id);
      setJobTitle(title);
      setJobDescription(description);
      setSkills(skills);
      setLocation(location);
      setJobMode(jobMode);  // Set jobMode from location state
      setExperience(experience);  // Set experience from location state
      setSalaryRange(salaryRange);  // Set salaryRange from location state
      setJobType(jobType);
    }
  }, [locationState]);

  const validateInputs = () => {
    const errorsObj = {};
    const titleRegex = /^[a-zA-Z0-9\s]{5,50}$/;
    const descriptionRegex = /^.{10,500}$/;
    const skillsRegex = /^[a-zA-Z,.\s]{3,100}$/;
    const locationRegex = /^[a-zA-Z\s]{3,50}$/;
    const salaryRegex = /^\d{4,9}$/;

    if (!titleRegex.test(jobTitle)) {
      errorsObj.jobTitle = "Job Title must be 5-50 alphanumeric characters.";
    }
    if (!descriptionRegex.test(jobDescription)) {
      errorsObj.jobDescription = "Job Description must be between 10 and 500 characters.";
    }
    if (!skillsRegex.test(skills)) {
      errorsObj.skills = "Skills must be alphabetic and separated by commas.";
    }
    if (!locationRegex.test(location)) {
      errorsObj.location = "Location must be alphabetic and 3-50 characters long.";
    }
    if (!salaryRegex.test(salaryRange)) {
      errorsObj.salaryRange = "Salary Range must be between $1000 and $150000.";
    }
    if (!jobMode) {
      errorsObj.jobMode = "Please select a Job Mode.";
    }
    if (!experience) {
      errorsObj.experience = "Please select an Experience Level.";
    }
    if (!jobType) {
      errorsObj.jobType = "Please select a Job Type.";
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    const profileData = JSON.parse(localStorage.getItem("userDetails"));
    const hrId = profileData ? profileData.id : null;

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      skills,
      jobMode,
      experience,
      salaryRange: parseFloat(salaryRange),
      jobType,
      location:location,
      hrId
    };

    try {
      let response;
      if (jobId) {
        response = await axios.put(`${apiUrl}/api/jobs/update/${jobId}`, jobData, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert("Job updated successfully");
      } else {
        response = await axios.post(`${apiUrl}/api/jobs/add`, jobData, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert("Job added successfully");
      }
      navigate('/hrdashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-form-container">
      <h1>{jobId ? 'Edit Job' : "Post a Job"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter the job title"
          />
          {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
        </div>

        <div className="form-group">
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description"
          />
          {errors.jobDescription && <p className="error">{errors.jobDescription}</p>}
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter the major skill set"
          />
          {errors.skills && <p className="error">{errors.skills}</p>}
        </div>

        <div className="form-group">
          <label>Job Mode:</label>
          <div className="radio-group">
            {['Onsite', 'Hybrid', 'Remote'].map((mode) => (
              <label key={mode}>
                <input
                  type="radio"
                  name="jobMode"
                  value={mode}
                  checked={jobMode === mode}
                  onChange={(e) => setJobMode(e.target.value)}
                />
                {mode}
              </label>
            ))}
          </div>
          {errors.jobMode && <p className="error">{errors.jobMode}</p>}
        </div>

        <div className="form-group">
          <label>Experience:</label>
          <div className="radio-group">
            {['Beginner', 'Intermediate', 'Expert'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="experience"
                  value={level}
                  checked={experience === level}
                  onChange={(e) => setExperience(e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>
          {errors.experience && <p className="error">{errors.experience}</p>}
        </div>

        <div className="form-group">
          <label>Salary Range:</label>
          <input
            type="text"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="Enter salary amount (e.g., 10000)"
          />
          {errors.salaryRange && <p className="error">{errors.salaryRange}</p>}
        </div>

        <div className="form-group">
          <label>Job Type:</label>
          <div className="radio-group">
            {['Day Shift', 'Night Shift', 'Contract'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={jobType === type}
                  onChange={(e) => setJobType(e.target.value)}
                />
                {type}
              </label>
            ))}
          </div>
          {errors.jobType && <p className="error">{errors.jobType}</p>}
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the job location"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <button type="submit" className="submit-button">{jobId ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default JobForm;
