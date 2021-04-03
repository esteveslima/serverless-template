import fs, { ReadStream } from 'fs';
import { lambda } from '../../../../../serverless/lib/lib';
import { triggerEvents } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { events } = event.queryStringParameters ?? {};
  const availableEvents = ['sns', /* 'sqs', */ 's3'];
  const triggeredEvents = events?.split(',') ?? availableEvents;

  const result = await triggerEvents(triggeredEvents);

  return result;
});
