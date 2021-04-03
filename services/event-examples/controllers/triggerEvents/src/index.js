import { } from '@sls/lib';
import triggerSns from './utils/triggerSns';
import triggerSqs from './utils/triggerSqs';
import triggerS3 from './utils/triggerS3';

export const triggerEvents = async (triggeredEvents) => {
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
