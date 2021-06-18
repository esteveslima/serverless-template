import { lambda, logger } from '@sls/lib';

export default lambda(async (event) => {
  const { params } = event.body;

  return {
    result: params,
  };
});
