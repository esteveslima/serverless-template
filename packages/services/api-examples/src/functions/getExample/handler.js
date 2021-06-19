import { lambda, logger } from '@sls/lib';
import controller from './controller/index';

// TODO: use examples with lodash
// TODO:
// TODO: improve example -> validate request parameters(check if it works), use api-key or other auth,
export default lambda(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const result = await controller(pathParameters, queryStringParameters, headers);

  return result;
});
