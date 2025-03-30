const handleError = require("../../usecases/utils/errorHandler");


class SearchAppController {
    constructor(searchAppUseCase) {
      this.searchAppUseCase = searchAppUseCase;
    }
  
    async handle(req, res) {
      try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: "Query parameter 'name' is required" });
  
        const url = await this.searchAppUseCase.execute(name);
        res.json({ url });
      } catch (error) {
        handleError(res, error);
      }
    }
  }
  module.exports = SearchAppController;
