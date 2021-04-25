import { SQS } from 'aws-sdk';

// Default config for sqs instance, including offline sls plugin sqs server

const { IS_OFFLINE, STAGE, REGION } = process.env;

const sqsConfig = {
  apiVersion: '2012-11-05',
  region: REGION ?? 'us-east-1',
};

const sqsOriginal = new SQS(sqsConfig);
const sqs = new SQS(sqsConfig);

// wraps original function to change queueUrl to localhost when running offline server(sqs plugin not working inside docker container)
sqs.sendMessage = (params) => {
  const parameters = params;
  if (IS_OFFLINE) parameters.QueueUrl = parameters.QueueUrl.replace('https', 'http').replace(parameters.QueueUrl.split('/')[2], 'localhost:9324');
  return sqsOriginal.sendMessage(parameters);
};

export default sqs;
