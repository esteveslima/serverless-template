// Default config for sqs instance, including offline sls plugin sqs server

import { SQS } from 'aws-sdk';
import type { AWSError } from 'aws-sdk';

const { IS_OFFLINE, STAGE, REGION } = process.env;

interface ISqsConfig {
  apiVersion: string,
  region: string,

  endpoint?: string,
}

const sqsConfig : ISqsConfig = {
  apiVersion: '2012-11-05',
  region: REGION ?? 'us-east-1',
};

if (IS_OFFLINE) { // for local testing purposes
  sqsConfig.endpoint = 'http://queue-container:9324'; // 'http://localhost:9324';
}

const sqs = new SQS(sqsConfig);

// wraps original function to change request to local queue when running offline server(may conflict inside docker container)(TODO: find better way to wrap/mock functions for these purposes)
// @ts-ignore
sqs.sendMessage = (params: SQS.Types.SendMessageRequest, callback?: (err: AWSError, data: SQS.Types.SendMessageResult) => void) => {
  const parameters = params;

  if (IS_OFFLINE) {
    // mock queueUrl for local testing
    const queueName = parameters.QueueUrl.split('/').slice(-1)[0];
    const queueDomain = sqsConfig.endpoint;
    parameters.QueueUrl = `${queueDomain}/000000000000/${queueName}`; // check with created queue url
  }
  const sqsOriginal = new SQS(sqsConfig);
  return sqsOriginal.sendMessage(parameters, callback);
};

export default sqs;
