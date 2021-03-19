/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

module.exports.asyncExample = {
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
};
