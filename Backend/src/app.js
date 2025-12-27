import express, { application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './utils/globalErrorHandler.js';

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// error handler
app.use(globalErrorHandler);

export  { app };