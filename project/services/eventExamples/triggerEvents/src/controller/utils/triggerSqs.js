import { } from '../../../../../../lib/lib';
import { SQS } from 'aws-sdk';

const {
  stage, REGION, ACCOUNT_ID, SQS_TOPIC,
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
    QueueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT_ID}/${SQS_TOPIC}`,
  };
  const submission = await sqs.sendMessage(params).promise();

  return submission;
};
