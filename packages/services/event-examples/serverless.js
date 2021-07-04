/* eslint-disable no-template-curly-in-string */

const { provider: { aws }, plugins: { sets: { allPlugins }, pluginsList, pluginsCustoms } } = require('@sls/definitions');

const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name

module.exports = {
  service: serviceName,

  frameworkVersion: '^2',
  useDotenv: true,
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  // Default configurations can be customized and overrided
  provider: { ...aws },
  package: { individually: true },
  plugins: [...pluginsList(allPlugins)],
  custom: { ...pluginsCustoms(allPlugins) },

  functions: '${file(serverless.functions.js)}',
  resources: '${file(serverless.resources.js)}',
};
