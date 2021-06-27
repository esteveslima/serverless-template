/* eslint-disable no-template-curly-in-string */
// Functions configuration resolved as .js variable with extra custom logic

const { utils: { functions } } = require('@sls/definitions');

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const servicesReferences = (stage) => {
  const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name
  const infraServiceName = `${serviceName}-infra`;

  // Using 'local' stage as development environment(mocking services references for usage with plugins, the mocks must be in the right format)
  if (stage === 'local') {
    return {
      S3_BUCKET_EXAMPLE: 'exampleS3',
      S3_ARN_EXAMPLE: 'arn:aws:s3:::exampleS3',
      SNS_ARN_EXAMPLE: 'arn:aws:sns:us-east-1:000000000000:exampleSNS',
      SQS_URL_EXAMPLE: 'https://sqs.us-east-1.amazonaws.com/000000000000/exampleSQS',
      SQS_ARN_EXAMPLE: 'arn:aws:sqs:us-east-1:000000000000:exampleSQS',
    };
  }

  // Services' CloudFormation outputs references, from the infrastructure created beforehand
  return {
    S3_BUCKET_EXAMPLE: `\${cf:${infraServiceName}-\${self:provider.stage}.exampleS3BUCKET}`,
    S3_ARN_EXAMPLE: `\${cf:${infraServiceName}-\${self:provider.stage}.exampleS3ARN}`,
    SNS_ARN_EXAMPLE: `\${cf:${infraServiceName}-\${self:provider.stage}.exampleSNSARN}`,
    SQS_URL_EXAMPLE: `\${cf:${infraServiceName}-\${self:provider.stage}.exampleSQSURL}`,
    SQS_ARN_EXAMPLE: `\${cf:${infraServiceName}-\${self:provider.stage}.exampleSQSARN}`,
  };
};
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async ({ options, resolveConfigurationProperty }) => {
  const stage = await resolveConfigurationProperty(['provider', 'stage']);

  const {
    S3_BUCKET_EXAMPLE,
    S3_ARN_EXAMPLE,
    SNS_ARN_EXAMPLE,
    SQS_URL_EXAMPLE,
    SQS_ARN_EXAMPLE,
  } = servicesReferences(stage);

  // Resources for these functions were createded independently from this stack, preventing potential syncing and data loss problems
  return functions({
    // offline-scheduler plugin may conflict with vscode debugger
    cronExample: stage !== 'local' && {
      handler: './src/functions/cronExample/handler.default',
      timeout: 60,
      events: [
        {
          schedule: {
            enabled: true,
            rate: stage === 'local' ? 'rate(1 minute)' : 'cron(0 0 * * ? *)',
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
              {
                prefix: 'uploads/',
              },
              // {
              //   suffix: '.txt',  // limit file types
              // },
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
            filterPolicy: {
              example: [
                'test',
              ],
            },
          },
        },
      ],
    },
    sqsExample: stage !== 'local' && {
      handler: './src/functions/sqsExample/handler.default',
      timeout: 30, // limited to queue timeout
      events: [
        {
          sqs: {
            arn: SQS_ARN_EXAMPLE,
            enabled: true,
            batchSize: 1,
            maximumBatchingWindow: 10,
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
      },
      // extra permissions for function
      iamRoleStatements: [
        {
          Effect: 'Allow',
          Action: ['s3:PutObject'],
          Resource: `${S3_ARN_EXAMPLE}/*`,
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
      ],
    },
  });
};
