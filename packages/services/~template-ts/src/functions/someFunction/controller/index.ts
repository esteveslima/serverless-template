// @ts-ignore
import { logger } from '@sls/lib';

export default async (someParams : object | string) => {
  logger.log(someParams);
  return someParams;
};
