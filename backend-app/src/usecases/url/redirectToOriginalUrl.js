const IUrlRepository = require("../../domain/interfaces/urlRepository");
const { ValidationError } = require("../errors");

class RedirectToOriginalUrl {
  constructor(urlRepository) {
    if (!(urlRepository instanceof IUrlRepository)) {
      throw new Error("Invalid url repository: Must implement IUrlRepository");
    }
    this.urlRepository = urlRepository;
  }

  async execute(shortId) {
    if (!shortId || typeof shortId !== "string") {
      throw new ValidationError("Invalid short ID");
    }

    const url = await this.urlRepository.findByShortId(shortId);

    if (!url) {
      throw new ValidationError("Short URL not found");
    }

    return url.longUrl;
  }
}

module.exports = RedirectToOriginalUrl;