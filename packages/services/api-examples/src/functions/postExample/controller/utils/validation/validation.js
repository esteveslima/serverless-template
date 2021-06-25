import { ErrorResponse, ErrorObjects } from '@sls/lib';
import validator from './validator/validator';

// Could be implemented as a common feature

export default async (payload, schema) => {
  const { isValid, errors } = validator(payload, schema);

  if (!isValid) {
    const errorsDescriptions = errors.map((e) => `${e.local} ${e.description}(${JSON.stringify(e.details)})`);
    const message = `${ErrorObjects.WRONG_PARAMETERS.message}. Description: ${errorsDescriptions.join(', ')}`;

    throw new ErrorResponse({ ...ErrorObjects.WRONG_PARAMETERS, message }, errors);
  }

  return true;
};
