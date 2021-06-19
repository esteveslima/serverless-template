// @ts-ignore
import { lambda } from '@sls/lib';
import { APIGatewayEvent } from 'aws-lambda';
import controller from './controller/index';

// TODO: modify interface to match parsed body(or evaluate if the body can really be parsed)
export default lambda(async (event : APIGatewayEvent & { body : object }) => {
  const params = event.body;

  const result = await controller(params);

  return result;
});
