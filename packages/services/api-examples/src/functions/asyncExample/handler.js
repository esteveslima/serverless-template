import { lambda } from '@sls/lib';
import controller from './controller/index';

export default lambda(async (event) => {
  const {
    path, query, headers, body,
  } = event;

  const result = await controller(path, query, headers, body);

  return result;
});
