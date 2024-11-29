import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  findUserByUsername,
  saveOtp,
  findOtpByUserId,
  deleteOtp,
  updateUserPassword,
  addUserToDB,
  createUserSession,
  verifySession,
  deleteSession,
} from "../db/index.js";
import { searchJobsInDB } from "../db/index.js";
const router = express.Router();

import { sendPasswordResetSuccessEmail, sendOtpEmail } from "../email/index.js";
//! ADMIN Routes

// Register User
async function registerUser(req, res) {
  try {
    const { email, password, username } = req.headers;

    // Validation for email and password presence
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Email format validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the email already exists
    if (await findUserByEmail(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Password length validation
    if (email.length < 8 || password.length < 8) {
      return res.status(400).json({
        message: "Email and password must be at least 8 characters long",
      });
    }

    // Add user to the database
    await addUserToDB({ email, password, username });

    // Success response
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Internal server error
    return res.status(500).json({ message: err.message });
  }
}

// Login User
async function loginUser(req, res) {
  try {
    const { username, password } = req.headers;
    const userAgent = req.get("User-Agent");

    // Validation for username and password presence
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find the user by username
    const existingUser = await findUserByUsername(username);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    ); // Compare plain text and hash
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create a session for the user
    const session = await createUserSession(userAgent, existingUser._id);
    if (!session) {
      return res.status(500).json({ message: "Failed to create user session" });
    }

    // Success response with session token
    return res.status(200).json({ sessionToken: session.sessionToken });
  } catch (err) {
    // Internal server error
    return res.status(500).json({ message: err.message });
  }
}

async function validateUserSession(req, res) {
  try {
    const session = req.headers.authorization.split(" ")[1];
    const sessionInfo = await verifySession(session);
    if (!sessionInfo) {
      res.status(401).json({ message: "invalid_session" });
    } else {
      res.status(200).json({
        message: "valid_session",
        user: sessionInfo,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const session = req.headers.authorization.split(" ")[1];
    const sessionInfo = await verifySession(session);
    if (!sessionInfo) {
      res.status(401).json({ message: "invalid_session" });
    } else {
      await deleteSession(session);
      res.status(200).json({ message: "session_deleted_successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//! Forgot Password Handlers

// Forgot password handler
async function forgotPassword(req, res) {
  try {
    const { email } = req.headers;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();

    // Save the OTP in the database and set expiration
    await saveOtp(user._id, otp);

    // Send OTP to user's email
    await sendOtpEmail(email, { email, otp });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Reset password handler
async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.headers;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpRecord = await findOtpByUserId(user._id);
    if (!otpRecord || otpRecord.otp !== otp) {
      console.log("otp from db => " + otpRecord.otp);
      console.log("otp from db => " + otp);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update the user's password
    await updateUserPassword(user._id, newPassword);

    // Remove the OTP after successful password reset
    await deleteOtp(user._id);

    // Send an email notification after successful password reset
    await sendPasswordResetSuccessEmail(email, { email });

    res.status(200).json({ message: "Password reset successful, email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


//! User Route Handlers
router.get("/", async (req, res) => {
  console.log(`This api is running`);
  res.json({ message: "This api is running" });
});
// Route handler for /api/register
router.post("/register", async (req, res) => {
  console.log(`registering user -> ${req.headers.email}`);
  await registerUser(req, res);
});

// Route handler for /api/login
router.post("/login", async (req, res) => {
  console.log(`logging in user -> ${req.headers.username}`);
  await loginUser(req, res);
});

// Route to validate session /api/dashboard
router.post("/dashboard", async (req, res) => {
  console.log(`validating sessionId -> ${req.headers.authorization}`);
  await validateUserSession(req, res);
});

// Route to logout session /api/logout
router.post("/logout", async (req, res) => {
  console.log(
    `deleting sessionId -> ${req.headers.authorization.split(" ")[1]}`
  );
  await logoutUser(req, res);
});

//register hr
async function registerRecruiter(req, res) {
  try {
    const { email, username, companyName, jobTitle, password } = req.body;

    // Validate input fields
    if (!email || !username || !companyName || !jobTitle || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the recruiter already exists
    const existingRecruiter = await HRUser.findOne({ email });
    if (existingRecruiter) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new recruiter
    const newRecruiter = new HRUser({
      email,
      username,
      companyName,
      jobTitle,
      password: hashedPassword,
       
    });

    // Save the recruiter to the database
    await newRecruiter.save();

    
    res.status(201).json({ message: 'Recruiter registered successfully.', hrid: newRecruiter._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 

//login hr
import { createRecruiterSession } from "../db/dbHandlers.js";
async function loginRecruiter(req, res) {
  try {
    const { username, password } = req.body;
    const userAgent = req.get('User-Agent');

    
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required.' });
    }

    
    const recruiter = await HRUser.findOne({ username });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found.' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, recruiter.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    
  
    // const session = await createRecruiterSession (req.get('User-Agent'), recruiter._id);
    // if (!session) {
    //   return res.status(500).json({ message: 'Failed to create recruiter session.' });
    // }
    // res.status(200).json({ sessionToken: session.sessionToken });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: recruiter._id,
        username: recruiter.username,
        email: recruiter.email,
        
        company: recruiter.companyName,
        role: recruiter.jobTitle,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//logout hr
async function logoutRecruiter(req, res) {
  try {
    const session = req.headers.authorization.split(' ')[1];
    const sessionInfo = await verifySession(session);

    if (!sessionInfo) {
      return res.status(401).json({ message: 'Invalid session.' });
    }

    // Delete the session
    await deleteSession(session);

    res.status(200).json({ message: 'Session deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
import { getRecruiterSessionByToken } from "../db/dbHandlers.js";
async function validateRecruiterSession(req, res) {
  try {
    const session = req.headers.authorization.split(' ')[1];
    const sessionInfo = await getRecruiterSessionByToken(session);

    if (!sessionInfo) {
      return res.status(401).json({ message: 'Invalid session.' });
    }

    

    res.status(200).json({
      message: 'Valid session.',
      recruiter: sessionInfo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



router.post('/hr-profile', async (req, res) => {
  try {
    const { name, phone, email, company, role, linkedin, website, industry, experience } = req.body;

    const hrUser=await HRUser.findOne({email});
    if(!hrUser){
      return res.status(404).json({message:'HR is not found'})
    }
    
     // Check if the HR profile already exists
     let hrProfile = await HrProfile.findOne({ hrUserID: hrUser._id });

     if (hrProfile) {
       // If profile exists, update it
       hrProfile.username = name || hrProfile.username;
       hrProfile.contactNumber = phone || hrProfile.contactNumber;
       hrProfile.email = email || hrProfile.email;
       hrProfile.role = role || hrProfile.role;
       hrProfile.companyName = company || hrProfile.companyName;
       hrProfile.address = linkedin || hrProfile.address;
       hrProfile.industry = industry || hrProfile.industry;
       hrProfile.experience = experience || hrProfile.experience;
       hrProfile.website = website || hrProfile.website;
 
       await hrProfile.save();
       return res.status(200).json({ message: 'Profile updated successfully', user: hrProfile });
     }
 
    // Create and save new HR user
    const newHR = new HrProfile({
      username: name,
      hrUserID: hrUser._id,
      email,
     
      role,
      companyName: company,
      contactNumber: phone,
      address: linkedin, 
      industry,
      experience,
      website,
    });

    await newHR.save();
    res.status(201).json({ message: 'Profile added successfully', user: newHR });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding HR profile', error: error.message });
  }
});

//fetch HR profile
router.get('/profile/:hrUserID', async (req, res) => {
  try {
    const { hrUserID } = req.params; 
    const hrProfile = await HrProfile.findOne({ hrUserID });

    if (!hrProfile) {
      return res.status(404).json({ message: 'HR profile not found' });
    }

    
    res.status(200).json({ profile: hrProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching HR profile', error: error.message });
  }
});


import {  HrProfile, HRUser, Job } from "../db/dbSchema.js"; // Import Job schema

// Add Job - HR functionality
async function addJob(req, res) {
  try {
    const { title, description, location, skills, hrId,jobMode,experience,salaryRange,jobType } = req.body;
    console.log("Adding job with data:", req.body);//added this line

    const newJob = new Job({
      title,
      description,
      location,
      skills,
      jobMode, // Added jobMode
      experience, // Added experience
      salaryRange, // Added salaryRange
      jobType, // Added jobType
      postedBy: hrId, 
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//latest 3 jobs 
router.get('/jobs/latest', async (req, res) => {
  try {
    const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(3);
    console.log(latestJobs);
    res.json({ jobs: latestJobs }); 
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});
//get all jobs available (applicant)
router.get('/alljobs', async (req, res) => {
  try {
    const allJobs = await Job.find(); 
    console.log(allJobs);
    res.json({ jobs: allJobs }); 
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ error: "Error fetching all jobs" });
  }
});

//get job (applicant)
router.get("/jobs/:jobId",async(req,res)=>{
  try {
    const {jobId}=req.params;
    const job=await Job.findById(jobId);
    
    if(!job) return res.status(404).json({message:'Job Not Found'});

    res.status(200).json({job});
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

//get latest jobs (HR)
router.get('/recruiter/latest/:hrId', async (req, res) => {
  const { hrId } = req.params;
  try {
    const latestJobs = await Job.find({ postedBy: hrId }) // Filter by hrId
      .sort({ createdAt: -1 }) // Sort by creation date (descending)
      .limit(3); // Limit to 3 jobs
    console.log(latestJobs);
    res.json({ jobs: latestJobs });
  } catch (error) {
    console.error("Error fetching latest jobs for recruiter:", error);
    res.status(500).json({ error: "Error fetching latest jobs for recruiter" });
  }
});

// Fetch All Jobs Posted by a Recruiter
router.get('/recruiter/all/:hrId', async (req, res) => {
  const { hrId } = req.params;
  try {
    const allJobs = await Job.find({ postedBy: hrId }); // Filter by hrId
    console.log(allJobs);
    res.json({ jobs: allJobs });
  } catch (error) {
    console.error("Error fetching all jobs for recruiter:", error);
    res.status(500).json({ error: "Error fetching all jobs for recruiter" });
  }
});

// Update Job - HR functionality
async function updateJob(req, res) {
  try {
    const {jobId}=req.params
    const {  title, description, location, skills,jobMode,experience,salaryRange,jobType } = req.body;
    
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, description, location, skills,jobMode,experience,salaryRange,jobType, updatedAt: Date.now() },
      { new: true } // Return updated job
    );

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete Job - HR functionality
async function deleteJob(req, res) {
  try {
    const { jobId } = req.body;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



async function searchJobs(req, res){
  console.log("Received search query:", req.body.search);
  try {
    const {search}=req.body
    const jobs = await searchJobsInDB(search); 

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error in searchJobs:", error);
    res.status(500).json({message:error.message})
  }
  
}




import { applyForJobApplication ,upload} from "../db/dbHandlers.js";
router.post("/jobs/apply",upload.single("resume"),  async (req, res) => {
  try {
    const { applicantId, jobId, ...applicationData } = req.body; 
    const file=req.file;

    if(!file){
      return res.status(400).json({message:"File upload required"})
    }
    if (!applicantId || !jobId) {
      return res
        .status(400)
        .json({ message: "Applicant ID and Job ID are required" });
    }

    const newApplication = await applyForJobApplication(applicationData,file, applicantId,
      jobId  ); 
    res.status(200).json({ message: "Job application submitted successfully", application: newApplication });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ message: "Failed to apply ", error: err.message });
  }
});

//get all job applications
import { JobApplication } from "../db/dbSchema.js";
async function getApplicationsByApplicant(req, res) {
  try {
    const { applicantId } = req.params;

    if (!applicantId) {
      return res.status(400).json({ message: "Applicant ID is required" });
    }

    
    const applications = await JobApplication.find({ applicantId })
      .populate("jobId", "title description location") 
      .populate("applicantId", "firstName lastName email") 
      .sort({ appliedAt: -1 }); 

    
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this applicant" });
    }

    res.status(200).json({ applications });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: err.message });
  }
}

async function deleteApplication(req, res) {
  try {
    const { jobId, applicantId } = req.params;

    if (!jobId || !applicantId) {
      return res.status(400).json({ message: "Job ID and Applicant ID are required" });
    }

    
    const deletedApplication = await JobApplication.findOneAndDelete({
      jobId: jobId,
      applicantId: applicantId,
    });

    if (!deletedApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.status(200).json({ message: "Job application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: err.message });
  }
}

import { updateJobApplication } from "../db/dbHandlers.js";

router.put("/applications/:id", upload.single("resume"), async (req, res) => {
  console.log("Received application ID:", req.params.id); 
  console.log("Uploaded file:", req.file); 
  console.log(req.body); 

  try {
    const applicationId = req.params.id;
    const updatedData = req.body;
    //const file = req.file;
    if (req.file) {
      updatedData.resume = req.file.path;
    }

    
    if (!applicationId) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    
    const updatedApplication = await updateJobApplication(
      applicationId,
      updatedData,
      req.file
    );

    res.status(200).json({ message: "Job application updated successfully", application: updatedApplication });
  } catch (err) {
    console.error("Error updating job application:", err);
    res.status(500).json({ message: "Failed to update application", error: err.message });
  }
});

//get all applicants of a job

export const getApplicantsByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
      
      const applicants = await JobApplication.find({ jobId })
          .populate("applicantId", "firstName lastName email ") 
          

      
      res.status(200).json({ applicants });
  } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ message: "Error fetching applicants", error });
  }
};

// Get user notifications
router.get('/notifications/:userId', async (req, res) => {
  try {
    const notifications = await getNotifications(req.params.userId);
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', async (req, res) => {
  try {
    await markNotificationAsRead(req.params.notificationId);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
// Add routes for job management
router.post("/jobs/add", addJob); // Add job
router.put("/jobs/update/:jobId", updateJob); // Update job
router.delete("/jobs/delete", deleteJob); // Delete job
router.post("/jobs/search", searchJobs); // Search jobs by location and skills
router.get("/applications/:applicantId", getApplicationsByApplicant);
router.delete('/applications/:applicantId/:jobId',deleteApplication);
router.get('/applicants/:jobId',getApplicantsByJobId);
router.post('/recruiter-register', registerRecruiter);
router.post('/recruiter-login', loginRecruiter);
router.post('/recruiter/logout', logoutRecruiter);
router.get('/recruiter/validate-session', validateRecruiterSession);



export default router;
