import { lambda } from '../../../../../serverless/lib/lib';
import { postExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const parameters = event.body;

  const result = await postExample(parameters);

  return result;
});
