const IUserRepository = require("../../domain/interfaces/userRepository");

class GetAllUsers {
    constructor(userRepository) {
      if (!(userRepository instanceof IUserRepository)) {
        throw new Error("Invalid user repository: Must implement IUserRepository");
      }
      this.userRepository = userRepository;
    }
  
    async execute() {
      return this.userRepository.findAll();
    }
  }
  
  module.exports = GetAllUsers;