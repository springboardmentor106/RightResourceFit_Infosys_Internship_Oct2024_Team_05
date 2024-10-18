import { connect } from 'mongoose';
import { generateRandomString } from '../util/index.js';
import { User, Session } from './dbSchema.js';
import {
	MONGODB_URL,
	MONGODB_DB_NAME,
	MONGODB_USER,
	MONGODB_PASSWORD,
} from '../config.js';

async function connectToDB() {
	await connect(MONGODB_URL, {
		dbName: MONGODB_DB_NAME,
		user: MONGODB_USER,
		pass: MONGODB_PASSWORD,
		retryWrites: true,
		w: 'majority',
	});
	console.log('Connected to MonogoDB');
}

//! USER DB Functions

async function addUserToDB(user) {
	try {
		const newUser = new User(user);
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
			}
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

export {
	connectToDB,
	addUserToDB,
	findUserByEmail,
	createUserSession,
	verifySession,
	deleteSession,
};
