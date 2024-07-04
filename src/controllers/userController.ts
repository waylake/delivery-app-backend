import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";
import { IUserRequest } from "../types";

export class UserController {
  constructor(private userService: UserService) {}

  public async getProfile(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        throw new Error("User ID not found in request");
      }
      const user = await this.userService.getUserById(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        throw new Error("User ID not found in request");
      }
      const updatedUser = await this.userService.updateUser(
        req.user.id,
        req.body,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  public async logout(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (token) {
        const authService = new AuthService();
        await authService.logout(token);
      }
      res.status(200).send("Logged out");
    } catch (error) {
      next(error);
    }
  }
}
