/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

module.exports.getExample = {
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
};
