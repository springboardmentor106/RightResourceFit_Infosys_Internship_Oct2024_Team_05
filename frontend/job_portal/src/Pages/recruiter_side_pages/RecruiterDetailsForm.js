import React, { useState } from "react";
import "./RecruiterDetailsForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterDetailsForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    role: "",
    linkedin: "",
    website: "",
    industry: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response =await axios.post("http://localhost:3000/api/hr-profile",formData)

      if (response.status === 201) {
        alert("Profile added successfully!");
        localStorage.setItem('profileData', JSON.stringify(response.data));
        console.log("Profile Data with HR ID:", response.data);
        navigate('/hr-profilePage')
      } else {
        alert("Error adding profile.");
      }
      
    } catch (error) {
      console.error("Error submitting form data", error);
      alert("Error submitting profile data. Please try again.");
    }
  }

 

  return (
    <div className="form-container">
      <h1>Recruiter Details Form</h1>
      <form className="recruiter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn ID</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website (Optional)</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter your website URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Enter your industry"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience (in years)</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Enter your experience"
            min="0"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecruiterDetailsForm;
