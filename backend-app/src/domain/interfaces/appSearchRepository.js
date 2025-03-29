class IAppSearchRepository {
    async search(appName) {
      throw new Error("Method 'search()' must be implemented");
    }
  }
  
  module.exports = IAppSearchRepository;