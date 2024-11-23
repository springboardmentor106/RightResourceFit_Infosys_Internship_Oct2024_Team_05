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



function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/forgotpasswordemail"
            element={<ForgotPasswordEmail />}
          />
          <Route path="/forgotpasswordotp" element={<ForgotPasswordOTP />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/jobpostingpage" element={<JobPostingPage />} />
          <Route path="/hrdashboard" element={<HR_Dashboard />} />
          <Route path="/jobsearch" element={<JobPortal />} />
          <Route path="/jobapplicationform" element={<JobApplication />} />
          <Route path="/Applied_job" element={<AppliedJobs />} />
          <Route path="/candidateprofile" element={<Candidate_Profile />} />
          <Route path="/recruiter-sigin" element={<SignInPage />} />
          <Route path="/recruiter-sigup" element={<RecruiterSignUpPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/all-applicants" element={<AllApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

