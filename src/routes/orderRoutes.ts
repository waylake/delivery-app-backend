import express from "express";
import { OrderController } from "../controllers/orderController";
import { OrderService } from "../services/orderService";
import { authenticate } from "../middleware/authenticate";
import { validateCreateOrder, validateUpdateOrder } from "../utils/validator";

const router = express.Router();
const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.post(
  "/",
  authenticate,
  validateCreateOrder,
  orderController.createOrder.bind(orderController),
);
router.get(
  "/:id",
  authenticate,
  orderController.getOrder.bind(orderController),
);
router.put(
  "/:id",
  authenticate,
  validateUpdateOrder,
  orderController.updateOrder.bind(orderController),
);

export default router;
