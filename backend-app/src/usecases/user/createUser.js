const User = require("../../domain/entities/user.entity");
const DuplicateUserError = require("../errors/duplicateUserError");
const ValidationError = require("../errors/validationError");
const IUserRepository = require("../../domain/interfaces/userRepository"); 

class CreateUser {
  constructor(userRepository) {
    if (!(userRepository instanceof IUserRepository)) {
      throw new Error("Invalid user repository: Must implement IUserRepository");
    }
    this.userRepository = userRepository;
  }

  async execute(userData) {
    if (!userData.name || !userData.email || !userData.password) {
      throw new ValidationError("Invalid user data");
    }

    const user = new User(userData);
    user.validate();

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new DuplicateUserError("User already exists");
    }

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;