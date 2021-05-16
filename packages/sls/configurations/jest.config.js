const path = require('path');

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  coverageDirectory: '.coverage',
  // collectCoverageFrom: ['!**/__mocks__/**'],
  // coveragePathIgnorePatterns: ['/__mocks__/', '/mock/'],
  // testPathIgnorePatterns: ['/__mocks__/', '/mock/'],
  modulePathIgnorePatterns: ['.mock'],

  // default setups for tests
  setupFilesAfterEnv: [
    '<rootDir>/tests/config/default-setup.js', // usually lib's lambda mock
  ],
  // babel compatibility
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: path.resolve(__dirname, 'babel.config.js') }], // using babel from configuration package
  },
};
