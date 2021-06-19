import { logger } from '@sls/lib';

export default async (pathParameters, queryStringParameters, headers) => {
  const message = 'This is a simple get request to an aws httpApi endpoint';

  logger.log(message);

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
};
