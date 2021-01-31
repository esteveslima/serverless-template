// DEPRECATED
/* import { errorHandler } from '../error/error-handler';

// Function wrapper to perform common tasks
export const functionWrapper = async (func) => async function wrapper() {
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
};
*/
