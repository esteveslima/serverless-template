/* eslint-disable prefer-rest-params */
import 'source-map-support/register'; // enable source-map registering at the entry point, to map webpack error logs
import { logger, resolver, middleware } from '../../../core/core';
import parseResponse from './utils/parse-response';

// Wrapper for lambda functions
export default (func) => async function lambdaResolver() {
  const { IS_OFFLINE } = process.env;

  // Register default middlewares for lambda functions
  middleware.before((args) => { if (!IS_OFFLINE) logger.info(args); }); // TODO: enhance logs to beautify view on cloudwatch
  middleware.after((result, args) => { if (!IS_OFFLINE) logger.info(result); });

  const result = await resolver.resolve(func, arguments); // resolve function, resulting in response or error

  return parseResponse(result);
};
