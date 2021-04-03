import { lambda } from '../../../../../serverless/lib/lib';
import { cronExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const result = await cronExample();

  return result;
});
