import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoute from './routes/index.js';
import { connectToDB } from './db/index.js';
import { BACKEND_LISTEN_PORT, CORS_ALLOWED_ORIGINS } from './config.js';


const app = express();
connectToDB();

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || CORS_ALLOWED_ORIGINS.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	// credentials: true,
	// optionsSuccessStatus: 204,
	// allowedHeaders: 'Content-Type,Authorization,username,password,token',
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute); // example: http://jaish.com/api

// make express app to listen on PORT for incoming requests
const PORT_LISTEN = process.env.BACKEND_LISTEN_PORT;
app.listen(BACKEND_LISTEN_PORT, () => {
	console.log(`Server Started on  -->>  http://localhost:${BACKEND_LISTEN_PORT}/api/`);
});
