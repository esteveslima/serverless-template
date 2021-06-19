import { logger } from '@sls/lib';

export default async (records) => {
  const snsMessages = records.map((record) => JSON.parse(record.Sns.Message));

  const message = 'This lambda function was triggered by a sns topic';

  logger.log(message);
  logger.log(snsMessages);

  return true;
};
