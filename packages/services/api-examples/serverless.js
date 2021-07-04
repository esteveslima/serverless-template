/* eslint-disable no-template-curly-in-string */

const { provider: { aws }, plugins: { sets: { allPlugins }, pluginsList, pluginsCustoms } } = require('@sls/definitions');

const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name

// TODO: step functions example?
// TODO: few CW alerts(in free tier range)
module.exports = {
  service: serviceName,

  frameworkVersion: '^2',
  useDotenv: true,
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  // Default configurations can be customized and overrided
  provider: {
    ...aws,
    apiGateway: {
      ...aws.apiGateway,
      // Example with API-key and usage plans on top of the default configuration(for private functions)
      apiKeys: [
        {
          free: [
            {
              value: 'someApiKey1234567890',
              description: 'free api key example',
            },
          ],
        },
        {
          paid: [
            {
              value: '${env:PAID_API_KEY_EXAMPLE}',
              description: 'paid api key example',
            },
          ],
        },
      ],
      usagePlan: [
        {
          free: {
            quota: { limit: 10, offset: 0, period: 'DAY' },
            throttle: { burstLimit: 5, rateLimit: 1 },
          },
        },
        {
          paid: {
            quota: { limit: 50000, offset: 10, period: 'MONTH' },
            throttle: { burstLimit: 1000, rateLimit: 100 },
          },
        },
      ],
    },
  },
  package: { individually: true },
  plugins: [...pluginsList(allPlugins)],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: { /* Resources: {} */ },

  functions: '${file(serverless.functions.js)}',
};
