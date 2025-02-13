const UserModel = require("../../frameworks/database/mongoose/models/userModel");

class UserRepository {
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(user) {
    return UserModel.create(user);
  }
}

module.exports = UserRepository;