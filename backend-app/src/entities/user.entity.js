class User {
    constructor({ name, email, password }) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    validate() {
      if (!this.name || !this.email || !this.password) {
        throw new Error("Invalid user data");
      }
    }
  }
  
  module.exports = User;