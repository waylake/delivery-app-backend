import User, { IUser } from "../models/User";
import { UpdateUserDto } from "../types";
import { AppError } from "../utils/appError";

export class UserService {
  public async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  public async updateUser(
    id: string,
    updateData: UpdateUserDto,
  ): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}
