import { parseErrorResponse } from './response/response';
import errorObjects from './error-objects';
import logger from '../logger/logger';

interface IErrorHandler {
  statusCode: number,
  Error: number,
  Message: string
}

// const { IS_OFFLINE } = process.env;

export default (err : Error) : IErrorHandler => {
  const errorResponse = parseErrorResponse(err);
  errorResponse.stack = err.stack;

  // logger[errorResponse.errorLevel]({ errorResponse }); // Logging error by default
  switch (errorResponse.errorLevel) {
    case 'warn': logger.warn({ errorResponse }); break;
    case 'error': logger.error({ errorResponse }); break;
    default: logger.log({ errorResponse });
  }

  return {
    statusCode: errorResponse.errorObject?.httpCode ?? errorObjects.INTERNAL_SERVER_ERROR.httpCode,
    Error: errorResponse.errorObject?.errorCode ?? errorObjects.INTERNAL_SERVER_ERROR.errorCode,
    Message: errorResponse.errorObject?.message ?? errorObjects.INTERNAL_SERVER_ERROR.message,
    // headers, //TODO: return useful data?
  };
};
