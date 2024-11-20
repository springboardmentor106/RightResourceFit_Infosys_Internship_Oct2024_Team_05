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

// Define HR user schema
const hrUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "HR", // Specifies this user as HR
    enum: ["HR", "Admin"], // Only HR and Admin allowed
  },
  companyName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  sessions: [{
    sessionToken: String,
    expiresAt: Date
  }],
}, { versionKey: false });

// Pre-save middleware for updating `updatedAt` timestamp on modification
hrUserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

//import { Schema, model } from "mongoose";


const jobApplicationSchema = new Schema(
  {
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: USERS_COLLECTION, 
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job", 
      required: true,
    },
    
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      enum: ["High School", "Bachelor's", "Master's", "PhD"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["0-1 Years", "1-3 Years", "3-5 Years", "5+ Years"],
      required: true,
    },
    resume: {
      type: String, 
      required: true,
    },
    terms: {
      type: Boolean,
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
const notificationSchema = new Schema({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['application', 'status_update'],
    required: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = model('Notification', notificationSchema);
const HRUser = model("HRUser", hrUserSchema);
const Otp = model("Otp", otpSchema);
const Job = model("Job", jobSchema);
const User = model(USERS_COLLECTION, userSchema);
const Session = model(SESSIONS_COLLECTION, sessionSchema);
const JobApplication = model("JobApplication", jobApplicationSchema);


export { User, Session, Otp, Job,HRUser,JobApplication,Notification };
