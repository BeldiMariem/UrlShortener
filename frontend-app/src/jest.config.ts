module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Si axios est livré en ES module, il faut le transformer aussi
    '/node_modules/(?!axios/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // si tu as du CSS Modules
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // si tu as un setup
  testEnvironment: 'jsdom',
};
