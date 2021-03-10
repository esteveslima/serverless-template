/* eslint-disable no-template-curly-in-string */

// configuring serverless by exporting json from javascript(works just like .yaml configuration with paths references from this file)
module.exports = {
  service: '${opt:service}',
  frameworkVersion: '^2',
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: '${file(./serverless/definitions.js):provider}',
  functions: '${file(./serverless/definitions.js):functions}',
  package: {
    individually: true,
  },
  plugins: '${file(./serverless/definitions.js):plugins}',
  custom: '${file(./serverless/definitions.js):custom}',
  resources: '${file(./serverless/definitions.js):resources}',
};
