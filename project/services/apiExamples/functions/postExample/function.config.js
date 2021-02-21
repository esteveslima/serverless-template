/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

module.exports.postExample = {
  events: [
    {
      http: {
        method: 'POST',
        path: '/postExample',
        request: {
          schema: {
            'application/json': '${file(project/services/${self:service}/functions/postExample/assets/schema.json)}',
          },
        },
      },
    },
  ],
};
