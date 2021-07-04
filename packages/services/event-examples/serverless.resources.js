/* eslint-disable no-template-curly-in-string */

// Resources configuration resolved as .js variable with extra custom logic.
// BEWARE OF MODIFICATIONS, check 'serverless print', CloudFormation template generated by 'sls package' or generate a CloudFormation ChangeSet to verify modifications
// Modifying the stack definition that results on a unwanted deletion or replacement(deletion+creation) may lead to UNRECOVERABLE DATA LOSS
module.exports = async ({ options, resolveConfigurationProperty, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');
  const isProd = stage === 'prod'; // custom (js) condition to switch dev/prod configurations(CloudFormation doesn't accept its native conditions usage in some properties)

  return {
    // Cloudformation conditions to enable resources creation dynamically
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html
    Conditions: {
      isNotLocal: { 'Fn::Not': [{ 'Fn::Equals': ['${self:provider.stage}', 'local'] }] }, // condition to prevent deployments with 'local' stage(resource is created only when provider.stage !== 'local')
    },

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

    // Resources definitions
    // It could be also a good idea to create the infrastructure resources, like databases and storage, in a separate stack for more security
    // Use Policies/Backup from CloudFormation configurations to provide safety to resources data(e.g.: DeletionPolicy, UpdateReplacePolicy, PointInTimeRecoveryEnabled, etc..)
    Resources: {
      // SNS: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#aws-properties-sns-topic-syntax
      exampleSNS: {
        Condition: 'isNotLocal',
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'exampleSNS-${self:provider.stage}',
          DisplayName: 'sns topic event-examples',
        },
      },
      // SQS: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-syntax
      exampleSQS: {
        Condition: 'isNotLocal',
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'exampleSQS-${self:provider.stage}',
        },
      },
      // S3: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-syntax
      exampleS3: {
        Condition: 'isNotLocal',
        DeletionPolicy: isProd ? 'Retain' : 'Delete', // save data on delete stack/resource(only production)
        UpdateReplacePolicy: isProd ? 'Retain' : 'Delete', // save data on update stack resource, in case of a replacement(only production)
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'example-s3-${self:provider.stage}',
        },
      },
      // DDB(Stream): https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#aws-resource-dynamodb-table-syntax
      exampleDDBStreamTable: {
        Condition: 'isNotLocal',
        DeletionPolicy: isProd ? 'Retain' : 'Delete', // save data on delete stack/resource(only production)
        UpdateReplacePolicy: isProd ? 'Retain' : 'Delete', // save data on update stack resource, in case of a replacement(only production)
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: isProd, // enable table backup snapshots(only production)
          },
          ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
          StreamSpecification: { StreamViewType: 'NEW_AND_OLD_IMAGES' }, // defining stream

          TableName: 'ExampleDDBStreamTable-${self:provider.stage}',
          AttributeDefinitions: [
            { AttributeName: 'pk', AttributeType: 'S' },
            { AttributeName: 'sk', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'pk', KeyType: 'HASH' },
            { AttributeName: 'sk', KeyType: 'RANGE' },
          ],
        },
      },
    },

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

    // Stack outputs examples, which could be fetched from outside the stack and be used as useful references
    Outputs: {
      // SNS: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#aws-properties-sns-topic-return-values
      exampleSNSARN: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleSNSARN-${self:provider.stage}' },
        Value: { Ref: 'exampleSNS' },
      },
      // SQS: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-return-values
      exampleSQSURL: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleSQSURL-${self:provider.stage}' },
        Value: { Ref: 'exampleSQS' },
      },
      exampleSQSARN: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleSQSARN-${self:provider.stage}' },
        Value: { 'Fn::GetAtt': ['exampleSQS', 'Arn'] },
      },
      // S3: https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values
      exampleS3BUCKET: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleS3BUCKET-${self:provider.stage}' },
        Value: { Ref: 'exampleS3' },
      },
      exampleS3ARN: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleS3ARN-${self:provider.stage}' },
        Value: { 'Fn::GetAtt': ['exampleS3', 'Arn'] },
      },
      // DDB(Stream): https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#aws-resource-dynamodb-table-return-values
      exampleDDBStreamARN: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleDDBStreamARN-${self:provider.stage}' },
        Value: { 'Fn::GetAtt': ['exampleDDBStreamTable', 'StreamArn'] },
      },
      exampleDDBARN: {
        Condition: 'isNotLocal',
        Export: { Name: 'exampleDDBARN-${self:provider.stage}' },
        Value: { 'Fn::GetAtt': ['exampleDDBStreamTable', 'Arn'] },
      },
    },
  };
};
