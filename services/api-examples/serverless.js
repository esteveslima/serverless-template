/* eslint-disable no-template-curly-in-string */
const { provider, plugins } = require('@sls/definitions');

const { aws } = provider;
const { allPlugins, pluginsCustoms } = plugins;
// TODO: get cli options(stages) to make decisions on deployments (?use 'conditions' resources for deployments decision and .env for variables?)
module.exports = {
  service: 'apiExamples',
  frameworkVersion: '^2',
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },
  package: { individually: true },
  plugins: [...allPlugins],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: { /* Resources: {} */
    // Conditions: {
    //   IsProd: {
    //     'Fn::Equals': [
    //       '${self:provider.stage}',
    //       'prod',
    //     ],
    //   },
    // },
  },

  functions: { // TODO: option to get a mocked api version
    asyncExample: {
      handler: './controllers/asyncExample/src/handler.default',
      timeout: 900,
      // destinations: { onSuccess: 'someOtherFunction', onFailure: 'arn:...'}, // TODO: destinations example for async invocations
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
    getExample: { // TODO: test request parameters requirements for path/query/header
      handler: './controllers/getExample/src/handler.default',
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
    httpApiExample: { // TODO: examples with authorizers for http and httapi and private for http events
      handler: './controllers/httpApiExample/src/handler.default',
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
      // condition: 'IsProd',
      handler: './controllers/postExample/src/handler.default',
      events: [
        {
          http: {
            method: 'POST',
            path: '/postExample',
            request: { // TODO: find a way to convert npm package schema(as joi) to jsonschema, having both validations to http events
              schemas: { // TODO: set schema path automatically(maybe only base path)
                'application/json': '${file(./controllers/postExample/assets/schema.json)}',
              },
            },
          },
        },
      ],
    },
    // TODO: websocket example
  },

};
