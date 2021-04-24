import { sqs } from '@sls/lib';

const { SQS_URL_EXAMPLE } = process.env;

export default async () => {
  // Triggering sqs event

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      example: {
        DataType: 'String', // String, String.Array, Number or Binary
        StringValue: 'test',
      },
    },
    MessageBody: JSON.stringify({ messageKey: 'messageValue' }),
    QueueUrl: SQS_URL_EXAMPLE,
  };
  const submission = await sqs.sendMessage(params).promise();

  return submission;
};
