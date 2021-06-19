import { logger } from '@sls/lib';

export default async (event) => {
  const message = 'This lambda function was triggered by a cloudwatch event';

  logger.log(message);
  logger.log(event);

  return true;
};
