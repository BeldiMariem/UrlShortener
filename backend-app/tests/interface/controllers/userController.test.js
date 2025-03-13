const request = require("supertest");
const express = require("express");
const userRoutes = require("../../../src/interface/routes/userRoutes");
const ValidationError = require("../../../src/usecases/errors/validationError");
const DuplicateUserError = require("../../../src/usecases/errors/duplicateUserError");
const NotFoundError = require("../../../src/usecases/errors/notFoundError");
const { createUserHandler, getAllUsersHandler, getUserByEmailHandler, updateUserHandler, deleteUserHandler } = require("../../../src/interface/controllers/userController");

jest.mock("../../../src/usecases/user/createUser");
jest.mock("../../../src/usecases/user/getAllUsers");
jest.mock("../../../src/usecases/user/getUserByEmail");
jest.mock("../../../src/usecases/user/updateUser");
jest.mock("../../../src/usecases/user/deleteUser");

jest.mock("../../../src/interface/middleware/authMiddleware", () => ({
  authenticate: (req, res, next) => {
    req.user = { id: "12345", role: "admin" }; 
    next();
  },
}));

jest.mock("../../../src/interface/middleware/authorizeMiddleware", () => ({
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

  describe("createUserHandler", () => {
    it("should create a user and return 201", async () => {
      const mockCreateUser = {
        execute: jest.fn().mockResolvedValue({ id: "123", name: "John", email: "john@example.com" }),
      };
  
      const req = {
        body: { name: "John", email: "john@example.com", password: "password123", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUserHandler(mockCreateUser)(req, res);
  
      expect(mockCreateUser.execute).toHaveBeenCalledWith({
        name: "John",
        email: "john@example.com",
        password: "password123",
        role: "user",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: "123", name: "John", email: "john@example.com" });
    });
  
    it("should handle ValidationError and return 400", async () => {
      const mockCreateUser = {
        execute: jest.fn().mockRejectedValue(new ValidationError("Invalid input")),
      };
  
      const req = {
        body: { name: "", email: "john@example.com", password: "password123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUserHandler(mockCreateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid input" });
    });
  
    it("should handle DuplicateUserError and return 409", async () => {
      const mockCreateUser = {
        execute: jest.fn().mockRejectedValue(new DuplicateUserError("Email already in use")),
      };
  
      const req = {
        body: { name: "John", email: "john@example.com", password: "password123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUserHandler(mockCreateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already in use" });
    });
  
    it("should handle unexpected errors and return 500", async () => {
      const mockCreateUser = {
        execute: jest.fn().mockRejectedValue(new Error("Unexpected error")),
      };
  
      const req = {
        body: { name: "John", email: "john@example.com", password: "password123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUserHandler(mockCreateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllUsersHandler", () => {
    it("should return all users and return 200", async () => {
      const mockGetAllUsers = {
        execute: jest.fn().mockResolvedValue([
          { id: "123", name: "John", email: "john@example.com" },
          { id: "456", name: "Jane", email: "jane@example.com" },
        ]),
      };
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getAllUsersHandler(mockGetAllUsers)(req, res);
  
      expect(mockGetAllUsers.execute).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "123", name: "John", email: "john@example.com" },
        { id: "456", name: "Jane", email: "jane@example.com" },
      ]);
    });
  
    it("should handle unexpected errors and return 500", async () => {
      const mockGetAllUsers = {
        execute: jest.fn().mockRejectedValue(new Error("Unexpected error")),
      };
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getAllUsersHandler(mockGetAllUsers)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getUserByEmailHandler", () => {
    it("should return a user by email and return 200", async () => {
      const mockGetUserByEmail = {
        execute: jest.fn().mockResolvedValue({ id: "123", name: "John", email: "john@example.com" }),
      };
  
      const req = {
        params: { email: "john@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getUserByEmailHandler(mockGetUserByEmail)(req, res);
  
      expect(mockGetUserByEmail.execute).toHaveBeenCalledWith("john@example.com");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: "123", name: "John", email: "john@example.com" });
    });
  
    it("should handle NotFoundError and return 404", async () => {
      const mockGetUserByEmail = {
        execute: jest.fn().mockRejectedValue(new NotFoundError("User not found")),
      };
  
      const req = {
        params: { email: "john@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getUserByEmailHandler(mockGetUserByEmail)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  
    it("should handle unexpected errors and return 500", async () => {
      const mockGetUserByEmail = {
        execute: jest.fn().mockRejectedValue(new Error("Unexpected error")),
      };
  
      const req = {
        params: { email: "john@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getUserByEmailHandler(mockGetUserByEmail)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateUserHandler", () => {
    it("should update a user and return 200", async () => {
      const mockUpdateUser = {
        execute: jest.fn().mockResolvedValue({ id: "123", name: "John Doe", email: "john@example.com" }),
      };
  
      const req = {
        params: { id: "123" },
        body: { name: "John Doe" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUserHandler(mockUpdateUser)(req, res);
  
      expect(mockUpdateUser.execute).toHaveBeenCalledWith("123", { name: "John Doe" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
        user: { id: "123", name: "John Doe", email: "john@example.com" },
      });
    });
  
    it("should handle NotFoundError and return 404", async () => {
      const mockUpdateUser = {
        execute: jest.fn().mockRejectedValue(new NotFoundError("User not found")),
      };
  
      const req = {
        params: { id: "123" },
        body: { name: "John Doe" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUserHandler(mockUpdateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  
    it("should handle ValidationError and return 400", async () => {
      const mockUpdateUser = {
        execute: jest.fn().mockRejectedValue(new ValidationError("Invalid input")),
      };
  
      const req = {
        params: { id: "123" },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUserHandler(mockUpdateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid input" });
    });
  
    it("should handle DuplicateUserError and return 409", async () => {
      const mockUpdateUser = {
        execute: jest.fn().mockRejectedValue(new DuplicateUserError("Email already in use")),
      };
  
      const req = {
        params: { id: "123" },
        body: { email: "john@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUserHandler(mockUpdateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already in use" });
    });
  
    it("should handle unexpected errors and return 500", async () => {
      const mockUpdateUser = {
        execute: jest.fn().mockRejectedValue(new Error("Unexpected error")),
      };
  
      const req = {
        params: { id: "123" },
        body: { name: "John Doe" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUserHandler(mockUpdateUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("deleteUserHandler", () => {
    it("should delete a user and return 200", async () => {
      const mockDeleteUser = {
        execute: jest.fn().mockResolvedValue(true),
      };
  
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deleteUserHandler(mockDeleteUser)(req, res);
  
      expect(mockDeleteUser.execute).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });
  
    it("should handle NotFoundError and return 404", async () => {
      const mockDeleteUser = {
        execute: jest.fn().mockRejectedValue(new NotFoundError("User not found")),
      };
  
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deleteUserHandler(mockDeleteUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  
    it("should handle unexpected errors and return 500", async () => {
      const mockDeleteUser = {
        execute: jest.fn().mockRejectedValue(new Error("Unexpected error")),
      };
  
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deleteUserHandler(mockDeleteUser)(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});