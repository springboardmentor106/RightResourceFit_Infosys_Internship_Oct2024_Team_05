// src/components/JobApplication.jsx
import React, { useState } from 'react';
import './JobApplication.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function JobApplication() {
  const location=useLocation();
  const {jobId,applicantId}=location.state || {};
  console.log(jobId,applicantId)
  const [formData, setFormData] = useState({
    
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    contactNumber: '',
    educationLevel: '',
    experienceLevel: '',
    resume: null,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try{
      
      const formDataToSubmit=new FormData();
      for (let key in formData){
        formDataToSubmit.append(key,formData[key]);
      }
      formDataToSubmit.append('applicantId', applicantId);
    formDataToSubmit.append('jobId', jobId);

      const response=await axios.post('http://localhost:3000/api/jobs/apply', formDataToSubmit,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert(response.data.message);
    }
  catch(error){
    console.error('Error submitting application',error);
  }
  

  };

  return (
    <div className="form-container">
      <h2 className="form-title">Application Form </h2>
      {/* <p>Job ID: {jobId}</p>
      <p>Applicant ID: {applicantId}</p> */}
      <form className="application-form" onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-row">
          <div className="form-field">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-field">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Contact Number</label>
            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Education Level</label>
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} required>
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div className="form-field">
            <label>Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
              <option value="">Select Experience Level</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field-full">
            <label>Resume/CV</label>
            <input type="file" onChange={handleFileChange} required />
          </div>
        </div>
        <div className="form-row terms">
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
          <label>I agree with Terms & Conditions</label>
        </div>
        <button type="submit" className="apply-button">Apply Now</button>
        
      </form>
      
    </div>
  );
}

export default JobApplication;
