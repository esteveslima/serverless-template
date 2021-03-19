/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

// module.exports.sqsExample = {
//   timeout: 60,
//   events: [
//     {
//       sqs: {
//         arn: 'arn:aws:sqs:us-east-1:809635126572:testSqs', // Prefer to create resources independently from this stack, preventing syncing and data loss problems
//         enabled: true,
//         batchSize: 1,
//         maximumBatchingWindow: 10,
//       },
//     },
//   ],
// };
