import ErrorResponse from './error-response';
import WarningResponse from './warning-response';

// TODO: create a parse-response file and use this only as index

// Parse error into an appropriate ErrorResponse object if it isn't already a manually thrown ErrorResponse or WarningResponse object
const parseErrorResponse = (err : Error) : ErrorResponse | WarningResponse => {
  if (err instanceof ErrorResponse || err instanceof WarningResponse) {
    return { ...err };
  }
  return ErrorResponse.parse(err);
};

export {
  ErrorResponse,
  WarningResponse,
  parseErrorResponse,
};
