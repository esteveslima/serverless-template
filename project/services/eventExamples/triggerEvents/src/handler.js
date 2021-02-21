import { lambda } from '../../../../lib/lib';
import { triggerEvents } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const queryStringParameters = event.queryStringParameters || [];
  const { events } = queryStringParameters;
  const allEvents = ['sns'];
  const triggeredEvents = events ? events.split(',') : allEvents;

  const result = await triggerEvents(triggeredEvents);

  return result;
});
