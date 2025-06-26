const axios = require('axios');
const IAppSearchRepository = require('../../domain/interfaces/appSearchRepository');
const config = require("../config/env");

class GoogleAppSearchRepository extends IAppSearchRepository{
  async search(appName) {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        q: `${appName} official site`,
        key: config.GOOGLE_API_KEY,
        cx: config.GOOGLE_CX_ID,
        num: 1
      }
    });
    return response.data.items?.[0]?.link || null;
  }
}
module.exports = GoogleAppSearchRepository;
