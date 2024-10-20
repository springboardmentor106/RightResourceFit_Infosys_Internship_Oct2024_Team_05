import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

import { EMAIL_USER, EMAIL_PASSWORD } from "../config.js";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change to Gmail, Yahoo, etc.
  auth: {
    user: EMAIL_USER, // Your email address
    pass: EMAIL_PASSWORD, // Your email password
  },
});

// Define the email options
const globalMailOptions = {
  from: '"Right Resource Fit" <rightresourcefit@gmail.com>', // Sender address
};

// Function to send OTP email
const sendOtpEmail = async (to, templateData) => {
  // Read the HTML template
  const templateHtml = fs.readFileSync(
    "./src/email/template/otpEmailTemplate.html",
    "utf8"
  );

  // Compile the template using Handlebars
  const template = handlebars.compile(templateHtml);

  // Insert dynamic data into the template
  const htmlToSend = template(templateData);

  // Define the email options
  const mailOptions = {
    ...globalMailOptions,
    to,
    subject: "Your OTP Code", // Email subject
    html: htmlToSend, // HTML body content
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent: " + to);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

// Function to send the password reset success email
const sendPasswordResetSuccessEmail = async (to, templateData) => {
  // Read the HTML template
  const templateHtml = fs.readFileSync(
    "./src/email/template/passwordResetSuccess.html",
    "utf8"
  );

  // Compile the template using Handlebars
  const template = handlebars.compile(templateHtml);

  // Insert dynamic data into the template
  const htmlToSend = template(templateData);

  // Define the email options
  const mailOptions = {
    ...globalMailOptions,
    to,
    subject: "Password Reset Successful", // Subject of the email
    html: htmlToSend, // HTML body content
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent: " + to);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
  }
};

export { sendPasswordResetSuccessEmail, sendOtpEmail };
