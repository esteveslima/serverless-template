import { errorHandler } from '../error/error';

export default async (func : Function, args : IArguments) : Promise<any> => {
  try {
    const functionResult = await func.apply(this, args);
    return functionResult;
  } catch (error: Error | any) {
    const handledError = errorHandler(error);
    return handledError;
  }
};
