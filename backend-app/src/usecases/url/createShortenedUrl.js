const shortid = require("shortid");
const { ValidationError } = require("../errors");
const config = require("../../infrastructure/config/env");
const IUrlRepository = require("../../domain/interfaces/urlRepository");
const Url = require("../../domain/entities/url.entity");
const baseUrl = config.BASE_URL;

class CreateShortenedUrl {
  constructor(urlRepository) {
    if (!(urlRepository instanceof IUrlRepository)) {
      throw new Error("Invalid url repository: Must implement IUrlRepository");
    }
    this.urlRepository = urlRepository;
  }
  
  async execute(longUrl, userId) {
    if (!longUrl || !this.isValidUrl(longUrl)) {
      throw new ValidationError("Invalid URL");
    }

    const shortId = shortid.generate();
    const url = new Url( {longUrl, shortId, userId} );
    this.urlRepository.create(url);
    return { shortUrl: `${baseUrl}/url/redirectOriginalUrl/${shortId}` };


  }
  

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = CreateShortenedUrl;