import { lambda, logger } from '@sls/lib';

export default lambda(async (event) => {
  const message = 'This lambda function was triggered by a cloudwatch event';

  logger.log(message);
});
