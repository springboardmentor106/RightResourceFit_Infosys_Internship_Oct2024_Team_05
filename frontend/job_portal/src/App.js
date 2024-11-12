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
import JobApplication from "./Pages/Job Application form/components/JobApplication";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
