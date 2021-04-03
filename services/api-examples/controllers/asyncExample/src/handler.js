import { lambda } from '../../../../../serverless/lib/lib';
import { asyncExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const {
    path, query, headers, body,
  } = event;

  const result = await asyncExample(path, query, headers, body);

  return result;
});
