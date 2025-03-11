// tests/interfaces/controllers/authController.test.js
const request = require("supertest");
const express = require("express");
const authController = require("../../../src/interfaces/controllers/authController");

// Mock the UserRepository and use cases
jest.mock("../../../src/interfaces/repositories/userRepository");
jest.mock("../../../src/usecases/user/registerUser");
jest.mock("../../../src/usecases/user/loginUser");

const app = express();
app.use(express.json());
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

describe("AuthController", () => {
  describe("POST /auth/register", () => {
    it("should register a new user and return 201", async () => {
      const userData = {
        name: "Mariem Beldi",
        email: "mariem@example.com",
        password: "password123",
      };

      // Mock the registerUser use case
      const mockUser = { ...userData, _id: "12345", role: "user" };
      require("../../../src/usecases/user/registerUser").prototype.execute.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it("should return 400 if user data is invalid", async () => {
      const invalidUserData = { name: "", email: "", password: "" };

      require("../../../src/usecases/user/registerUser").prototype.execute.mockRejectedValue(new Error("Invalid user data"));

      const response = await request(app)
        .post("/auth/register")
        .send(invalidUserData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Invalid user data" });
    });

    it("should return 400 if user already exists", async () => {
      const userData = {
        name: "Mariem Beldi",
        email: "mariem@example.com",
        password: "password123",
      };

      require("../../../src/usecases/user/registerUser").prototype.execute.mockRejectedValue(new Error("User already exists"));

      const response = await request(app)
        .post("/auth/register")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "User already exists" });
    });
  });

  describe("POST /auth/login", () => {
    it("should login a user and return 200 with token and user data", async () => {
      const loginData = {
        email: "mariem@example.com",
        password: "password123",
      };

      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
      const mockUser = {
        _id: "12345",
        name: "Mariem Beldi",
        email: "mariem@example.com",
        role: "user",
      };
      require("../../../src/usecases/user/loginUser").prototype.execute.mockResolvedValue({ token: mockToken, user: mockUser });

      const response = await request(app)
        .post("/auth/login")
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken, user: mockUser });
    });

    it("should return 400 if credentials are invalid", async () => {
      const invalidLoginData = {
        email: "mariem@example.com",
        password: "wrongpassword",
      };

      require("../../../src/usecases/user/loginUser").prototype.execute.mockRejectedValue(new Error("Invalid credentials"));

      const response = await request(app)
        .post("/auth/login")
        .send(invalidLoginData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Invalid credentials" });
    });

    it("should return 400 if user is not found", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      require("../../../src/usecases/user/loginUser").prototype.execute.mockRejectedValue(new Error("User not found"));

      const response = await request(app)
        .post("/auth/login")
        .send(loginData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "User not found" });
    });
  });
});