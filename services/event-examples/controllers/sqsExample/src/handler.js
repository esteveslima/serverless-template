import { lambda } from '../../../../../serverless/lib/lib';
import { sqsExample } from './index';

// Decoupling provider integration from business logic
export const lambdaFunction = lambda.wrapper(async (event) => {
  const snsMessages = 'event.Records.map((record) => JSON.parse(record.Sns.Message));';

  // const result = await snsExample(snsMessages);

  return {
    statusCode: 200,
    body: event,
  };
});
