import { logger } from '@sls/lib';

export default async (event) => {
  const message = 'This lambda function was triggered by a s3 event';

  logger.log(message);
  logger.log(event);

  return true;
};
