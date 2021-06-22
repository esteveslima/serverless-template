import type { APIGatewayEvent } from 'aws-lambda';

// Parse requests for function
// Try to automatically transform a potential lambda json stringified body request to object
export default (args : IArguments) : IArguments => {
  const eventArgs = args;
  const [event, context, callback] = [...eventArgs];
  // TODO: convert IArguments to event,context,callback(?)
  try {
    if (!event.body) return eventArgs;

    const apiGatewayEvent = event as APIGatewayEvent;
    const jsonRequest = JSON.parse(apiGatewayEvent.body as string);
    eventArgs[0].body = jsonRequest;

    return eventArgs;
  } catch (err : unknown) {
    // not a json body
    return eventArgs;
  }
};
