// src/components/JobApplication.jsx
import React, { useEffect, useState } from 'react';
import './JobApplication.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function JobApplication() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId, applicantId, applicationData } = location.state || {};
  const isUpdate = !!applicationData;

  // Regex patterns for validation
  const regexPatterns = {
    name: /^[A-Za-z\s]+$/, // Only letters and spaces
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email format
    contactNumber: /^[0-9]{10}$/, // 10-digit mobile number
    dob: /^\d{4}-\d{2}-\d{2}$/, // Date in YYYY-MM-DD format
  };

  useEffect(() => {
    if (isUpdate && applicationData) {
      setFormData({
        ...applicationData,
        terms: true,
        dob: formatDate(applicationData.dob),
      });
    }
  }, [isUpdate, applicationData]);

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

  const [errors, setErrors] = useState({}); // To store error messages for each field

  const validateField = (name, value) => {
    // Validate the field based on regex patterns
    switch (name) {
      case 'firstName':
      case 'lastName':
        return regexPatterns.name.test(value) ? '' : 'Only alphabets are allowed.';
      case 'email':
        return regexPatterns.email.test(value) ? '' : 'Invalid email format.';
      case 'contactNumber':
        return regexPatterns.contactNumber.test(value) ? '' : 'Contact must be a 10-digit number.';
      case 'dob':
        return regexPatterns.dob.test(value) ? '' : 'Invalid date format (YYYY-MM-DD).';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Validate the field on change
    const errorMessage = validateField(name, fieldValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Returns yyyy-MM-dd format
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors
    if (Object.values(errors).some((error) => error) || Object.values(formData).some((value) => value === '')) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      for (let key in formData) {
        if (key === 'resume' && formData.resume instanceof File) {
          formDataToSubmit.append(key, formData.resume);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }
      formDataToSubmit.append('applicantId', applicantId);
      formDataToSubmit.append('jobId', jobId);

      const url = isUpdate
  ? `http://localhost:3000/api/applications/${applicationData._id}`
  : `http://localhost:3000/api/jobs/apply`;

      const method = isUpdate ? 'put' : 'post';
      const response = await axios[method](url, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
      navigate('/Applied_job');
    } catch (error) {
      console.error(`${isUpdate ? 'Error updating application' : 'Error submitting application'}`, error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Application Form</h2>
      <form className="application-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <small>{errors.firstName}</small>}
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <small>{errors.lastName}</small>}
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
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <small>{errors.dob}</small>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small>{errors.email}</small>}
          </div>
          <div className="form-field">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {errors.contactNumber && <small>{errors.contactNumber}</small>}
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
        <button type="submit" className="apply-button">
          {isUpdate ? 'Update Application' : 'Apply Now'}
        </button>
      </form>
    </div>
  );
}

export default JobApplication;
