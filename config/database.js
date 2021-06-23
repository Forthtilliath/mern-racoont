import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.1qjb5.mongodb.net/racoont', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
