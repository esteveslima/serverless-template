import { logger } from '@sls/lib';

export default async (pathParameters, queryStringParameters, headers) => {
  const message = 'This is a simple get request with path, query and header parameters';

  logger.log(message);

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
};
