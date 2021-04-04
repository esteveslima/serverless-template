import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('httpApiExample'); });

export default lambda(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const message = 'This is a simple get request to an aws httpApi endpoint';

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
});
