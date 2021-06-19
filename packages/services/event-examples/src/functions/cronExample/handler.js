import { lambda } from '@sls/lib';
import controller from './controller/index';

export default lambda(async (event) => {
  const result = await controller(event);

  return result;
});
