import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import nocache from 'nocache';
import helmet from 'helmet';
import compression from 'compression'

import './config/database.js';

import auth from './middleware/auth.middleware.js';

import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};

app.use(helmet());
// Provoque un problème avec le changement de photo de l'avatar
// app.use(compression());
app.use(nocache());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// jwt
app.get('*', auth.checkUser);
app.get('/jwtid', auth.requireAuth, (_req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
