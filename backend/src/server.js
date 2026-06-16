import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// routes
import userRoutes from './routes/user.route.js';
import bookRoutes from './routes/book.route.js';
import categoryRoutes from './routes/category.route.js';
import transactionRoutes from './routes/transaction.route.js';
import analyticsRoutes from './routes/analytics.route.js';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

// API routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.get("/", (req, res) => {
    res.send("Spendora API is working");
})

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });