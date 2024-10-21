import { Schema, model } from 'mongoose';
import { USERS_COLLECTION, SESSIONS_COLLECTION } from '../config.js';

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

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { versionKey: false });

const Otp = model('Otp', otpSchema);


const User = model(USERS_COLLECTION, userSchema);
const Session = model(SESSIONS_COLLECTION, sessionSchema);

export { User, Session,Otp };
