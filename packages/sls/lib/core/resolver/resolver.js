import { errorHandler } from '../error/error';

export default async (func, args) => {
  try {
    const functionResult = await func.apply(this, args);
    return functionResult;
  } catch (error) {
    const handledError = errorHandler(error);
    return handledError;
  }
};
