import {
  lambda,
  middleware,
  WarningResponse,
} from '@sls/lib';
import functionErrorObjects from '../assets/functionErrorObjects';

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
