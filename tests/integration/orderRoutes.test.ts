import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import Restaurant from "../../src/models/Restaurant";
import Order from "../../src/models/Order";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

describe("Order Routes", () => {
  let token: string;
  let userId: string;
  let restaurantId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    userId = user._id.toString();

    const restaurant = await Restaurant.create({
      name: "Test Restaurant",
      address: "123 Test St",
      cuisine: "Test Cuisine",
    });
    restaurantId = restaurant._id.toString();

    token = jwt.sign(
      { id: userId, role: "user" },
      process.env.JWT_SECRET as string,
    );
  });

  afterAll(async () => {
    await Restaurant.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Order.deleteMany({});
  });

  describe("POST /api/orders", () => {
    it("should create a new order", async () => {
      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user: userId, // user 필드 추가
          restaurant: restaurantId,
          items: [{ name: "Test Item", price: 10, quantity: 2 }],
          totalAmount: 20,
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.user).toBe(userId);
      expect(res.body.restaurant).toBe(restaurantId);
    });
  });

  describe("GET /api/orders/:id", () => {
    it("should get an order by id", async () => {
      const order = await Order.create({
        user: userId,
        restaurant: restaurantId,
        items: [{ name: "Test Item", price: 10, quantity: 2 }],
        totalAmount: 20,
      });

      const res = await request(app)
        .get(`/api/orders/${order._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(order._id.toString());
    });
  });
});
