import { lambda } from '@sls/lib';
import controller from './controller/index';

// TODO: test examples with actions plugged at sns topic(aws console)
export default lambda(async (event) => {
  const records = event.Records;

  const result = await controller(records);

  return result;
});
