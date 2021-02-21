/* eslint-disable no-template-curly-in-string */
const { provider, plugins, custom } = require('./serverless/definitions');

// config serverless exporting json from javascript(works just like .yaml configuration)
module.exports = {
  service: '${opt:service}',
  frameworkVersion: '2',
  configValidationMode: 'warn',

  provider,
  functions: '${file(./serverless/definitions.js):functions}', // importing this way makes "serverless" property available to resolve afterwards
  package: {
    individually: true,
  },
  plugins,
  custom,
};
