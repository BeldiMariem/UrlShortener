const IUserRepository = require("../../domain/interfaces/userRepository");
const { NotFoundError, ValidationError } = require("../errors");


class GetUserByEmail {
  constructor(userRepository) {
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error("Invalid user repository: Must implement IUserRepository");
    }
    this.userRepository = userRepository;
  }

  async execute(userEmail) {
    if (!userEmail) {
      throw new ValidationError("Invalid input: Email is required");
    }

    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}

module.exports = GetUserByEmail;