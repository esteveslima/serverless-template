/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

module.exports.httpApiExample = {
  timeout: 28,
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/httpApiExample/{someParameter}',
      },
    },
  ],
};
