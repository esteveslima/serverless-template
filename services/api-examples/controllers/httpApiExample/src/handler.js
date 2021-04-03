import { lambda } from '@sls/lib';
import { httpApiExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const result = await httpApiExample(pathParameters, queryStringParameters, headers);

  return result;
});
