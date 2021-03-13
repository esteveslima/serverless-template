import { lambda } from '../../../../lib/lib';
import { triggerEvents } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { events } = event.queryStringParameters || {};

  const availableEvents = ['sns', /* 'sqs', */ 's3'];
  const triggeredEvents = events?.split(',') ?? availableEvents;

  const result = await triggerEvents(triggeredEvents);

  return result;
});
