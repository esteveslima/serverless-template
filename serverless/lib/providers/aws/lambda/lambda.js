/* eslint-disable prefer-rest-params */
import 'source-map-support/register'; // enable source-map registering at the entry point, to map webpack error logs
import Core from '../../../core/core';
import { parseResponse } from './utils/parse-response';

const {
  logger, resolver, middleware,
} = Core;

const { IS_OFFLINE } = process.env;

// Register default middlewares for lambda functions
middleware.before((args) => { if (!IS_OFFLINE) logger.info(args); }); //TODO: enhance logs to beautify view on cloudwatch
middleware.after((result, args) => { if (!IS_OFFLINE) logger.info(result); });

// Wrapper for lambda functions
const lambda = (func) => async function lambdaResolver() {
  const result = await resolver.resolve(func, arguments); // resolve function, resulting in response or error

  return parseResponse(result);
};

export default lambda;
