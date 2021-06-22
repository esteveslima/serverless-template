// Default config for sns instance, including offline sls plugin sns server

import { SNS } from 'aws-sdk';
import type { AWSError } from 'aws-sdk';

const { IS_OFFLINE, STAGE, REGION } = process.env;

interface ISnsConfig {
  apiVersion: string,
  region: string,

  endpoint?: string,
}

const snsConfig : ISnsConfig = {
  apiVersion: '2010-03-31',
  region: REGION ?? 'us-east-1',
};

if (IS_OFFLINE) { // for local testing purposes
  snsConfig.endpoint = 'http://127.0.0.1:4002'; // 'http://localhost:4002';
}

const sns = new SNS(snsConfig);

// wraps original function to replace accountId when running offline server(TODO: find better way to wrap/mock functions for these purposes)
// @ts-ignore
sns.publish = (params: SNS.Types.PublishInput, callback?: ((err: AWSError, data: SNS.Types.PublishResponse) => void) | undefined) => {
  const parameters = params;
  const snsPluginAccountId = '123456789012';
  // @ts-ignore: Object is possibly 'undefined'.
  if (IS_OFFLINE) parameters.TopicArn = parameters.TopicArn.replace(parameters.TopicArn.split(':')[4], snsPluginAccountId);
  const snsOriginal = new SNS(snsConfig);
  return snsOriginal.publish(parameters, callback);
};

export default sns;
