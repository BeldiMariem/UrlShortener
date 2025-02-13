const User = require("../../entities/user.entity");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = new User(userData);
    user.validate();

    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;