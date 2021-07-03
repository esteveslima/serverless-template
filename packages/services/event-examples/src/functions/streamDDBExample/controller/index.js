import { logger } from '@sls/lib';

export default async (records) => {
  const streamData = records.map((record) => JSON.stringify(record.dynamodb));

  const message = 'This lambda function was triggered by a DynamoDB stream';

  logger.log(message);
  logger.log(streamData);

  return true;
};
