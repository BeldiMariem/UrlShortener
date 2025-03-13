const IUserRepository = require("../../domain/interfaces/userRepository");
const UserModel = require("../database/mongoose/models/userModel");

class UserRepository extends IUserRepository {
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(user) {
    return UserModel.create(user);
  }

  async update(userId, userData) {
    return UserModel.updateOne({ _id: userId }, userData);
  }

  async findAll() {
    return UserModel.find({});
  }

  async findById(userId) {
    return UserModel.findById(userId);
  }

  async delete(userId) {
    return UserModel.findByIdAndDelete(userId);
  }
}


module.exports = UserRepository;