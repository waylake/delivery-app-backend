import express from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { authenticate } from "../middleware/authenticate";
import { validateUpdateUser } from "../utils/validator";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get(
  "/profile",
  authenticate,
  userController.getProfile.bind(userController),
);
router.put(
  "/profile",
  authenticate,
  validateUpdateUser,
  userController.updateProfile.bind(userController),
);

export default router;
