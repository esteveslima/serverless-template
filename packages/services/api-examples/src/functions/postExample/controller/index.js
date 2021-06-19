import { logger } from '@sls/lib';

export default async (parameters) => {
  const message = 'This is a simple post request with input validation';

  logger.log(message);

  return { message, parameters };
};
