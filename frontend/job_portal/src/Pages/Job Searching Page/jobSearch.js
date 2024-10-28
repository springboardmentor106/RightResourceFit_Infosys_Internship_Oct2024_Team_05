import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Star, Check, BookmarkPlus } from 'lucide-react';
import './jobSearch.css';

// Sample data - in a real app, this would come from an API
const jobListings = [
  {
    id: 1,
    company: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    title: 'Senior Web Developer',
    location: 'Mountain View, CA',
    jobType: 'Full-time',
    salary: '$120k - $180k/year',
    experience: 'Senior Level',
    description: 'We are seeking a skilled Web Developer to lead the development of mobile-responsive web applications. You will work on cutting-edge technology stacks, collaborate with cross-functional teams, and deliver intuitive, scalable, and user-friendly solutions',
    tags: ['React.js', 'Node.js', 'TypeScript'],
    rating: 5,
    proposals: '10 to 15',
    verified: true,
    postedDate: '2024-02-15',
  },
  {
    id: 2,
    company: 'Microsoft',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    title: 'Java Software Engineer',
    location: 'Redmond, WA',
    jobType: 'Full-time',
    salary: '$130k - $190k/year',
    experience: 'Mid Level',
    description: 'Join our backend development team to tackle complex technical challenges. You`ll optimize and maintain critical Java applications, handle large-scale data processing, and work in an agile environment focused on improving system performance and scalability.',
    tags: ['Java', 'Spring Boot', 'Microservices'],
    rating: 5,
    proposals: '10 to 15',
    verified: true,
    postedDate: '2024-02-18',
  },
  {
    id: 3,
    company: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
    title: 'UX Designer',
    location: 'San Jose, CA',
    jobType: 'Remote',
    salary: '$110k - $170k/year',
    experience: 'Senior Level',
    description: 'As a UX Designer, you will craft intuitive user experiences for our website redesign. Collaborate with developers and product managers to ensure cohesive design and usability across all digital platforms. A deep understanding of design principles and experience with design tools is essential.',
    tags: ['Figma', 'Adobe XD', 'UI/UX'],
    rating: 5,
    proposals: '10 to 15',
    verified: true,
    postedDate: '2024-02-20',
  }
];

// User profile data
const userProfile = {
  name: 'John Doe',
  title: 'Product Designer',
  profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  availability: true,
  connects: 18,
  proposals: 2,
  skills: ['Core Java', 'UX Designer', 'Javascript', 'React.js', 'Node.js', 'Python'],
  rating: 4.8,
  completedProjects: 32
};

const JobSearch = () => {
  // State management
  const [activeTab, setActiveTab] = useState('Best Matches');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Best Matches', 'Featured', 'Most Recent', 'About the job', 'Apply', 'Saved jobs'];

  // Toggle save job function
  const toggleSaveJob = (jobId, event) => {
    event.stopPropagation();
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  // Filter jobs based on search query and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`star ${index < rating ? 'filled' : ''}`}
            fill={index < rating ? '#FFD700' : 'none'}
            stroke={index < rating ? '#FFD700' : '#666'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="job-search-container">
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for jobs, companies, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="main-content">
        {/* Job Listings Section */}
        <div className="job-listings-wrapper">
          <div className="job-listings">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                onClick={() => setSelectedJob(job)}
              >
                <img src={job.logo} alt={`${job.company} logo`} className="company-logo" />
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="company-info">
                    <span className="company-name">{job.company}</span>
                    <span className="location">
                      <MapPin size={14} className="icon" />
                      {job.location}
                    </span>
                    <span className="job-type">
                      <Briefcase size={14} className="icon" />
                      {job.jobType}
                    </span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="tags">
                    {job.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="job-meta">
                    <StarRating rating={job.rating} />
                    <span className="proposals">
                      <DollarSign size={14} className="icon" />
                      {job.salary}
                    </span>
                    {job.verified && (
                      <span className="verified">
                        <Check size={14} className="icon" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className={`save-button ${savedJobs.has(job.id) ? 'saved' : ''}`}
                  onClick={(e) => toggleSaveJob(job.id, e)}
                >
                  <BookmarkPlus size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Job Details Section */}
        {selectedJob && (
          <div className="job-details">
            <div className="detail-header">
              <img src={selectedJob.logo} alt={`${selectedJob.company} logo`} className="company-logo" />
              <div>
                <h2>{selectedJob.title}</h2>
                <p className="company-name">{selectedJob.company}</p>
              </div>
            </div>

            <section className="project-overview">
              <h3>Project Overview</h3>
              <p>{selectedJob.description}</p>
            </section>

            <section className="skills-section">
              <h3>Required Skills</h3>
              <div className="tags">
                {selectedJob.tags.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </section>

            <section className="project-stats">
              <div className="stat-item">
                <p>Company Rating</p>
                <StarRating rating={selectedJob.rating} />
              </div>
              <div className="stat-item">
                <p>Job Type</p>
                <span className="verified">{selectedJob.jobType}</span>
              </div>
              <div className="stat-item">
                <p>Salary Range</p>
                <span className="verified">{selectedJob.salary}</span>
              </div>
            </section>

            <div className="apply-section">
              <input
                type="text"
                placeholder="Upload resume URL/link"
                className="resume-input"
              />
              <button className="apply-button">Apply Now</button>
            </div>
          </div>
        )}

        {/* User Profile Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-header">
            <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
            <h3>{userProfile.name}</h3>
            <p className="title">{userProfile.title}</p>
            <button className="edit-profile">Edit Profile</button>
          </div>

          <div className="availability">
            <span className="status-indicator"></span>
            Available for work
          </div>

          <div className="profile-stats">
            <div className="stat">
              <span className="number">{userProfile.connects}</span>
              <span className="label">Available Connects</span>
            </div>
            <div className="stat">
              <span className="number">{userProfile.proposals}</span>
              <span className="label">Submitted Proposals</span>
            </div>
          </div>

          <div className="skills-expertise">
            <h4>Skills and Expertise</h4>
            <div className="tags">
              {userProfile.skills.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>

          <button className="view-profile">View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
