import { Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { UpdateUserDto, IUserRequest } from "../types";

export class UserController {
  constructor(private userService: UserService) {}

  public async getProfile(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error("User ID not found in request");
      }
      const user = await this.userService.getUserById(userId);
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
      const userId = req.user?.id;
      if (!userId) {
        throw new Error("User ID not found in request");
      }

      const updateData: UpdateUserDto = req.body as UpdateUserDto;
      const updatedUser = await this.userService.updateUser(userId, updateData);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
