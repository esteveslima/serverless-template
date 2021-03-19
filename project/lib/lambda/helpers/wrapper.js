/* eslint-disable prefer-rest-params */
import { parseResponse } from './response';
import { errorHandler } from '../../core/error/error-handler';

const { STAGE } = process.env;

// Wrapper for lambda functions
export const wrapper = (func) => async function lambdaWrapper() {
  const result = await (async () => {
    try {
      // run before function...
      if (STAGE !== 'local') console.info(arguments);

      const functionResult = await func.apply(this, arguments);

      // run after function return...
      if (STAGE !== 'local') console.info(functionResult);

      return functionResult;
    } catch (error) {
      const errorMessage = errorHandler(error);
      return errorMessage;
    }
  })();

  return parseResponse(result);
};
