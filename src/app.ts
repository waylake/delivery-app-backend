import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./utils/errorHandler";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

connectDatabase();

app.use(generalLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
