import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
  handleValidationErrors,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

export const validateCreateOrder = [
  body("restaurant").isMongoId().withMessage("Invalid restaurant ID"),
  body("items").isArray().withMessage("Items must be an array"),
  body("items.*.name").notEmpty().withMessage("Item name is required"),
  body("items.*.price").isNumeric().withMessage("Item price must be a number"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Item quantity must be a positive integer"),
  handleValidationErrors,
];

export const validateUpdateOrder = [
  body("status")
    .isIn(["pending", "preparing", "delivering", "delivered", "cancelled"])
    .withMessage("Invalid order status"),
  handleValidationErrors,
];

export const validateCreateRestaurant = [
  body("name").notEmpty().withMessage("Restaurant name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("cuisine").notEmpty().withMessage("Cuisine is required"),
  body("menu").isArray().withMessage("Menu must be an array"),
  body("menu.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menu.*.price")
    .isNumeric()
    .withMessage("Menu item price must be a number"),
  handleValidationErrors,
];

export const validateUpdateRestaurant = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Restaurant name cannot be empty"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
  body("cuisine").optional().notEmpty().withMessage("Cuisine cannot be empty"),
  body("menu").optional().isArray().withMessage("Menu must be an array"),
  body("menu.*.name")
    .optional()
    .notEmpty()
    .withMessage("Menu item name cannot be empty"),
  body("menu.*.price")
    .optional()
    .isNumeric()
    .withMessage("Menu item price must be a number"),
  handleValidationErrors,
];

export const validateUpdateUser = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];
