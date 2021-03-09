import { lambda } from '../../../../lib/lib';
import { getExample } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const { pathParameters, queryStringParameters, headers } = event;

  console.log(event);

  const result = await getExample(pathParameters, queryStringParameters, headers);

  return result;
});
