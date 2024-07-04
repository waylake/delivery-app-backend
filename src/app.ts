import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
