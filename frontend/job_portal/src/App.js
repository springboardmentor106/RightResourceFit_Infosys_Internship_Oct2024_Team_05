import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword";
import ForgotPasswordEmail from './Pages/ForgotPasswordEmail'
import ForgotPasswordOTP from "./Pages/ForgotPasswordOtp";
import JobPostingPage from "./Pages/Job Posting Page/JobPostingPage"
import HR_Dashboard from "./Pages/Dashboard/Src/HR_Dashboard";
import JobPortal from './Pages/Job Search/JobPortal'
import JobApplication from "./Pages/Job Application form/JobApplication";
import AppliedJobs from "./Pages/Applied_job/Applied_job";
import Candidate_Profile from "./Pages/Dashboard/Components/CandidateProfile";
import SignInPage from "./Pages/recruiter_side_pages/SignInPage";
import RecruiterSignUpPage  from "./Pages/recruiter_side_pages/RecruiterSignUpPage";
import StartPage from "./Pages/recruiter_side_pages/StartPage"
import AllApplications from "./Pages/All Applicants/AllApplications"
import  AllJobs from "./Pages/AllJobs/AllJobs"
import AllPostedJobs from './Pages/recruiter_side_pages/AllPostedJobs/AllPostedJobs'
import RecruiterDetailsForm from "./Pages/recruiter_side_pages/RecruiterDetailsForm";
import ProfilePage from "./Pages/Dashboard/Components/ProfilePage";
import AppNotification from "./Pages/AppNotification/AppNotification";
import Messages from "./Pages/recruiter_side_pages/Messages";
import About from "./components/About";



function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <Routes>
        <Route path="/start" element={<StartPage/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/forgotpasswordemail" element={<ForgotPasswordEmail />} />
          <Route path="/forgotpasswordotp" element={<ForgotPasswordOTP />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/jobpostingpage" element={<JobPostingPage />} />
          <Route path="/hrdashboard" element={<HR_Dashboard />} />
          <Route path="/jobsearch" element={<JobPortal />} />
          <Route path="/jobapplicationform" element={<JobApplication />} />
          <Route path="/Applied_job" element={<AppliedJobs />} />
          <Route path="/candidate-profile/:id" element={<Candidate_Profile />} />
          <Route path="/recruiter-sigin" element={<SignInPage />} />
          <Route path="/recruiter-sigup" element={<RecruiterSignUpPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/applicants/:jobId" element={<AllApplications />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/all-posted-jobs" element={<AllPostedJobs />} />
          <Route path="/hr-profile" element={<RecruiterDetailsForm />} />
          <Route path="/hr-profilePage" element={<ProfilePage />} />
          <Route path="/notification" element={<AppNotification />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        
        
      </div>
    </Router>
  );
}

export default App;

