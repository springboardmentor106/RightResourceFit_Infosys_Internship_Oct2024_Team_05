import { Schema, model } from "mongoose";
import { USERS_COLLECTION, SESSIONS_COLLECTION } from "../config.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      // minlength: 8,
      index: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 8,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const sessionSchema = new Schema(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sessionName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false }
);

const otpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings representing required skills
      required: true,
    },
    // postedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // Reference to the HR who posted the job
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Otp = model("Otp", otpSchema);
const Job = model("Job", jobSchema);
const User = model(USERS_COLLECTION, userSchema);
const Session = model(SESSIONS_COLLECTION, sessionSchema);

export { User, Session, Otp, Job };
