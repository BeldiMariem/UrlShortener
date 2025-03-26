const User = require("../../domain/entities/user.entity");

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = new User(userData);
    user.validate();
    await user.hashPassword();

    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return this.userRepository.create(user);
  }
}

module.exports = RegisterUser;