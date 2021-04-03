import { } from '@sls/lib';
import { SQS } from 'aws-sdk';

const {
  STAGE, REGION, SQS_URL,
} = process.env;

export default async () => {
  // Triggering sqs event
  const sqsConfig = {
    apiVersion: '2012-11-05',
    region: REGION,
  };
  const sqs = new SQS(sqsConfig);

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      example: {
        DataType: 'String', // String, String.Array, Number or Binary
        StringValue: 'test',
      },
    },
    MessageBody: JSON.stringify({ messageKey: 'messageValue' }),
    QueueUrl: SQS_URL, // `https://sqs.${REGION}.amazonaws.com/${ACCOUNT_ID}/${SQS_TOPIC}`,
  };
  const submission = await sqs.sendMessage(params).promise();

  return submission;
};
