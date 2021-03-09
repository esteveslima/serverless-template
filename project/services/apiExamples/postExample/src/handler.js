import { lambda } from '../../../../lib/lib';
import { postExample } from './controller';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const parameters = event.body;

  console.log(event);

  const result = await postExample(parameters);

  return result;
});
