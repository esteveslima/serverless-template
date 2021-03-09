import { lambda } from '../../../../lib/lib';
import { cronExample } from './controller/index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  console.log(event);

  const result = await cronExample();

  return result;
});
