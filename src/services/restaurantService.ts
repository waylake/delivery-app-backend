import Restaurant, { IRestaurant } from "../models/Restaurant";
import { CreateRestaurantDto, UpdateRestaurantDto } from "../types";
import { AppError } from "../utils/appError";

export class RestaurantService {
  public async createRestaurant(
    restaurantData: CreateRestaurantDto,
  ): Promise<IRestaurant> {
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    return restaurant;
  }

  public async getAllRestaurants(): Promise<IRestaurant[]> {
    return Restaurant.find().sort({ name: 1 });
  }

  public async getRestaurantById(id: string): Promise<IRestaurant> {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }
    return restaurant;
  }

  public async updateRestaurant(
    id: string,
    updateData: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }
    return restaurant;
  }

  public async deleteRestaurant(id: string): Promise<void> {
    const result = await Restaurant.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Restaurant not found", 404);
    }
  }
}
