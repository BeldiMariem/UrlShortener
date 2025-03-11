require("dotenv").config(); 

const CreateUser = require("../../../src/usecases/user/createUser");
const UpdateUser = require("../../../src/usecases/user/updateUser");
const DeleteUser = require("../../../src/usecases/user/deleteUser");
const GetAllUsers = require("../../../src/usecases/user/getAllUsers");
const GetUserByEmail = require("../../../src/usecases/user/getUserByEmail");

describe("User Use Cases", () => {
  let userRepository;
  let createUser;
  let updateUser;
  let deleteUser;
  let getAllUsers;
  let getUserByEmail;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };
    createUser = new CreateUser(userRepository);
    updateUser = new UpdateUser(userRepository);
    deleteUser = new DeleteUser(userRepository);
    getAllUsers = new GetAllUsers(userRepository);
    getUserByEmail = new GetUserByEmail(userRepository);
  });

  describe("CreateUser", () => {
    it("should create a new user", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };

      userRepository.findByEmail.mockResolvedValue(null); 
      userRepository.create.mockResolvedValue({ ...userData, _id: "12345" });

      const result = await createUser.execute(userData);

      expect(userRepository.findByEmail).toHaveBeenCalledWith("john@example.com");
      expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({ ...userData, _id: "12345" });
    });

    it("should throw an error if user already exists", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };

      userRepository.findByEmail.mockResolvedValue({ ...userData, _id: "12345" });

      await expect(createUser.execute(userData)).rejects.toThrow("User already exists");
    });
  });

  describe("UpdateUser", () => {
    it("should update a user", async () => {
      const userId = "12345";
      const userData = { name: "John Doe" }; 

      userRepository.findById.mockResolvedValue({ _id: userId, name: "John", email: "john@example.com" });
      userRepository.update.mockResolvedValue({ _id: userId, ...userData });

      const result = await updateUser.execute(userId, userData);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.update).toHaveBeenCalledWith(userId, userData);
      expect(result).toEqual({ _id: userId, ...userData });
    });

    it("should throw an error if user not found", async () => {
      const userId = "12345";
      const userData = { name: "John Doe" };

      userRepository.findById.mockResolvedValue(null);

      await expect(updateUser.execute(userId, userData)).rejects.toThrow("User not found");
    });

    it("should throw an error if email is already in use", async () => {
      const userId = "12345";
      const userData = { email: "john.doe@example.com" };

      userRepository.findById.mockResolvedValue({ _id: userId, email: "john@example.com" });
      userRepository.findByEmail.mockResolvedValue({ _id: "67890", email: "john.doe@example.com" }); // Email already in use

      await expect(updateUser.execute(userId, userData)).rejects.toThrow("Email already in use");
    });
  });

  describe("DeleteUser", () => {
    it("should delete a user", async () => {
      const userId = "12345";

      userRepository.findById.mockResolvedValue({ _id: userId, name: "John" });
      userRepository.delete.mockResolvedValue(true);

      const result = await deleteUser.execute(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.delete).toHaveBeenCalledWith(userId);
      expect(result).toBe(true);
    });

    it("should throw an error if user not found", async () => {
      const userId = "12345";

      userRepository.findById.mockResolvedValue(null);

      await expect(deleteUser.execute(userId)).rejects.toThrow("User not found");
    });
  });

  describe("GetAllUsers", () => {
    it("should return all users", async () => {
      const users = [
        { _id: "12345", name: "John", email: "john@example.com" },
        { _id: "67890", name: "Jane", email: "jane@example.com" },
      ];

      userRepository.findAll.mockResolvedValue(users);

      const result = await getAllUsers.execute();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe("GetUserByEmail", () => {
    it("should return a user by email", async () => {
      const userEmail = "john@example.com";
      const user = { _id: "12345", name: "John", email: userEmail };
  
      userRepository.findByEmail.mockResolvedValue(user);
  
      const result = await getUserByEmail.execute(userEmail);
  
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userEmail);
      expect(result).toEqual(user);
    });
  
    it("should throw an error if user not found", async () => {
      const userEmail = "nonexistent@example.com";
  
      userRepository.findByEmail.mockResolvedValue(null);
  
      await expect(getUserByEmail.execute(userEmail)).rejects.toThrow("User not found");
    });
  });
  
});