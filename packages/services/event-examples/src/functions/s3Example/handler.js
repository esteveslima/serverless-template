import { lambda, logger } from '@sls/lib';
import controller from './controller/index';

// TODO: improve example and lib to print event data and support files other than simple buffer, getting data from s3
export default lambda(async (event) => {
  const result = await controller(event);

  return result;
});
