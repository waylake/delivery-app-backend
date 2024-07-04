import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { CreateUserDto, LoginUserDto } from "../types";

export class AuthController {
  constructor(private authService: AuthService) {}

  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.register(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const loginData: LoginUserDto = req.body;
      const { token, user } = await this.authService.login(loginData);
      res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  }
}
