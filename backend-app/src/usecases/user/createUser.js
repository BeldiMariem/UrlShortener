const User = require("../../entities/user/user.entity");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Invalid user data");
    }    
    const user = new User(userData);
    user.validate();
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;
