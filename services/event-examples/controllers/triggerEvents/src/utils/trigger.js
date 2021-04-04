import { } from '@sls/lib';
import triggerSns from './triggerSns';
import triggerSqs from './triggerSqs';
import triggerS3 from './triggerS3';

export default async (triggeredEvents) => {
  const eventsInfo = {};

  // Triggering sns event
  if (triggeredEvents.includes('sns')) {
    eventsInfo.sns = await triggerSns();
  }

  // Triggering sqs event
  if (triggeredEvents.includes('sqs')) {
    // eventsInfo.sqs = await triggerSqs();
  }

  // Triggering sqs event
  if (triggeredEvents.includes('s3')) {
    eventsInfo.s3 = await triggerS3();
  }

  return eventsInfo;
};
