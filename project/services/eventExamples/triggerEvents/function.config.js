/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

module.exports.triggerEvents = {
  timeout: 28,
  environment: {
    SNS_TOPIC: 'testSns', // TODO: import sns event functions to get their names
    SQS_TOPIC: 'testSqs',
  },
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/triggerEvents',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'SNS:Publish',
      ],
      Resource: {
        'Fn::Join': [
          ':',
          [
            'arn',
            'aws',
            'sns',
            '${self:provider.environment.REGION}',
            '${self:provider.environment.ACCOUNT_ID}',
            '${self:functions.triggerEvents.environment.SNS_TOPIC}',
          ],
        ],
      },
    },
    {
      Effect: 'Allow',
      Action: [
        'SQS:SendMessage',
      ],
      Resource: {
        'Fn::Join': [
          ':',
          [
            'arn',
            'aws',
            'sns',
            '${self:provider.environment.REGION}',
            '${self:provider.environment.ACCOUNT_ID}',
            '${self:functions.triggerEvents.environment.SNS_TOPIC}',
          ],
        ],
      },
    },
  ],
};
