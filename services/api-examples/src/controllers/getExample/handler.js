import {
  lambda,
  middleware,
} from '@sls/lib';

middleware.before((event) => { console.log('getExample'); });

export default lambda(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const message = 'This is a simple get request with some path, query and header parameters';

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
});
