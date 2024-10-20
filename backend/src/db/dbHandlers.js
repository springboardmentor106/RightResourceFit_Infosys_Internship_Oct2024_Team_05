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
};
