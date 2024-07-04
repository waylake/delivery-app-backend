import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import Restaurant from "../../src/models/Restaurant";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

describe("Restaurant Routes", () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    const user = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: "password123",
    });

    adminToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET as string,
    );
    userToken = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET as string,
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Restaurant.deleteMany({});
  });

  describe("POST /api/restaurants", () => {
    it("should create a new restaurant when admin", async () => {
      const res = await request(app)
        .post("/api/restaurants")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "New Restaurant",
          address: "123 New St",
          cuisine: "New Cuisine",
          menu: [
            {
              name: "Sample Dish",
              description: "Delicious dish",
              price: 10.99,
            },
            {
              name: "Another Dish",
              description: "Tasty and delightful",
              price: 12.99,
            },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe("New Restaurant");
      expect(res.body.menu).toHaveLength(2);
      expect(res.body.menu[0]).toMatchObject({
        name: "Sample Dish",
        description: "Delicious dish",
        price: 10.99,
      });
    });

    it("should not create a new restaurant when regular user", async () => {
      const res = await request(app)
        .post("/api/restaurants")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "New Restaurant",
          address: "123 New St",
          cuisine: "New Cuisine",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/restaurants", () => {
    it("should get all restaurants", async () => {
      await Restaurant.create([
        {
          name: "Restaurant 1",
          address: "123 St",
          cuisine: "Cuisine 1",
          menu: [
            {
              name: "Dish 1",
              description: "Description 1",
              price: 10,
            },
          ],
        },
        {
          name: "Restaurant 2",
          address: "456 St",
          cuisine: "Cuisine 2",
          menu: [
            {
              name: "Dish 2",
              description: "Description 2",
              price: 20,
            },
          ],
        },
      ]);

      const res = await request(app).get("/api/restaurants");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].menu).toHaveLength(1);
      expect(res.body[0].menu[0].name).toBe("Dish 1");
      expect(res.body[1].menu[0].name).toBe("Dish 2");
    });
  });
});
