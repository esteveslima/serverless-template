/* eslint-disable prefer-rest-params */
import 'source-map-support/register'; // enable source-map registering at the entry point, to map webpack error logs
import { logger, middleware } from '../../../core/core';
import parseRequest from './utils/parse-request';
import parseResponse from './utils/parse-response';

// Wrapper for lambda functions
export default (func) => async function lambda() {
  const { IS_OFFLINE } = process.env;

  // Register default middlewares
  middleware.before((args) => { if (!IS_OFFLINE) logger.info(args); }); // TODO: enhance logs to beautify view on cloudwatch
  middleware.after((args, result) => { if (!IS_OFFLINE) logger.info(result); });
  middleware.error((args, errorObject) => { if (!IS_OFFLINE) logger.error('Custom middleware for errors'); });

  // Parse lambda requests
  const args = parseRequest(arguments);

  // Run function(between middlewares)
  const result = await middleware.resolve(func, args);

  // Parse response for api-gateway
  return parseResponse(result);
};
