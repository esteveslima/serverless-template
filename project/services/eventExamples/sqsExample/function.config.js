/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

// const queueName = 'testSqs';

// module.exports.sqsExample = {
//   timeout: 60,
//   events: [
//     {
//       sqs: {
//         queueName,
//         arn: `arn:aws:sqs:\${self:provider.environment.REGION}:\${self:provider.environment.ACCOUNT_ID}:${queueName}`, /* {
//           'Fn::Join': [ // TODO: trocar por !Sub
//             ':',
//             [
//               'arn',
//               'aws',
//               'sqs',
//               '${self:provider.environment.REGION}',
//               '${self:provider.environment.ACCOUNT_ID}',
//               'testSqs',
//             ],
//           ],
//         }, */
//         batchSize: 1,
//         maximumBatchingWindow: 10,
//       },
//     },
//   ],
// };
