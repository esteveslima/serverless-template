import { lambda } from '@sls/lib';
import controller from './controller/index';

export default lambda(async (event) => {
  const params = event.body;

  const result = await controller(params);

  return result;
});
