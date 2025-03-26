const bcrypt = require("bcryptjs");
const ValidationError = require("../../usecases/errors/validationError");

class User {
  constructor({ name, email, password, role = "user" }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  validate() {
    if (!this.name || typeof this.name !== "string") {
      throw new ValidationError("Invalid name");
    }
    if (!this.email || typeof this.email !== "string") {
      throw new ValidationError("Invalid email");
    }
    if (!this.password || typeof this.password !== "string") {
      throw new ValidationError("Invalid password");
    }
  }


  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

module.exports = User;