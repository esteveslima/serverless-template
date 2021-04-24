import { parseErrorResponse } from './response/response';
import errorObjects from './error-objects';
import logger from '../logger/logger';

// const { IS_OFFLINE } = process.env;

export default (err) => {
  const errorResponse = parseErrorResponse(err);
  errorResponse.stack = err.stack;

  logger[errorResponse.errorLevel]({
    errorResponse,
  });

  return {
    statusCode: errorResponse.errorObject?.httpCode ?? errorObjects.INTERNAL_SERVER_ERROR.httpCode,
    // headers, //TODO: return id?
    Error: errorResponse.errorObject?.errorCode ?? errorObjects.INTERNAL_SERVER_ERROR.errorCode,
    Message: errorResponse.errorObject?.message ?? errorObjects.INTERNAL_SERVER_ERROR.message,
  };
};
