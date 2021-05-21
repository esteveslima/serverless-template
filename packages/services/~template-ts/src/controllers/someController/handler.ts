// @ts-ignore
import { lambda, logger, middleware } from '@sls/lib';

middleware.before((event: any) => { logger.log('middleware usage example'); });

export default lambda(async (event: any) => {
  const { params } = event.body;

  return {
    result: params,
  };
});
