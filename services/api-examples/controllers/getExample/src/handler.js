import { lambda } from '@sls/lib';
import { getExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const result = await getExample(pathParameters, queryStringParameters, headers);

  return result;
});
