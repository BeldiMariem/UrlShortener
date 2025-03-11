module.exports = {
  testEnvironment: "node", 
  coverageDirectory: "coverage", 
  collectCoverageFrom: ["src/**/*.js"], 
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/frameworks/", 
    "/src/interfaces/swagger/",
  ],
  testMatch: ["**/?(*.)+(test).js"], 
};