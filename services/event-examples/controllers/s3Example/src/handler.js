import { lambda } from '@sls/lib';
import { s3Example } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const result = await s3Example();

  return result;
});
