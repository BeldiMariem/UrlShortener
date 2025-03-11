class DeleteUser {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userId) {
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      }
  
      return this.userRepository.delete(userId);
    }
  }
  
  module.exports = DeleteUser;