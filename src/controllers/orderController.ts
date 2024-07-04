import { Response, NextFunction } from "express";
import { OrderService } from "../services/orderService";
import { CreateOrderDto, UpdateOrderDto, IUserRequest } from "../types";

export class OrderController {
  constructor(private orderService: OrderService) {}

  public async createOrder(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error("User ID is missing in request");
      }
      const orderData: CreateOrderDto = { ...req.body, user: userId };
      const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }

  public async getOrder(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const orderId = req.params.id;
      const order = await this.orderService.getOrderById(orderId);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  public async updateOrder(
    req: IUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const orderId = req.params.id;
      const updateData: UpdateOrderDto = req.body;
      const updatedOrder = await this.orderService.updateOrder(
        orderId,
        updateData,
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
}
