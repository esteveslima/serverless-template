import errorObjects from '../error-objects';

export interface IErrorObject {
  errorCode: number,
  httpCode: number,
  message: string
}

export interface IErrorResponse {
  errorObject : IErrorObject,
  errorDetail : unknown,
  errorLevel : string,
}

// Class wraping error responses
export default class ErrorResponse extends Error implements IErrorResponse {
  errorObject;

  errorDetail;

  errorLevel;

  constructor(errorObject: IErrorObject, errorDetail : unknown) {
    super(errorObject.message);
    this.errorObject = errorObject ?? errorObjects.INTERNAL_SERVER_ERROR;
    this.errorDetail = errorDetail ?? 'Error response';
    this.errorLevel = 'error';
  }

  static parse = (err : Error) => {
    if (err instanceof ErrorResponse) return { ...err };

    // If it is not a manually thrown ErrorResponse or WarningResponse object...
    // ... is possible to test map the error and parse to a proper ErrorResponse object
    const errorObject = errorObjects.INTERNAL_SERVER_ERROR;
    const errorDetail = `${err}`;
    // TODO: enable customize these errors per function
    /* switch (true) {
      case (err.name === ''): {
        errorObject = ...
        errorDetail = ...
        break;
      }
      case (err.name === ' '): {

        break;
      }
      default: {
        errorObject = { ...errorObjects.INTERNAL_SERVER_ERROR };
        errorDetail = `${err}`;
      }
    } */

    return new ErrorResponse(errorObject, errorDetail);
  };
}
