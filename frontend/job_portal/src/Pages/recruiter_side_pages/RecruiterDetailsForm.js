import React, { useState } from "react";
import "./RecruiterDetailsForm.css";

const RecruiterDetailsForm = () => {
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex validation
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/; // LinkedIn URL
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/; // Website URL
    const experienceRegex = /^[0-9]+$/; // Numbers only

    if (!nameRegex.test(formData.name)) {
      alert("Please enter a valid name (letters and spaces only).");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number (starting with 6-9 and 10 digits).");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!linkedinRegex.test(formData.linkedin)) {
      alert("Please enter a valid LinkedIn URL.");
      return;
    }
    if (formData.website && !websiteRegex.test(formData.website)) {
      alert("Please enter a valid website URL.");
      return;
    }
    if (!experienceRegex.test(formData.experience) || formData.experience < 0) {
      alert("Please enter a valid number for experience (positive integers only).");
      return;
    }

    console.log("Recruiter Details Submitted: ", formData);
    alert("Form Submitted Successfully!");
  };

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
            type="url"
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
