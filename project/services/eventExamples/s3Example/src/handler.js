import { lambda } from '../../../../lib/lib';
import { s3Example } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  console.log(event);

  const result = await s3Example();

  return result;
});
