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

import { Job } from "../db/dbSchema.js"; // Import Job schema

// Add Job - HR functionality
async function addJob(req, res) {
  try {
    const { title, description, location, skills, hrId } = req.body;
    console.log("Adding job with data:", req.body);//added this line

    const newJob = new Job({
      title,
      description,
      location,
      skills,
      //postedBy: hrId, // HR User ID
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//latest 4 jobs 
router.get('/jobs/latest', async (req, res) => {
  try {
    const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(3);
    console.log(latestJobs);
    res.json({ jobs: latestJobs }); // Wrap jobs array in an object for frontend compatibility
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

//get job
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

// Update Job - HR functionality
async function updateJob(req, res) {
  try {
    const {jobId}=req.params
    const {  title, description, location, skills } = req.body;
    
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, description, location, skills, updatedAt: Date.now() },
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

    // Create notification for the HR
    await createNotification({
      recipient: job.postedBy, // Assuming you have the HR's ID in the job
      type: 'application_submitted',
      jobId: jobId,
      title: 'New Job Application',
      message: `A new application has been submitted for ${job.title}`
    });

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

router.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const notifications = await getUnreadNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const notification = await markNotificationAsRead(req.params.id);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
