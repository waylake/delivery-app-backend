import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurantService";
import { CreateRestaurantDto, UpdateRestaurantDto } from "../types";

export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  public async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const restaurantData: CreateRestaurantDto = req.body;
      const restaurant =
        await this.restaurantService.createRestaurant(restaurantData);
      res.status(201).json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  public async getRestaurants(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const restaurants = await this.restaurantService.getAllRestaurants();
      res.status(200).json(restaurants);
    } catch (error) {
      next(error);
    }
  }

  public async updateRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const restaurantId = req.params.id;
      const updateData: UpdateRestaurantDto = req.body;
      const updatedRestaurant = await this.restaurantService.updateRestaurant(
        restaurantId,
        updateData,
      );
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      next(error);
    }
  }
}
