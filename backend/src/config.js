import dotenv from 'dotenv';
dotenv.config();

// keys and constants
// const mongoURI = process.env.MONGO_URI;

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const USERS_COLLECTION = process.env.USERS_COLLECTION;
const SESSIONS_COLLECTION = process.env.SESSIONS_COLLECTION;

const BACKEND_LISTEN_PORT = process.env.BACKEND_LISTEN_PORT;
const BACKEND_API_URL = process.env.BACKEND_API_URL;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

export {
	MONGODB_URL,
	MONGODB_DB_NAME,
	MONGODB_USER,
	MONGODB_PASSWORD,
	USERS_COLLECTION,
	SESSIONS_COLLECTION,
	BACKEND_LISTEN_PORT,
	BACKEND_API_URL,
	CORS_ALLOWED_ORIGINS,
	EMAIL_USER,
	EMAIL_PASSWORD
};
