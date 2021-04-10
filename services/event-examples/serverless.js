/* eslint-disable no-template-curly-in-string */
const { provider, plugins, resources } = require('@sls/definitions');

const { aws } = provider;
const { allPlugins, pluginsCustoms } = plugins;
const { iamRole } = resources;

// cronExample
const rate = 'cron(0 0 * * ? *)';// 'rate(1 minute)';// SLS_STAGE === 'local' ? 'rate(1 minute)' : 'cron(0 0 * * ? *)';

// s3Example
const bucket = 'sls-test-s3-bucket';

// snsExample

// sqsExample

// triggerEvents
const snsArn = 'arn:aws:sns:us-east-1:809635126572:testSns';

const sqsArn = '';
const sqsUrl = '';

const s3Arn = 'arn:aws:s3:::sls-test-s3-bucket';
const s3BucketName = s3Arn.split(':').slice(-1)[0];

module.exports = {
  service: 'eventExamples',
  frameworkVersion: '^2',
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },
  package: { individually: true },
  plugins: [...allPlugins],
  custom: { ...pluginsCustoms(allPlugins) },
  resources: {
    Resources: {
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
    },
  },

  functions: { // TODO: documentation per function definition(native or by plugin)
    cronExample: {
      handler: './controllers/cronExample/src/handler.default',
      timeout: 60,
      events: [
        {
          schedule: {
            enabled: true,
            rate,
            // input: {}  // may be useful to differ between multiple crons
          },
        },
      ],
    },
    s3Example: {
      handler: './controllers/s3Example/src/handler.default',
      timeout: 60,
      events: [
        {
          s3: {
            bucket,
            existing: true, // Prefer to create resources independently from this stack, preventing syncing and data loss problems
            event: 's3:ObjectCreated:*', // event do not trigger if the object is updated(not created)
            rules: [
              {
                prefix: 'uploads/',
              },
              {
                suffix: '.txt',
              },
            ],
          },
        },
      ],
    },
    snsExample: {
      handler: './controllers/snsExample/src/handler.default',
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
    },
    // sqsExample: {
    //   handler: './controllers/sqsExample/src/handler.default',
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
    // },
    triggerEvents: {
      handler: './controllers/triggerEvents/src/handler.default',
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
    },
  },
};
