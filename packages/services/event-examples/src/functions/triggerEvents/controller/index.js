import { logger } from '@sls/lib';
import triggerSns from './utils/triggerSns';
import triggerSqs from './utils/triggerSqs';
import triggerS3 from './utils/triggerS3';
import triggerStreamDDB from './utils/triggerStreamDDB';

export default async (eventData) => {
  const { IS_OFFLINE } = process.env;
  const triggersInfo = {};

  // Triggering s3 event
  triggersInfo.s3 = await triggerS3(eventData);

  // Triggering sns event
  triggersInfo.sns = await triggerSns();

  // Triggering sqs event
  if (!IS_OFFLINE) triggersInfo.sqs = await triggerSqs();
  else logger.info('\n SQS offline trigger disabled(sqs plugin is malfunctioning) \n Create the local queue manually to be able to test sqs. For this example: "npm run aws:sqs create-queue -- --queue-name exampleSQS-local" \n');
  // SQS offline plugin not working, sqs events won't be triggered locally
  // To use sqs locally it is required to create the queue manually(npm run aws:sqs create-queue -- --queue-name <name>) before enabling this trigger

  // Triggering dynamoDB stream event
  triggersInfo.streamDDB = await triggerStreamDDB();

  return triggersInfo;
};
