import { lambda, logger } from '@sls/lib';
// TODO: improve example and lib to print event data and support files other than simple buffer, getting data from s3
export default lambda(async (event) => {
  const message = 'This lambda function was triggered by a s3 event';

  logger.log(message);

  return true;
});
