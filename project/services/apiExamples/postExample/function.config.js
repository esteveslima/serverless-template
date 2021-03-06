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
          schemas: { // TODO: set schema path automatically(maybe only base path)
            'application/json': '${file(project/services/${self:service}/postExample/assets/schema.json)}',
          },
        },
      },
    },
  ],
};
