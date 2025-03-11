// src/usecases/user/updateUser.js
const User = require("../../entities/user/user.entity");

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId, userData) {
    // Validate input
    if (!userId || !userData || Object.keys(userData).length === 0) {
      throw new Error("Invalid input");
    }

    // Check if user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the new email is already in use by another user
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error("Email already in use");
      }
    }

    // Update the user
    const updatedUser = await this.userRepository.update(userId, userData);
    return updatedUser;
  }
}

module.exports = UpdateUser;