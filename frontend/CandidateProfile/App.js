import React, { useState } from 'react';
import './index.css'; // Make sure to import the CSS file

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    linkedin: '',
    skills: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Form Submitted Successfully');
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Candidate Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-field">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe yourself"
              required
            />
          </div>
          <div className="form-field">
            <label>LinkedIn:</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Enter LinkedIn profile URL"
            />
          </div>
          <div className="form-field">
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your skills (comma separated)"
            />
          </div>
          <div className="form-field">
            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of experience"
            />
          </div>
          <button type="submit" className="apply-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
