import { lambda, logger } from '@sls/lib';
import controller from './controller/index';

// TODO: service/script to host endpoints in dynamodb table by service name, easing the use of api gateway without proprietary domain
// TODO: improve example -> use api-key or other auth(different from getExample), generate and test simple logs in CW, make some api call with axios interceptor(TODO) and useful processing for simple json text return
export default lambda(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const result = await controller(pathParameters, queryStringParameters, headers);

  return result;
});
