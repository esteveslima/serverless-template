import ErrorResponse from './error-response';
import logger from '../logger/logger';

export default (err) => {
  // Maps the error and parses it to an appropriate ErrorResponse object, if it is not already
  const errorResponse = ErrorResponse.parse(err);

  // eslint-disable-next-line no-console
  logger.error({
    errorMessage: JSON.stringify(errorResponse.result),
    stack: err.stack,
  });

  return {
    statusCode: errorResponse.error.httpCode,
    // headers,
    Error: errorResponse.error.errorCode,
    Message: errorResponse.error.message,
  };
};
