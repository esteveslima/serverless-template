/* eslint-disable no-template-curly-in-string */
const { provider, plugins } = require('@sls/definitions');

const { aws } = provider;
const { allPlugins, pluginsCustoms } = plugins;

const ddbArn = 'arn:aws:dynamodb:us-east-1:809635126572:table/Cat';
// TODO: set env variables using .js variables to use in others definitions instead of ${self:...} notation, making possible to do variables decisions
module.exports = {
  service: 'storageExamples',

  frameworkVersion: '^2',
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },
  package: { individually: true },
  plugins: [...allPlugins],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: { /* Resources: {} */ },

  functions: {
    insertDataDynamoDB: {
      handler: './controllers/insertDataDynamoDB/src/handler.default',
      timeout: 30,
      events: [
        {
          http: {
            method: 'POST',
            path: '/insertDataDynamoDB',
            // request: {
            //   schemas: { // TODO: set schema path automatically(maybe only base path)
            //     'application/json': '${file(./controllers/insertDataDynamoDB/assets/schema.json)}',
            //   },
            // },
          },
        },
      ],
      // extra permissions for function
      iamRoleStatements: [
        {
          Effect: 'Allow',
          Action: ['dynamodb:*'], // It's not recommended to use '*' for permissions(should be listed one by one in real projects) //TODO: list every dynamodb permissions used
          Resource: `${ddbArn}`,
        },
      ],
    },
    // TODO: stream example
  },
};
