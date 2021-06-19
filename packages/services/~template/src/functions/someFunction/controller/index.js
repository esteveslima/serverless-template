import { logger } from '@sls/lib';

export default async (someParams) => {
  logger.log(someParams);
  return someParams;
};
