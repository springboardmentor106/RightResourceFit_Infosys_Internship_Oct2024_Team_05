import { connect } from "mongoose";
import { generateRandomString } from "../util/index.js";
import { User, Session } from "./dbSchema.js";
import bcrypt from "bcryptjs";
import {
  MONGODB_URL,
  MONGODB_DB_NAME,
  MONGODB_USER,
  MONGODB_PASSWORD,
} from "../config.js";

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

async function deleteSession(sessionToken) {
  try {
    await Session.deleteOne({ sessionToken });
  } catch (err) {
    console.log(err.message);
  }
}

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
      //postedBy: jobData.hrId, // Reference to HR user
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

// Search Jobs by location and skills
// async function searchJobsInDB(location, skills) {
//   try {
//     const query = {};
//     if (location) query.location = location;
//     if (skills && skills.length > 0) {
//       query.skills = { $in: skills.split(",") }; // Match any of the skills
//     }
//     const jobs = await Job.find(query);
//     return jobs;
//   } catch (err) {
//     console.log(err.message);
//     throw new Error("Failed to search jobs");
//   }
// }

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
  searchJobsInDB
};
