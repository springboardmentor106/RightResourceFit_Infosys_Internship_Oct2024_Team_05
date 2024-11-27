import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate,useParams,useLocation } from 'react-router-dom';

import "./JobPostingFrom.css"
function JobForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [jobMode, setJobMode] = useState('');
  const [experience, setExperience] = useState('');
  const [salaryRange, setSalaryRange] = useState(75000); // Default to midpoint
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [jobId, setJobId] = useState(null)

  const handleFileUpload = (e) => {
    setAttachment(e.target.files[0]);
  };

  const navigate=useNavigate()
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
 
  const locationState = useLocation().state;

  useEffect(()=>{
    if(locationState?.job){
      const {_id, title, description, skills, location } = locationState.job;
      setJobId(_id); 
      setJobTitle(title);
      setJobDescription(description);
      setSkills(skills);
      setLocation(location);
    }
    
  },[locationState])

  
  

  const handleSubmit = async(e) => {
    
      e.preventDefault();
      const jobData = {
        title:jobTitle,
        description:jobDescription,
        skills,
        // jobMode,
        // experience,
        // salaryRange,
        // jobType,
        location,
        // contactInfo,
        // deadline,
        // attachment,
      };

      try {
        let response;

        if (jobId){
          response = await axios.put(`${apiUrl}/api/jobs/update/${jobId}`, jobData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          alert('Job updated successfully')
        }
        else{
           response=await axios.post(`${apiUrl}/api/jobs/add`,jobData,{
            headers: {
              'Content-Type': 'application/json',
            },
          })
          alert("Job added successfully")
        }
          console.log(response.data);
          navigate('/hrdashboard')
      } 
      catch (error) {
        console.log(error)
      }
      
      
        
    // console.log('Form Data Submitted:', formData);
    // Add any additional submission logic here (e.g., API call)
  };

  return (
    <div className="job-form-container">
      <h1>{jobId? 'Edit Job':"Post a Job"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter the job title"
          />
        </div>

        <div className="form-group">
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job Description"
          />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter the Major Skill Set"
          />
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
        </div>

        <div className="form-group">
  <label>Salary Range:</label>
  <div className="salary-input-wrapper">
    <span className="salary-prefix">$</span>
    <input
      type="number"
      min="0"
      max="150000"
      step="1000"
      value={salaryRange}
      onChange={(e) => setSalaryRange(e.target.value)}
      placeholder="Enter salary amount"
      className="salary-number-input"
    />
  </div>
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
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the job Location"
          />
        </div>

        {/* <div className="form-group">
          <label>Contact Info:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Enter email or number"
          />
        </div>

        <div className="form-group">
          <label>Application Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Attachments:</label>
          <label className="upload-button">
            <FaUpload />
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
          {attachment && <span>{attachment.name}</span>}
        </div> */}

        <button type="submit" className="submit-button">{jobId ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default JobForm;
