require("dotenv").config(); 
const LoginUser = require("../../../src/usecases/auth/loginUser");

jest.mock("../../../src/domain/entities/user.entity", () => {
  return jest.fn().mockImplementation((userData) => ({
    ...userData,
    comparePassword: jest.fn(),
  }));
});

describe("LoginUser Use Case", () => {
  let userRepository;
  let loginUser;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    };
    loginUser = new LoginUser(userRepository);
  });

  it("should login a user with valid credentials", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123", _id: "12345", role: "user" };

    userRepository.findByEmail.mockResolvedValue(userData);

    const User = require("../../../src/domain/entities/user.entity");
    User.mockImplementation(() => ({
      ...userData,
      comparePassword: jest.fn().mockResolvedValue(true),
    }));

    const result = await loginUser.execute({ email: "john@example.com", password: "password123" });

    expect(userRepository.findByEmail).toHaveBeenCalledWith("john@example.com");
    expect(result.token).toBeDefined();
    expect(result.user).toEqual(userData);
  });

  it("should throw an error if password is incorrect", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123", _id: "12345", role: "user" };

    userRepository.findByEmail.mockResolvedValue(userData);

    const User = require("../../../src/domain/entities/user.entity");
    User.mockImplementation(() => ({
      ...userData,
      comparePassword: jest.fn().mockResolvedValue(false),
    }));

    await expect(loginUser.execute({ email: "john@example.com", password: "wrongpassword" })).rejects.toThrow("Invalid credentials");
  });

  it("should throw an error if user is not found", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(loginUser.execute({ email: "john@example.com", password: "password123" })).rejects.toThrow("User not found");
  });
});