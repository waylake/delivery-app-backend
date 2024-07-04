import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRequest, JwtPayload } from "../types";
import { AppError } from "../utils/appError";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const authenticate = async (
  req: IUserRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Authentication failed", 401);
    }

    const isBlacklisted = await authService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new AppError("Token is blacklisted", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Authentication failed", 401));
  }
};

export const authorizeAdmin = (
  req: IUserRequest,
  _res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Access denied. Admin only.", 403));
  }
  next();
};
