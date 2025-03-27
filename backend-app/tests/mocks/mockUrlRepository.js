const IUrlRepository = require("../../src/domain/interfaces/urlRepository");


class MockUrlRepository extends IUrlRepository {
  constructor() {
    super();
    this.urls = [];
  }

  async create(url) {
    const newUrl = { ...url, _id: 'mock-id' };
    this.urls.push(newUrl);
    return newUrl;
  }

  async findByShortId(shortId) {
    return this.urls.find(url => url.shortId === shortId) || null;
  }

  async findByUserId(userId) {
    return this.urls.filter(url => url.userId === userId);
  }

  async deleteByShortId(shortId) {
    const index = this.urls.findIndex(url => url.shortId === shortId);
    if (index === -1) return null;
    return this.urls.splice(index, 1)[0];
  }
}

module.exports = MockUrlRepository;