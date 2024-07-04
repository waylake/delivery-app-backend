import Order, { IOrder } from "../models/Order";
import { CreateOrderDto, UpdateOrderDto } from "../types";
import { AppError } from "../utils/appError";

export class OrderService {
  public async createOrder(orderData: CreateOrderDto): Promise<IOrder> {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  public async getOrderById(id: string): Promise<IOrder> {
    const order = await Order.findById(id)
      .populate("user")
      .populate("restaurant");
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }

  public async updateOrder(
    id: string,
    updateData: UpdateOrderDto,
  ): Promise<IOrder> {
    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }

  public async deleteOrder(id: string): Promise<void> {
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Order not found", 404);
    }
  }
}
