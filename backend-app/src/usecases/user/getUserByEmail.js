class GetUserByEmail {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userEmail) {
      const user = await this.userRepository.findByEmail(userEmail);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }
  }
  
  module.exports = GetUserByEmail;