/* eslint-disable no-template-curly-in-string */
// Functions configuration resolved as .js variable with extra custom logic

const { utils: { functions } } = require('@sls/definitions');

module.exports = async ({ options, resolveConfigurationProperty, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');
  const isLocal = stage === 'local'; // custom (js) condition to enable/disable definitions based on stage

  // TODO: auth-example(move every auth there, use jwt, cognito, api keys, etc)
  // TODO: cf reference for storage examples and auth example

  return functions({
    // disabling in local stage(async not working with sls offline)
    asyncExample: !isLocal && {
      handler: './src/functions/asyncExample/handler.default',
      timeout: 900,
      // destinations: { onSuccess: 'someOtherFunction', onFailure: 'arn:...'},   // With async invokation it's possible to trigger other resources/functions
      events: [
        {
          http: {
            method: 'POST',
            path: '/asyncExample/{parameter}',
            async: true, // instantly returns 200, but keeps running lambda in the background
            private: true, // limited by usage plan with api-key.
          },
        },
      ],
    },
    getExample: {
      handler: './src/functions/getExample/handler.default',
      events: [
        {
          http: {
            method: 'GET',
            path: '/getExample/{someRequiredPathParameter}',
            // request: {}, // probably doesn't work without ParameterRequestValidator resource
            // Custom throtling for function(plugin)
            throttling: { // TODO: test
              maxRequestsPerSecond: 1,
              maxConcurrentRequests: 1,
            },
          },
        },
      ],
    },
    postExample: {
      handler: './src/functions/postExample/handler.default',
      events: [
        {
          http: {
            method: 'POST',
            path: '/postExample',
            // request: { schemas: { 'application/json': '${file(./src/functions/postExample/assets/schema.json)}' } }, // Disabled draft-04 schema
          },
        },
      ],
    },
    httpApiExample: { // TODO: examples with authorizers: lambdas, cognito, ... (api-key not available in httpapi)
      handler: './src/functions/httpApiExample/handler.default',
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
    // TODO: websocket example
  });
};
