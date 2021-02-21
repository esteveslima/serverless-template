import { parseResponse } from './response';
import { errorHandler } from '../../core/error/error-handler';

// Wrapper for lambda functions
export const wrapper = (func) => async function lambdaWrapper() {
  const result = await (async () => {
    try {
      // run before function...

      // eslint-disable-next-line prefer-rest-params
      const functionResult = await func.apply(this, arguments);

      // run after function return...

      return functionResult;
    } catch (error) {
      const errorMessage = errorHandler(error);
      return errorMessage;
    }
  })();

  return parseResponse(result);
};
