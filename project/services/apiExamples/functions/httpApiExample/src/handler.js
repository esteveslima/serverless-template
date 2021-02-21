import { lambda } from '../../../../../lib/lib';
import { httpApiExample } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  const result = await httpApiExample(pathParameters, queryStringParameters, headers);

  return result;
});
