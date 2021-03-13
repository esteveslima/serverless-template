import { } from '../../../../../../lib/lib';
import { SNS } from 'aws-sdk';

const {
  stage, REGION, ACCOUNT_ID, SNS_TOPIC,
} = process.env;

export default async () => {
  // Triggering sns event
  const snsConfig = {
    apiVersion: '2010-03-31',
    endpoint: stage === 'local' ? 'http://127.0.0.1:4001' : undefined, // for local testing purposes
    region: REGION,
  };
  const sns = new SNS(snsConfig);

  const params = {
    Message: JSON.stringify({ messageKey: 'messageValue' }),
    MessageAttributes: {
      example: {
        DataType: 'String', // String, String.Array, Number or Binary
        StringValue: 'test',
      },
    },
    MessageStructure: 'JSON',
    TopicArn: `arn:aws:sns:${REGION}:${ACCOUNT_ID}:${SNS_TOPIC}`,
  };
  const publication = await sns.publish(params).promise();

  return publication;
};
