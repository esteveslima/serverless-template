// @ts-ignore
import { lambda, logger } from '@sls/lib';
import { APIGatewayEvent } from 'aws-lambda';

// TODO: modify interface to match parsed body(or evaluate if the body can really be parsed)
export default lambda(async (event : APIGatewayEvent & { body : object }) => {
  const { params } = event.body;

  return {
    result: params,
  };
});
