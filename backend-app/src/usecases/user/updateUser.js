const IUserRepository = require("../../domain/interfaces/userRepository");
const DuplicateUserError = require("../errors/duplicateUserError");
const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");

class UpdateUser {
  constructor(userRepository) {
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error("Invalid user repository: Must implement IUserRepository");
    }
    this.userRepository = userRepository;
  }

  async execute(userId, userData) {
    if (!userId || !userData || Object.keys(userData).length === 0) {
      throw new ValidationError("Invalid input");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new DuplicateUserError("Email already in use");
      }
    }

    const updatedUser = await this.userRepository.update(userId, userData);
    return updatedUser;
  }
}

module.exports = UpdateUser;