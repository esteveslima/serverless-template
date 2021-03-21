/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

const snsArn = 'arn:aws:sns:us-east-1:809635126572:testSns';

const sqsArn = '';
const sqsUrl = '';

const s3Arn = 'arn:aws:s3:::sls-test-s3-bucket';
const s3BucketName = s3Arn.split(':').slice(-1)[0];

module.exports.triggerEvents = {
  timeout: 28,
  environment: { // passing resouces reference inside function
    SNS_ARN: snsArn,
    SQS_URL: sqsUrl,
    S3_BUCKET: s3BucketName,
  },
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/triggerEvents',
      },
    },
  ],
  role: 'triggerEventsRole', // reference the name of created role with extra permissions
  dependsOn: ['triggerEventsRole'], // TODO: AUTOMATICALLY CREATE PROPS ROLE AND DEPENDSON
};

// Defining function resources
// Prefer to create it manually if the resource isn't strictly tied to the function(e.g. iam role permissions)...
// ...making it independent from stack and avoiding problems like stack unsyncing and data loss

const { iamRole } = require('../../../../serverless/definitions/resources/utils/iam/iamRole');

module.exports.resources = {
  triggerEventsRole: iamRole([
    {
      Effect: 'Allow',
      Action: ['s3:PutObject'],
      Resource: `${s3Arn}/*`,
    },
    {
      Effect: 'Allow',
      Action: ['sns:Publish'],
      Resource: snsArn,
    },
  ]),
};
