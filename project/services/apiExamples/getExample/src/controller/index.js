import { } from '../../../../../lib/lib';

export const getExample = async (pathParameters, queryStringParameters, headers) => {
  const message = 'This is a simple get request with some path, query and header parameters';

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
};
