import { logger } from '@sls/lib';

export default async (records) => {
  const sqsMessages = records.map((record) => ({ body: JSON.parse(record.body), messageAttributes: JSON.stringify(record.messageAttributes) }));

  const message = 'This lambda function was triggered by a sqs topic';

  logger.log(message);
  logger.log(sqsMessages);

  return true;
};
