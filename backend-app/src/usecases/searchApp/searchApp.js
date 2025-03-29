class SearchApp {
  constructor(appSearchRepository) {
    this.appSearchRepository = appSearchRepository;
  }

  async execute(appName) {
    if (!appName?.trim()) throw new Error("App name cannot be empty");
    return this.appSearchRepository.search(appName.toLowerCase());
  }
}

module.exports = SearchApp;