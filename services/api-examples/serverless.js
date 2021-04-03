/* eslint-disable no-template-curly-in-string */
const { provider, plugins } = require('@sls/definitions');

const { aws } = provider;
const { allPlugins, pluginsCustoms } = plugins;

module.exports = {
  service: 'apiExamples',
  frameworkVersion: '^2',
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },
  package: { individually: true },
  plugins: [...allPlugins],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: { /* Resources: {} */ },

  functions: {
    asyncExample: {
      handler: './controllers/asyncExample/src/handler.lambdaFunction',
      timeout: 900,
      events: [
        {
          http: {
            method: 'POST',
            path: '/asyncExample/{parameter}',
            async: true,
          },
        },
      ],
    },
    getExample: {
      handler: './controllers/getExample/src/handler.lambdaFunction',
      events: [
        {
          http: {
            method: 'GET',
            path: '/getExample/{someRequiredPathParameter}',
            request: {
              parameters: {
                paths: {
                  someRequiredPathParameter: true,
                },
                querystrings: {
                  someRequiredQueryParameter: true,
                },
                headers: {
                  someRequiredHeaderParameter: true,
                },
              },
            },
          },
        },
      ],
    },
    httpApiExample: {
      handler: './controllers/httpApiExample/src/handler.lambdaFunction',
      timeout: 28,
      events: [
        {
          httpApi: {
            method: 'GET',
            path: '/httpApiExample/{someParameter}',
          },
        },
      ],
    },
    postExample: {
      handler: './controllers/postExample/src/handler.lambdaFunction',
      events: [
        {
          http: {
            method: 'POST',
            path: '/postExample',
            request: {
              schemas: { // TODO: set schema path automatically(maybe only base path)
                'application/json': '${file(./controllers/postExample/assets/schema.json)}',
              },
            },
          },
        },
      ],
    },
  },
};
