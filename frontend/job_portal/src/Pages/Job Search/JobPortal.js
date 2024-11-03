import React, { useEffect, useState } from "react";
import "./JobPortal.css";
import axios from "axios";


function JobPortal() {
  // Define job data array inside JobPortal
  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Senior Web Developer",
  //     company: "Google",
  //     location: "Mountain View, CA",
  //     type: "Full-time",
  //     description: "Lead the development of web solutions for Google’s clients...",
  //     skills: ["React.js", "Node.js", "TypeScript"],
  //     salary: "$120k - $180k/year",
  //     rating: 5,
  //     verified: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Java Software Engineer",
  //     company: "Microsoft",
  //     location: "Redmond, WA",
  //     type: "Full-time",
  //     description: "Join our backend team to tackle complex technical challenges...",
  //     skills: ["Java", "Spring", "SQL"],
  //     salary: "$100k - $150k/year",
  //     rating: 4,
  //     verified: true,
  //   },
  //   // Add more jobs here
  // ];

  // Sample profile data
  const profile = {
    name: "John Doe",
    title: "Product Designer",
    availability: "Available for work",
    connects: 18,
    proposals: 2,
    image: "https://via.placeholder.com/150", // Placeholder image
  };

  // State to store the selected job
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobListing,setJobListing]=useState([])
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null)
  const [searchtrigger,setSearchtrigger]=useState(false)


 
    const fetchJobs=async()=>{
      setLoading(true);
      setError(null);
      console.log("Fetching jobs with search query:", searchQuery);
      
      try{
        
        const response = await axios.post("http://localhost:3000/api/jobs/search", {
          search: searchQuery
        });
        console.log("Fetched jobs:", response.data.jobs);
        setJobListing(response.data.jobs);
      }
      catch (err) {
        setError(err.message); 
        console.log("The error is",err)
      } finally {
        setLoading(false);

      }
    }

    useEffect(()=>{
      if(searchtrigger){
        fetchJobs();
        setSearchtrigger(false)
      }
    },[searchtrigger])

   


  // Function to handle job selection
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchtrigger(true); // Trigger the search
    }
  };

  // Filter jobs based on the search query
  // const filteredJobs = jobs.filter((job) =>
  //   job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   job.company.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="job-portal">
      {/* Navbar */}
      {/* <nav className="navbar">
        <h1>Job Portal</h1>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Jobs</li>
          <li>Contact Us</li>
        </ul>
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </nav> */}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for jobs, companies, or keywords..."
          value={searchQuery}
          onChange={(e) =>{setSearchQuery(e.target.value)}}  onKeyDown={handleKeyPress}
        />
          

      </div>

      {/* Main Content: Job List, Selected Job Details, & Profile Section */}
      <div className="content">
        {/* Job List Section */}
        {/* <div className="job-list">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
              onClick={() => handleJobClick(job)}
            >
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>{job.location} - {job.type}</p>
              <div className="skills">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="salary">{job.salary}</p>
              <p className="rating">Rating: {job.rating}</p>
              {job.verified && <p className="verified">Verified</p>}
            </div>
          ))}
        </div> */}
        <div className="job-list">
          {loading ? (
            <p>Loading jobs...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            jobListing.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => handleJobClick(job)}
              >
                <h1>{job.title}</h1>
                {/* <h3>Google</h3> */}
                <p><strong>Location:</strong>{job.location} </p>
                <div className="skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      <strong>Skills: </strong>{skill}
                    </span>
                  ))}
                </div>
                <p className="salary"><strong>Salary:</strong>Rs. 75000</p>
                {/* <p className="rating">Rating: {job.rating}</p> */}
                <p className="verified">Verified</p>
              </div>
            ))
          )}
        </div>

        {/* Selected Job Details Section */}
        {selectedJob && (
          <div className="selected-job-card">
            <h2>{selectedJob.title}</h2>
            <h3>Google</h3>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <div className="skills">
              {selectedJob.skills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
            <p className="salary"><strong>Salary: Rs 75000</strong> {selectedJob.salary}</p>
            
            <p className="verified">This job is verified.</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="profile-card">
          <img src={profile.image} alt="Profile" className="profile-image" />
          <h2>{profile.name}</h2>
          <h3>{profile.title}</h3>
          <p className="availability">{profile.availability}</p>
          <div className="profile-stats">
            <div className="connects">
              <h4>{profile.connects}</h4>
              <p>Available Connects</p>
            </div>
            <div className="proposals">
              <h4>{profile.proposals}</h4>
              <p>Submitted Proposals</p>
            </div>
          </div>
          <button className="edit-profile">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default JobPortal;
