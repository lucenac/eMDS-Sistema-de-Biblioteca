import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
import conectarDB from './config/db';

// Routes
import AuthRoutes from './routes/auth.routes';
import BookRoutes from './routes/books.routes';
import LoanRoutes from './routes/loans.routes';
import CommentRoutes from './routes/comments.routes';

const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Database Connection
conectarDB();

// Global Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/books", BookRoutes);
app.use("/api/loans", LoanRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





