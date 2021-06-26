/* eslint-disable no-template-curly-in-string */

// Deploy this stack independently using the flag '--config <path/filename>' to select this file on serverless CLI command

// Dedicated stack used exclusevelly for infrastructure deployment, this approach grants safier environments on updating CloudFormation resources
// The outputs from this stack can be recovered as variables in other stacks

const { provider: { aws }, plugins: { allPlugins, pluginsCustoms } } = require('@sls/definitions');

const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name
const infraServiceName = `${serviceName}-infra`; // suffixing with 'infra'(final name becomes: {serviceName}-infra-{stage})

module.exports = {
  service: infraServiceName,

  frameworkVersion: '^2',
  useDotenv: true,
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },

  // Create the stack's infraestructure resources and set the custom outputs available to be fetched from other stacks(stage required to make exported names unique)
  // Using a DeletionPolicy could also be a good idea to protect sensitive data.
  resources: {
    Resources: {
      // SNS: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#aws-properties-sns-topic-syntax
      exampleSNS: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'exampleSNS-${opt:stage}',
          DisplayName: 'sns topic event-examples',
        },
      },
      // SQS: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-syntax
      exampleSQS: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'exampleSQS-${opt:stage}',
        },
      },
      // S3: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-syntax
      exampleS3: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'example-s3-${opt:stage}',
        },
      },
    },

    // // //

    Outputs: {
      // SNS: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#aws-properties-sns-topic-return-values
      exampleSNSARN: {
        Export: { Name: 'exampleSNSARN-${opt:stage}' },
        Value: { Ref: 'exampleSNS' },
      },
      // SQS: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-return-values
      exampleSQSURL: {
        Export: { Name: 'exampleSQSURL-${opt:stage}' },
        Value: { Ref: 'exampleSQS' },
      },
      exampleSQSARN: {
        Export: { Name: 'exampleSQSARN-${opt:stage}' },
        Value: { 'Fn::GetAtt': ['exampleSQS', 'Arn'] },
      },
      // S3: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values
      exampleS3BUCKET: {
        Export: { Name: 'exampleS3BUCKET-${opt:stage}' },
        Value: { Ref: 'exampleS3' },
      },
      exampleS3ARN: {
        Export: { Name: 'exampleS3ARN-${opt:stage}' },
        Value: { 'Fn::GetAtt': ['exampleS3', 'Arn'] },
      },
    },
  },
};
