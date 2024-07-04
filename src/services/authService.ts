import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import User from "../models/User";
import { CreateUserDto, LoginUserDto, JwtPayload } from "../types";
import { AppError } from "../utils/appError";

export class AuthService {
  public async register(userData: CreateUserDto): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const user = new User(userData);
    await user.save();

    return user;
  }

  public async login(
    loginData: LoginUserDto,
  ): Promise<{ token: string; user: IUser }> {
    const user = await User.findOne({ email: loginData.email });
    if (!user || !(await user.comparePassword(loginData.password))) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = this.generateToken(user);

    return { token, user };
  }

  private generateToken(user: IUser): string {
    const payload: JwtPayload = {
      id: user._id.toString(), // 여기서 .toString() 메서드를 사용하여 string 타입으로 변환
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }
}
