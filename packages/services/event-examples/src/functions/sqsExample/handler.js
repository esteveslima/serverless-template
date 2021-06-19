import { lambda, logger } from '@sls/lib';
import controller from './controller/index';

// TODO: improve example(and lib) to poll and consume queue
export default lambda(async (event) => {
  const records = event.Records;

  const result = await controller(records);

  return result;
});
