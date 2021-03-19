/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

module.exports.snsExample = {
  timeout: 60,
  events: [
    {
      sns: {
        arn: 'arn:aws:sns:us-east-1:809635126572:testSns', // Prefer to create resources independently from this stack, preventing syncing and data loss problems
        filterPolicy: {
          example: [
            'test',
          ],
        },
      },
    },
  ],
};
