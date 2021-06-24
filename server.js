import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import cookieParser from 'cookie-parser';

import './config/database.js';
import express from 'express';

import auth from './middleware/auth.middleware.js';

import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// jwt
app.get('*', auth.checkUser);
app.get('/jwtid', auth.requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
