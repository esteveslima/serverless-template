import errorObjects from '../error-objects';

export interface IErrorObject {
  errorCode: number,
  httpCode: number,
  message: string
}

export interface IWarningResponse {
  errorObject : IErrorObject,
  errorDetail : unknown,
  errorLevel : string,
}
// TODO: way to use only one class
// Class wraping warning responses
export default class WarningResponse extends Error implements IWarningResponse {
  errorObject;

  errorDetail;

  errorLevel;

  constructor(errorObject: IErrorObject, errorDetail : unknown) {
    super(errorObject.message);
    this.errorObject = errorObject ?? errorObjects.INTERNAL_SERVER_ERROR;
    this.errorDetail = errorDetail ?? 'Warning response';
    this.errorLevel = 'warn';
  }
}
