import { } from '../../../../../serverless/lib/lib';

export const httpApiExample = async (pathParameters, queryStringParameters, headers) => {
  const message = 'This is a simple get request to an aws httpApi endpoint';

  return {
    message,
    pathParameters,
    queryStringParameters,
  };
};
