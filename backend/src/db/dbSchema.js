import { Schema, model } from 'mongoose';
import { USERS_COLLECTION, SESSIONS_COLLECTION } from '../config.js';

const userSchema = new Schema(
	{
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

const User = model(USERS_COLLECTION, userSchema);
const Session = model(SESSIONS_COLLECTION, sessionSchema);

export { User, Session };
