const bcrypt = require("bcryptjs");
const { ValidationError } = require("../../../src/usecases/errors");
const User = require("../../../src/domain/user/user.entity");

describe("User Entity", () => {
  describe("validate()", () => {
    it("should throw a ValidationError if name is invalid", () => {
      const userData = { name: 123, email: "john@example.com", password: "password123" };
      const user = new User(userData);

      expect(() => user.validate()).toThrow(ValidationError);
    });

    it("should throw a ValidationError if email is invalid", () => {
      const userData = { name: "John", email: 123, password: "password123" };
      const user = new User(userData);

      expect(() => user.validate()).toThrow(ValidationError);
    });

    it("should throw a ValidationError if password is invalid", () => {
      const userData = { name: "John", email: "john@example.com", password: 123 };
      const user = new User(userData);

      expect(() => user.validate()).toThrow(ValidationError);
    });

    it("should not throw an error if user data is valid", () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };
      const user = new User(userData);

      expect(() => user.validate()).not.toThrow();
    });
  });

  describe("hashPassword()", () => {
    it("should hash the password", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };
      const user = new User(userData);

      await user.hashPassword();

      expect(user.password).not.toBe("password123"); 
      expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/); 
    });
  });

  describe("comparePassword()", () => {
    it("should return true if the candidate password matches the hashed password", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };
      const user = new User(userData);

      await user.hashPassword(); 
      const isMatch = await user.comparePassword("password123");

      expect(isMatch).toBe(true);
    });

    it("should return false if the candidate password does not match the hashed password", async () => {
      const userData = { name: "John", email: "john@example.com", password: "password123" };
      const user = new User(userData);

      await user.hashPassword(); 
      const isMatch = await user.comparePassword("wrongpassword");

      expect(isMatch).toBe(false);
    });
  });
});