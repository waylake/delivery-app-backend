import { Request } from "express";

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface CreateOrderDto {
  user: string;
  restaurant: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

export interface UpdateOrderDto {
  status: "pending" | "preparing" | "delivering" | "delivered" | "cancelled";
}

export interface CreateRestaurantDto {
  name: string;
  address: string;
  cuisine: string;
  menu: Array<{
    name: string;
    description?: string;
    price: number;
  }>;
}

export interface UpdateRestaurantDto {
  name?: string;
  address?: string;
  cuisine?: string;
  menu?: Array<{
    name: string;
    description?: string;
    price: number;
  }>;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}
export interface IUserRequest extends Request {
  user?: JwtPayload;
}
