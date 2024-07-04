import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRequest, JwtPayload } from "../types";
import { AppError } from "../utils/appError";

export const authenticate = (
  req: IUserRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Authentication token missing", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT secret not configured", 500);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Invalid authentication token", 401));
    } else {
      next(new AppError("Authentication failed", 401));
    }
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
