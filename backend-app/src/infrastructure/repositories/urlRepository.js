const IUrlRepository = require("../../domain/interfaces/urlRepository");
const UrlModel = require("../database/mongoose/models/urlModel"); 

class UrlRepository extends IUrlRepository{
  async create(url) {
    return UrlModel.create(url)
  }

  async findByShortId(shortId) {
    return UrlModel.findOne({ shortId });
  }
  async findByTitle(title) {
    return UrlModel.findOne({ title });
  }

  async findByUserId(userId) {
    return UrlModel.find({ userId });
  }

  async deleteByShortId(shortId) {
    return UrlModel.findOneAndDelete({ shortId });
  }
}

module.exports = UrlRepository;