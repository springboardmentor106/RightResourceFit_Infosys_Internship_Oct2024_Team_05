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
    const { email, otp, password } = req.headers;
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
    await updateUserPassword(user._id, password);

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

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
