/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

module.exports.snsExample = {
  timeout: 60,
  events: [
    {
      sns: {
        topicName: 'testSns',
        displayName: 'SNS test',
        filterPolicy: {
          example: [
            'test',
          ],
        },
      },
    },
  ],
};
