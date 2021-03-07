/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

const snsTopic = 'testSns';
const sqsTopic = 'testSqs';

module.exports.triggerEvents = {
  timeout: 28,
  environment: { // passing names to function
    SNS_TOPIC: snsTopic,
    SQS_TOPIC: sqsTopic,
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
      Action: ['SNS:Publish'],
      Resource: `arn:aws:sns:\${self:provider.environment.REGION}:\${self:provider.environment.ACCOUNT_ID}:${snsTopic}`, /* {
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
      }, */
    },
    {
      Effect: 'Allow',
      Action: ['SQS:SendMessage'],
      Resource: `arn:aws:sqs:\${self:provider.environment.REGION}:\${self:provider.environment.ACCOUNT_ID}:${sqsTopic}`, /* {
        'Fn::Join': [
          ':',
          [
            'arn',
            'aws',
            'sqs',
            '${self:provider.environment.REGION}',
            '${self:provider.environment.ACCOUNT_ID}',
            '${self:functions.triggerEvents.environment.SQS_TOPIC}',
          ],
        ],
      }, */
    },
  ],
};
