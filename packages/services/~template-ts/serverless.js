/* eslint-disable no-template-curly-in-string */

const { provider: { aws }, plugins: { allPlugins, pluginsCustoms } } = require('@sls/definitions');

const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name
// TODO: remove middleware due tests(?)
// TODO: clean architecture(most possible, ensure testability and isolation)/
// TODO: enhance examples
// TODO: fix tests & setup
// TODO: sls lib types
module.exports = {
  service: serviceName,

  frameworkVersion: '^2',
  useDotenv: true,
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  // Default configurations can be customized and overrided
  provider: { ...aws },
  package: { individually: true },
  plugins: [...allPlugins],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: { /* Resources: {} */ },

  functions: '${file(serverless.functions.js)}',
};
