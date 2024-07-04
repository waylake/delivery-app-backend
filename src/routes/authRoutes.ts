import express from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { validateRegister, validateLogin } from "../utils/validator";

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post(
  "/register",
  validateRegister,
  authController.register.bind(authController),
);
router.post("/login", validateLogin, authController.login.bind(authController));

export default router;
