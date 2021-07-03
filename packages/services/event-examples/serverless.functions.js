/* eslint-disable no-template-curly-in-string */

const { utils: { functions } } = require('@sls/definitions');

// Functions configuration resolved as .js variable with extra custom logic
module.exports = async ({ options, resolveConfigurationProperty, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');
  const isLocal = stage === 'local'; // custom (js) condition to enable/disable definitions based on stage

  // CloudFormation references for created resources(at serverless.resources.js)
  let S3_BUCKET_EXAMPLE = { Ref: 'exampleS3' };
  let S3_IAM_PERMISSION_EXAMPLE = { 'Fn::Join': ['/', [{ 'Fn::GetAtt': ['exampleS3', 'Arn'] }, '*']] };
  let SNS_ARN_EXAMPLE = { Ref: 'exampleSNS' };
  let SNS_TOPIC_NAME_EXAMPLE = '${self:resources.Resources.exampleSNS.Properties.TopicName}';
  let SQS_URL_EXAMPLE = { Ref: 'exampleSQS' };
  let SQS_ARN_EXAMPLE = { 'Fn::GetAtt': ['exampleSQS', 'Arn'] };
  let DDB_STREAM_ARN_EXAMPLE = { 'Fn::GetAtt': ['exampleDDBStreamTable', 'StreamArn'] };
  let DDB_ARN_EXAMPLE = { 'Fn::GetAtt': ['exampleDDBStreamTable', 'Arn'] };

  // Mock references for 'local' development stage, for usage with plugins(must match the right format and names)
  if (isLocal) {
    S3_BUCKET_EXAMPLE = '${self:resources.Resources.exampleS3.Properties.BucketName}';
    S3_IAM_PERMISSION_EXAMPLE = 'arn:aws:s3:::${self:resources.Resources.exampleS3.Properties.BucketName}/*';
    SNS_ARN_EXAMPLE = 'arn:aws:sns:us-east-1:000000000000:${self:resources.Resources.exampleSNS.Properties.TopicName}';
    SNS_TOPIC_NAME_EXAMPLE = '${self:resources.Resources.exampleSNS.Properties.TopicName}';
    SQS_URL_EXAMPLE = 'https://sqs.us-east-1.amazonaws.com/000000000000/${self:resources.Resources.exampleSQS.Properties.QueueName}';
    SQS_ARN_EXAMPLE = 'arn:aws:sqs:us-east-1:000000000000:${self:resources.Resources.exampleSQS.Properties.QueueName}';
    DDB_STREAM_ARN_EXAMPLE = 'arn:aws:dynamodb:ddblocal:000000000000:table/${self:resources.Resources.exampleDDBStreamTable.Properties.TableName}/stream/2000-01-01T00:00:00.000';
    DDB_ARN_EXAMPLE = 'arn:aws:dynamodb:ddblocal:000000000000:table/${self:resources.Resources.exampleDDBStreamTable.Properties.TableName}';
  }

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  return functions({

    // TODO: add destination lambda example and also sns/sqs, testing if it works with plugins

    // offline-scheduler plugin may be malfunctioning or conflicting with vscode debugger
    cronExample: !isLocal && {
      handler: './src/functions/cronExample/handler.default',
      timeout: 60,
      events: [
        {
          schedule: {
            enabled: true,
            rate: isLocal ? 'rate(1 minute)' : 'cron(0 0 * * ? *)',
            // input: {}  // may be useful to differ between multiple crons
          },
        },
      ],
    },
    s3Example: {
      handler: './src/functions/s3Example/handler.default',
      timeout: 60,
      events: [
        {
          s3: {
            existing: true,
            bucket: S3_BUCKET_EXAMPLE,
            event: 's3:ObjectCreated:*', // event do not trigger if the object is updated(not created)
            rules: [
              { prefix: 'uploads/' },
              // { suffix: '.txt' },  // limit file types
            ],
          },
        },
      ],
    },
    snsExample: {
      handler: './src/functions/snsExample/handler.default',
      timeout: 60,
      events: [
        {
          sns: {
            arn: SNS_ARN_EXAMPLE,
            topicName: SNS_TOPIC_NAME_EXAMPLE, // required if the topic wasn't previously created
            filterPolicy: {
              example: ['test'],
            },
          },
        },
      ],
    },
    sqsExample: !isLocal && {
      handler: './src/functions/sqsExample/handler.default',
      timeout: 30, // limited to queue timeout
      events: [
        {
          sqs: {
            arn: SQS_ARN_EXAMPLE,
            enabled: true,
            batchSize: 10, // expected number of incoming events per lambda
            maximumBatchingWindow: 10,
          },
        },
      ],
    },
    streamDDBExample: {
      handler: './src/functions/streamDDBExample/handler.default',
      timeout: 60,
      events: [
        {
          stream: {
            enabled: true,
            arn: DDB_STREAM_ARN_EXAMPLE,
            type: 'dynamodb',
            batchSize: 10, // expected number of incoming events per lambda
            startingPosition: 'LATEST', // to receive only the latest updated records
          },
        },
      ],
    },
    triggerEvents: {
      handler: './src/functions/triggerEvents/handler.default',
      timeout: 28,
      events: [
        {
          httpApi: {
            method: 'POST',
            path: '/triggerEvents',
          },
        },
      ],
      environment: {
        S3_BUCKET_EXAMPLE,
        SNS_ARN_EXAMPLE,
        SQS_URL_EXAMPLE,
        DDB_ARN_EXAMPLE,
      },
      // extra permissions for function
      iamRoleStatements: [
        {
          Effect: 'Allow',
          Action: ['s3:PutObject'],
          Resource: S3_IAM_PERMISSION_EXAMPLE,
        },
        {
          Effect: 'Allow',
          Action: ['sns:Publish'],
          Resource: SNS_ARN_EXAMPLE,
        },
        {
          Effect: 'Allow',
          Action: ['sqs:SendMessage'],
          Resource: SQS_ARN_EXAMPLE,
        },
        {
          Effect: 'Allow',
          Action: ['dynamodb:PutItem'],
          Resource: DDB_ARN_EXAMPLE,
        },
      ],
    },
  });
};
