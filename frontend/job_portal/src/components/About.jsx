import React from "react";
import "./AboutUs.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="about-us-container">
      <section className="about-header">
        
        <h1>
          Welcome to <strong>Job Portal</strong>, your trusted
          platform for finding your dream job or the perfect hire.
        </h1>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          At <strong>Job Portal</strong>, we believe in bridging the
          gap between talented professionals and thriving organizations. Whether
          you’re a job seeker or an employer, we’re here to make the process
          seamless and rewarding.
        </p>

        <h2>Our Mission</h2>
        <p>
          To empower careers and businesses by connecting the right people with
          the right opportunities.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>For Job Seekers:</strong> Explore job listings tailored to
            your skills and aspirations.
          </li>
          <li>
            <strong>For Employers:</strong> Post job openings and connect with
            skilled professionals.
          </li>
        </ul>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Comprehensive Listings: Jobs across various industries.</li>
          <li>User-Friendly Interface: Simple and intuitive design.</li>
          <li>Advanced Matching: Intelligent algorithms for better matches.</li>
          <li>Secure Platform: Data privacy and security are our priorities.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          To revolutionize the way people find jobs and companies find talent
          through innovation and a people-first approach.
        </p>
      </section>

      
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
