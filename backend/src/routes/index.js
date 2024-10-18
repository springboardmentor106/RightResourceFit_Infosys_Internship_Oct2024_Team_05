import express from 'express';
const router = express.Router();

import {
	addUserToDB,
	findUserByEmail,
	createUserSession,
	verifySession,
	deleteSession,
} from '../db/index.js';

//! ADMIN Routes

async function registerUser(req, res) {
	try {
		const { email, password,  } = req.headers;
		if (!email || !password) {
			throw new Error('email and password both are required');
		}
		if (await findUserByEmail(email)) {
			throw new Error('email already exists');
		}
		// if (email.length < 8 || password.length < 8) {
		// 	throw new Error(
		// 		'email and password both must be at least 8 characters long'
		// 	);
		// }
		await addUserToDB({ email, password });
		res.status(200).json({ message: 'user created successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function loginUser(req, res) {
	try {
		const { email, password } = req.headers;
		const userAgent = req.get('User-Agent');
		if (!email || !password) {
			res.status(400).json({
				message: 'email_and_password_both_are_required',
			});
		}
		const existingUser = await findUserByEmail(email);
		if (!existingUser) {
			res.status(401).json({ message: 'user_not_found' });
		}
		if (existingUser.password !== password) {
			res.status(401).json({ message: 'invalid_password' });
		}
		const session = await createUserSession(userAgent, existingUser._id);
		res.status(200).json({ sessionToken: session.sessionToken });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function validateUserSession(req, res) {
	try {
		const session = req.headers.authorization.split(' ')[1];
		const sessionInfo = await verifySession(session);
		if (!sessionInfo) {
			res.status(401).json({ message: 'invalid_session' });
		} else {
			res.status(200).json({
				message: 'valid_session',
				user: sessionInfo,
			});
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function logoutUser(req, res) {
	try {
		const session = req.headers.authorization.split(' ')[1];
		const sessionInfo = await verifySession(session);
		if (!sessionInfo) {
			res.status(401).json({ message: 'invalid_session' });
		} else {
			await deleteSession(session);
			res.status(200).json({ message: 'session_deleted_successfully' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

//! User Route Handlers

// Route handler for /api/register
router.post('/register', async (req, res) => {
	console.log(`registering user -> ${req.headers.email}`);
	await registerUser(req, res);
});

// Route handler for /api/login
router.post('/login', async (req, res) => {
	console.log(`logging in user -> ${req.headers.email}`);
	await loginUser(req, res);
});

// Route to validate session /api/dashboard
router.post('/dashboard', async (req, res) => {
	console.log(`validating sessionId -> ${req.headers.authorization}`);
	await validateUserSession(req, res);
});

// Route to logout session /api/logout
router.post('/logout', async (req, res) => {
	console.log(
		`deleting sessionId -> ${req.headers.authorization.split(' ')[1]}`
	);
	await logoutUser(req, res);
});

export default router;
