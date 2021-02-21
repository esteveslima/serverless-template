/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

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
