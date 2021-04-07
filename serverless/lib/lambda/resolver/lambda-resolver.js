/* eslint-disable prefer-rest-params */
import Core from '../../core/core';
import { parseResponse } from '../utils/parse-response';

const {
  logger, resolver, middleware, errorHandler,
} = Core;

const { IS_OFFLINE } = process.env;

// Register first custom middlewares to run in each event
middleware.before((args) => { if (!IS_OFFLINE) logger.info(args); });
middleware.after((result, args) => { if (!IS_OFFLINE) logger.info(result); });

// Wrapper for lambda functions
export default (func) => async function lambdaResolver() {
  const result = await (async () => {
    try {
      const functionResult = await resolver.resolve(func, arguments);
      return functionResult;
    } catch (error) {
      const errorMessage = errorHandler(error);
      return errorMessage;
    }
  })();

  return parseResponse(result);
};
