const IUserRepository = require("../../domain/interfaces/userRepository");
const { NotFoundError, ValidationError } = require("../errors");


class DeleteUser {
  constructor(userRepository) {
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error("Invalid user repository: Must implement IUserRepository");
    }
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new ValidationError("Invalid input: User ID is required");
    }

    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    return this.userRepository.delete(userId);
  }
}

module.exports = DeleteUser;