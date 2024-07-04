import express from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { RestaurantService } from "../services/restaurantService";
import { authenticate, authorizeAdmin } from "../middleware/authenticate";
import {
  validateCreateRestaurant,
  validateUpdateRestaurant,
} from "../utils/validator";

const router = express.Router();
const restaurantService = new RestaurantService();
const restaurantController = new RestaurantController(restaurantService);

router.post(
  "/",
  authenticate as express.RequestHandler,
  authorizeAdmin as express.RequestHandler,
  validateCreateRestaurant,
  restaurantController.createRestaurant.bind(restaurantController),
);
router.get("/", restaurantController.getRestaurants.bind(restaurantController));
router.put(
  "/:id",
  authenticate as express.RequestHandler,
  authorizeAdmin as express.RequestHandler,
  validateUpdateRestaurant,
  restaurantController.updateRestaurant.bind(restaurantController),
);

export default router;
