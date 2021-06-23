import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import './config/database.js';
import express from 'express';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());









// routes
app.use('/api/user', userRoutes);


// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
