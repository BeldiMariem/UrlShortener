// tests/entities/user/user.entity.test.js
const User = require("../../../src/entities/user/user.entity");

describe("User Entity", () => {
  it("should throw an error if user data is invalid", () => {
    const userData = { name: 123, email: "invalid-email", password: 123 }; // Invalid data
    const user = new User(userData);
    expect(() => user.validate()).toThrow("Invalid name");
  });

  it("should not throw an error if user data is partially valid", () => {
    const userData = { name: "John" }; // Only name is provided
    const user = new User(userData);
    expect(() => user.validate()).not.toThrow();
  });

  it("should create a valid user", () => {
    const userData = { name: "John", email: "john@example.com", password: "password123" };
    const user = new User(userData);
    expect(user.name).toBe("John");
    expect(user.email).toBe("john@example.com");
    expect(user.password).toBe("password123");
  });

  it("should hash the password", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123" };
    const user = new User(userData);
    await user.hashPassword();
    expect(user.password).not.toBe("password123"); // Password should be hashed
  });

  it("should compare passwords correctly", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123" };
    const user = new User(userData);
    await user.hashPassword();
    const isMatch = await user.comparePassword("password123");
    expect(isMatch).toBe(true);
  });
});