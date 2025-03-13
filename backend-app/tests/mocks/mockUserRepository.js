const IUserRepository = require("../../src/domain/interfaces/userRepository");

class MockUserRepository extends IUserRepository {
  async findByEmail(email) {
    return null; 
  }

  async create(user) {
    return { id: "123", ...user }; 
  }

  async update(userId, userData) {
    return { id: userId, ...userData }; 
  }

  async findAll() {
    return []; 
  }

  async findById(userId) {
    return { id: userId, name: "John", email: "john@example.com" }; 
  }

  async delete(userId) {
    return true; 
  }
}

module.exports = MockUserRepository;