import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

describe("User Routes", () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    userId = user._id.toString();

    token = jwt.sign(
      { id: userId, role: "user" },
      process.env.JWT_SECRET as string,
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("GET /api/users/profile", () => {
    it("should get user profile", async () => {
      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(userId);
      expect(res.body.email).toBe("test@example.com");
    });
  });

  describe("PUT /api/users/profile", () => {
    it("should update user profile", async () => {
      const res = await request(app)
        .put("/api/users/profile")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Name",
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Updated Name");
    });
  });
});
