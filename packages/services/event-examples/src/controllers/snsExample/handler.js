import { ErrorResponse, lambda, logger } from '@sls/lib';

// TODO: test examples with actions plugged at sns topic(aws console)
export default lambda(async (event) => {
  const snsMessages = event.Records.map((record) => JSON.parse(record.Sns.Message));

  const message = 'This lambda function was triggered by a sns topic';

  logger.log(message);
  logger.log(snsMessages);

  return true;
});
