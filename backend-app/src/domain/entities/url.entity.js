const { ValidationError } = require("../../usecases/errors");

class Url {
  constructor({ longUrl, shortId,title, userId }) {
    this.longUrl = longUrl;
    this.shortId = shortId;
    this.title = title;
    this.userId = userId;
  }

  validate() {
    if (!this.longUrl || typeof this.longUrl !== "string") {
      throw new ValidationError("Invalid long URL");
    }
    if (!this.shortId || typeof this.shortId !== "string") {
      throw new ValidationError("Invalid short URL");
    }
    if (!this.userId || typeof this.userId !== "string") {
      throw new ValidationError("Invalid user ID");
    }
  }
}

module.exports = Url;