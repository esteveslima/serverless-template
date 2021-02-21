/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

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
