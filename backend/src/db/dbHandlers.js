import { connect } from "mongoose";
import { generateRandomString } from "../util/index.js";
import { User, Session, recruiterSession } from "./dbSchema.js";
import bcrypt from "bcryptjs";
import {
  MONGODB_URL,
  MONGODB_DB_NAME,
  MONGODB_USER,
  MONGODB_PASSWORD,
} from "../config.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');
//console.log('Upload directory:', uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed'), false);
  }
};


const upload = multer({ storage, fileFilter });

async function connectToDB() {
  await connect(MONGODB_URL, {
    dbName: MONGODB_DB_NAME,
    user: MONGODB_USER,
    pass: MONGODB_PASSWORD,
    retryWrites: true,
    w: "majority",
  });
  console.log("Connected to MonogoDB");
}

//! USER DB Functions

async function addUserToDB(user) {
  try {
    const password = await bcrypt.hash(user.password, 10); // Hash the password
    const newUser = new User({
      ...user,
      password,
    });
    await newUser.save();
  } catch (err) {
    console.log(err.message);
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.log(err.message);
  }
}
async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

async function createUserSession(sessionName, userId) {
  try {
    const newSession = new Session({
      sessionToken: generateRandomString(42),
      sessionName,
      userId,
    });
    return await newSession.save();
  } catch (err) {
    console.log(err.message);
  }
}

async function verifySession(sessionToken) {
  try {
    const existingSession = await Session.findOne({ sessionToken });
    const existingUser = await User.findOne({
      _id: existingSession.userId,
    });
    const existingSessions = await Session.find({
      userId: existingSession.userId,
      sessionToken: {
        $nin: [sessionToken],
      },
    });
    if (!existingSession) {
      return null; // session not found
    }
    return {
      _id: existingSession.userId,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
      currentSession: existingSession,
      otherSessions: existingSessions,
    };
  } catch (err) {
    console.log(err.message);
  }
}
import { HRUser } from "./dbSchema.js";

async function getRecruiterSessionByToken(req, res) {
  try {
    const sessionToken = req.headers.authorization.split(' ')[1];

    // Fetch session details directly from the database
    const sessionInfo = await recruiterSession.findOne({ sessionToken, userType: 'recruiter' });

    if (!sessionInfo) {
      return res.status(401).json({ message: 'Invalid or expired session.' });
    }

    // Fetch recruiter details using the userId from the session
    const recruiter = await HRUser.findById(sessionInfo.userId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found.' });
    }

    res.status(200).json({
      message: 'Valid session.',
      recruiter,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteSession(sessionToken) {
  try {
    await Session.deleteOne({ sessionToken });
  } catch (err) {
    console.log(err.message);
  }
}

//const RecruiterSession=require('./dbSchema.js/')
const saveRecruiterSessionToDatabase=async(sessionData)=>{
  try {
    const session=new recruiterSession(sessionData)
    await session.save();
    return session;
  } catch (error) {
    console.error('Error saving recruiter session to database:', error);
    throw error;
  }
}
const createRecruiterSession = async (userAgent, recruiterId) => {
  try {
    
    //const sessionToken = generateSessionToken(recruiterId, 'recruiter');
    const sessionToken = generateRandomString(42);

    await saveRecruiterSessionToDatabase({
      userId: recruiterId,
      userType: 'recruiter',
      sessionToken,
      userAgent,
    });

    
    return { sessionToken };
  } catch (err) {
    console.error('Error creating recruiter session:', err);
    throw err;
  }
};

import { Otp } from "./dbSchema.js";

// Save OTP to the database
async function saveOtp(userId, otp) {
  try {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Set expiration time (10 minutes)
    const newOtp = new Otp({ userId, otp, expiresAt });
    await newOtp.save();
  } catch (err) {
    console.log(err.message);
  }
}

// Find OTP by user ID
async function findOtpByUserId(userId) {
  try {
    const otpRecord = await Otp.findOne({ userId });
    return otpRecord;
  } catch (err) {
    console.log(err.message);
  }
}

// Delete OTP after use
async function deleteOtp(userId) {
  try {
    await Otp.deleteOne({ userId });
  } catch (err) {
    console.log(err.message);
  }
}

// Update user password
async function updateUserPassword(userId, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    await User.updateOne({ _id: userId }, { password: hashedPassword });
  } catch (err) {
    console.log(err.message);
  }
}

import { Job } from "./dbSchema.js";
//! JOB DB Functions

// Add a Job to the database
async function addJobToDB(jobData) {
  try {
    const newJob = new Job({
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      skills: jobData.skills,
      jobMode: jobData.jobMode, // Added jobMode
      experience: jobData.experience, 
      salaryRange: jobData.salaryRange, 
      jobType: jobData.jobType, 
      postedBy: jobData.hrId, // Reference to HR user
    });
    await newJob.save();
    return newJob;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to add job");
  }
}

// Update a Job in the database
async function updateJobInDB(jobId, jobData) {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        skills: jobData.skills,
        jobMode:jobData.jobMode,
        experience: jobData.experience, 
        salaryRange: jobData.salaryRange, 
        jobType: jobData.jobType, 
        postedBy: jobData.hrId,
        updatedAt: Date.now(), // Update the timestamp
      },
      { new: true } // Return the updated document
    );
    return updatedJob;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to update job");
  }
}

// Delete a Job from the database
async function deleteJobFromDB(jobId) {
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) throw new Error("Job not found");
    return deletedJob;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to delete job");
  }
}


async function searchJobsInDB(search){
  try {
    const query={};
    if (search) {
      
      query.$or = [
        { location: new RegExp(search, "i") }, 
        { skills: { $regex: search, $options: "i" } }, 
        { title: new RegExp(search, "i") } 
      ];
    }
    console.log("Constructed query:", query); 
    const jobs=await Job.find(query);
    return jobs


  } catch (error) {
    console.error("Database error:", error.message);
    throw new Error("Failed to search jobs");
  }
}

import { JobApplication } from "./dbSchema.js";
async function applyForJobApplication(applicationData,file,applicantId,jobId) {
  try {
    const newApplication = new JobApplication({
      ...applicationData,
      applicantId, 
      jobId,
    resume:file.path
  });
    await newApplication.save();
    console.log("Job application submitted successfully");
    return newApplication;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to apply for the job");
  }
}


import mongoose from "mongoose";
async function updateJobApplication(applicationId, updatedData, file) {
  try {
    // console.log("recieved applicationId from frontend:" ,applicationId)
    // console.log("recieved jobId from frontend:" ,updatedData.jobId)

    if (Array.isArray(updatedData.jobId)) {
      updatedData.jobId = updatedData.jobId.find((id) => mongoose.Types.ObjectId.isValid(id));
    }
    if (Array.isArray(updatedData.applicantId)) {
      updatedData.applicantId = updatedData.applicantId.find((id) => mongoose.Types.ObjectId.isValid(id));
    }
    // if (Array.isArray(updatedData.jobId)) {
    //   updatedData.jobId = updatedData.jobId[1]; // Extract the correct jobId value
    // }
    // if (Array.isArray(updatedData.applicationId)) {
    //    updatedData.applicantId= updatedData.applicantId[1];
    // }
    

    if (!mongoose.Types.ObjectId.isValid(updatedData.jobId)) {
      throw new Error("Invalid jobId format");
    }
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      throw new Error("Invalid applicantId format");
    }
    const updateFields = { ...updatedData };

    // Update the resume field if a new file is uploaded
    if (file) {
      updateFields.resume = file.path;
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      applicationId,
      { $set: updateFields },
      { new: true } 
    );

    if (!updatedApplication) {
      throw new Error("Application not found");
    }

    console.log("Job application updated successfully");
    return updatedApplication;
  } catch (err) {
    console.error("Error updating job application:", err);  
    throw err;
  }
}

import { Notification } from "./dbSchema.js";
async function createNotification(recipientId, type, jobId, message) {
  try {
    const notification = new Notification({
      recipient: recipientId,
      type,
      jobId,
      message
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

async function getNotifications(userId) {
  try {
    const notifications = await Notification.find({ recipient: userId })
      .populate('jobId')
      .sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

async function markNotificationAsRead(notificationId) {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}


export {
  connectToDB,
  addUserToDB,
  findUserByEmail,
  findUserByUsername,
  createUserSession,
  verifySession,
  deleteSession,
  saveOtp,
  findOtpByUserId,
  deleteOtp,
  updateUserPassword,
  addJobToDB,
  updateJobInDB,
  deleteJobFromDB,
  searchJobsInDB,
  applyForJobApplication,
  upload,
  updateJobApplication,
  createNotification,
  getNotifications,
  markNotificationAsRead,
  saveRecruiterSessionToDatabase,
  createRecruiterSession,
  getRecruiterSessionByToken
};
