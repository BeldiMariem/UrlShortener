const IUrlRepository = require("../../domain/interfaces/urlRepository");

class ListUserUrls {
    constructor(urlRepository) {
      if (!(urlRepository instanceof IUrlRepository)) {
        throw new Error("Invalid url repository: Must implement IUrlRepository");
      }
      this.urlRepository = urlRepository;
    }
  
    async execute(userId) {
      return this.urlRepository.findByUserId(userId);
    }
  }
  
  module.exports = ListUserUrls;