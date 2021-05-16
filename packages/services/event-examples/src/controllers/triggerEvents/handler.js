import { lambda, logger, middleware } from '@sls/lib';
import triggerSns from './utils/triggerSns';
import triggerSqs from './utils/triggerSqs';
import triggerS3 from './utils/triggerS3';

middleware.before((event) => { logger.log('triggerEventsExample'); });

export default lambda(async (event) => {
  const { IS_OFFLINE } = process.env;

  const result = await (async (eventData) => {
    const triggersInfo = {};

    // Triggering sns event
    triggersInfo.sns = await triggerSns();

    // Triggering sqs event
    if (!IS_OFFLINE) triggersInfo.sqs = await triggerSqs();
    else logger.info('Not triggering sqs with sls offline environment by default, check sqs plugin definition for more details');

    // Triggering sqs event
    triggersInfo.s3 = await triggerS3(eventData);

    return triggersInfo;
  })(event);

  return result;
});
