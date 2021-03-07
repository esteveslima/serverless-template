import { } from '../../../../../lib/lib';
import { SNS, SQS } from 'aws-sdk';

const {
  IS_OFFLINE, REGION, ACCOUNT_ID, SNS_TOPIC, SQS_TOPIC,
} = process.env;

export const triggerEvents = async (triggeredEvents) => {
  const eventsInfo = {};

  // Triggering sns event
  if (triggeredEvents.includes('sns')) {
    const snsConfig = {
      apiVersion: '2010-03-31',
      endpoint: IS_OFFLINE ? 'http://127.0.0.1:4001' : undefined, // for local testing purposes
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
    eventsInfo.sns = publication;
  }

  // // Triggering sqs event
  // if (triggeredEvents.includes('sqs')) {
  //   const sqsConfig = {
  //     apiVersion: '2012-11-05',
  //     region: REGION,
  //   };
  //   const sqs = new SQS(sqsConfig);
  //   const params = {
  //     DelaySeconds: 10,
  //     MessageAttributes: {
  //       example: {
  //         DataType: 'String', // String, String.Array, Number or Binary
  //         StringValue: 'test',
  //       },
  //     },
  //     MessageBody: JSON.stringify({ messageKey: 'messageValue' }),
  //     QueueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT_ID}/${SQS_TOPIC}`,
  //   };
  //   const submission = await sqs.sendMessage(params).promise();
  //   eventsInfo.sqs = submission;
  // }

  return eventsInfo;
};
