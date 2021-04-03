import { } from '@sls/lib';
import { SNS } from 'aws-sdk';

const {
  STAGE, REGION, SNS_ARN,
} = process.env;

export default async () => {
  // Triggering sns event
  const snsConfig = {
    apiVersion: '2010-03-31',
    region: REGION,
  };
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

  if (STAGE === 'local') { // for local testing purposes
    snsConfig.endpoint = 'http://127.0.0.1:4002';
    params.TopicArn = SNS_ARN.replace(SNS_ARN.split(':')[4], '123456789012'); // change accountId with the offline-sns one
  }

  const sns = new SNS(snsConfig);
  const publication = await sns.publish(params).promise();

  return publication;
};
