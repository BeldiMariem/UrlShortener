const jwt = require("jsonwebtoken");
const User = require("../../domain/entities/user.entity");
const config = require("../../infrastructure/config/env");

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await new User(user).comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}

module.exports = LoginUser;