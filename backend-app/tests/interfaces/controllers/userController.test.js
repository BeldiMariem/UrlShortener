const request = require("supertest");
const express = require("express");
const userRoutes = require("../../../src/interfaces/routes/userRoutes");

jest.mock("../../../src/usecases/user/createUser");
jest.mock("../../../src/usecases/user/getAllUsers");
jest.mock("../../../src/usecases/user/getUserByEmail");
jest.mock("../../../src/usecases/user/updateUser");
jest.mock("../../../src/usecases/user/deleteUser");

jest.mock("../../../src/interfaces/middleware/authMiddleware", () => ({
  authenticate: (req, res, next) => {
    req.user = { id: "12345", role: "admin" }; 
    next();
  },
}));

jest.mock("../../../src/interfaces/middleware/authorizeMiddleware", () => ({
  authorize: (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  },
}));

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

describe("User Controller and Routes", () => {
  let createUser, getAllUsers, getUserByEmail, updateUser, deleteUser;

  beforeEach(() => {
    jest.clearAllMocks();

    createUser = require("../../../src/usecases/user/createUser");
    getAllUsers = require("../../../src/usecases/user/getAllUsers");
    getUserByEmail = require("../../../src/usecases/user/getUserByEmail");
    updateUser = require("../../../src/usecases/user/updateUser");
    deleteUser = require("../../../src/usecases/user/deleteUser");
  });

  describe("POST /user/createUser", () => {
    it("should create a new user and return 201 status", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };
      const createdUser = { ...userData, _id: "12345" };

      createUser.prototype.execute.mockResolvedValue(createdUser);

      const response = await request(app)
        .post("/user/createUser")
        .send(userData)
        .expect(201);

      expect(createUser.prototype.execute).toHaveBeenCalledWith(userData);
      expect(response.body).toEqual(createdUser);
    });

    it("should return 400 status if user already exists", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };

      createUser.prototype.execute.mockRejectedValue(new Error("User already exists"));

      const response = await request(app)
        .post("/user/createUser")
        .send(userData)
        .expect(400);

      expect(response.body).toEqual({ error: "User already exists" });
    });
  });

  describe("GET /user/getAllUsers", () => {
    it("should return all users and return 200 status", async () => {
      const users = [
        { _id: "12345", name: "John", email: "john@example.com" },
        { _id: "67890", name: "Jane", email: "jane@example.com" },
      ];

      getAllUsers.prototype.execute.mockResolvedValue(users);

      const response = await request(app)
        .get("/user/getAllUsers")
        .expect(200);

      expect(getAllUsers.prototype.execute).toHaveBeenCalled();
      expect(response.body).toEqual(users);
    });

    it("should return 500 status if an error occurs", async () => {
      getAllUsers.prototype.execute.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/user/getAllUsers")
        .expect(500);

      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  describe("GET /user/getUserByEmail/:email", () => {
    it("should return a user by email and return 200 status", async () => {
      const userEmail = "john@example.com";
      const user = { _id: "12345", name: "John", email: userEmail };

      getUserByEmail.prototype.execute.mockResolvedValue(user);

      const response = await request(app)
        .get(`/user/getUserByEmail/${encodeURIComponent(userEmail)}`)
        .expect(200);

      expect(getUserByEmail.prototype.execute).toHaveBeenCalledWith(userEmail);
      expect(response.body).toEqual(user);
    });

    it("should return 404 status if user not found", async () => {
      const userEmail = "nonexistent@example.com";

      getUserByEmail.prototype.execute.mockRejectedValue(new Error("User not found"));

      const response = await request(app)
        .get(`/user/getUserByEmail/${encodeURIComponent(userEmail)}`)
        .expect(404);

      expect(response.body).toEqual({ error: "User not found" });
    });
  });

  describe("PUT /user/updateUser/:id", () => {
    it("should return 404 status if user not found", async () => {
      const userId = "12345";
      const userData = { name: "John Doe" };
  
      updateUser.prototype.execute.mockRejectedValue(new Error("User not found"));
  
      const response = await request(app)
        .put(`/user/updateUser/${userId}`)
        .send(userData)
        .expect(404);
  
      expect(response.body).toEqual({ error: "User not found" });
    });
  
    it("should return 400 status if email is already in use", async () => {
      const userId = "12345";
      const userData = { email: "john.doe@example.com" };
  
      updateUser.prototype.execute.mockRejectedValue(new Error("Email already in use"));
  
      const response = await request(app)
        .put(`/user/updateUser/${userId}`)
        .send(userData)
        .expect(400);
  
      expect(response.body).toEqual({ error: "Email already in use" });
    });
  });

  describe("DELETE /user/deleteUser/:id", () => {
    it("should delete a user and return 200 status", async () => {
      const userId = "12345";

      deleteUser.prototype.execute.mockResolvedValue(true);

      const response = await request(app)
        .delete(`/user/deleteUser/${userId}`)
        .expect(200);

      expect(deleteUser.prototype.execute).toHaveBeenCalledWith(userId);
      expect(response.body).toEqual({ message: "User deleted successfully" });
    });

    it("should return 404 status if user not found", async () => {
      const userId = "12345";

      deleteUser.prototype.execute.mockRejectedValue(new Error("User not found"));

      const response = await request(app)
        .delete(`/user/deleteUser/${userId}`)
        .expect(404);

      expect(response.body).toEqual({ error: "User not found" });
    });
  });
});