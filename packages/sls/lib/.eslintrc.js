const { eslintConfigTS } = require('@sls/configurations');

// Using the default setup from configurations package
// New Properties could be added, overriding the ones from config file
module.exports = {
  ...eslintConfigTS,
  ignorePatterns: ['**/dist/**'],
};
