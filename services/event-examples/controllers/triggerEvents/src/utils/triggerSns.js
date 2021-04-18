import { sns } from '@sls/lib';

const { SNS_ARN } = process.env;

export default async () => {
  // Triggering sns event
  const params = {
    Message: JSON.stringify({ messageKey: 'messageValue' }),
    MessageAttributes: {
      example: {
        DataType: 'String', // String, String.Array, Number or Binary
        StringValue: 'test',
      },
    },
    TopicArn: SNS_ARN,
  };

  const publication = await sns.publish(params).promise();

  return publication;
};
