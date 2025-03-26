const IUrlRepository = require("../../domain/interfaces/urlRepository");
const { NotFoundError, ValidationError } = require("../errors");


class DeleteUrl {
  constructor(urlRepository) {
    if (!(urlRepository instanceof IUrlRepository)) {
        throw new Error("Invalid url repository: Must implement IUrlRepository");
      }
    this.urlRepository = urlRepository;
  }

  async execute(shortId) {
    if (!shortId) {
      throw new ValidationError("Invalid input: Url short ID is required");
    }

    const existingUrl = await this.urlRepository.findByShortId(shortId);
    if (!existingUrl) {
      throw new NotFoundError("User not found");
    }

    return this.urlRepository.deleteByShortId(shortId);
  }
}

module.exports = DeleteUrl;