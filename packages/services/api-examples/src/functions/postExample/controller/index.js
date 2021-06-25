import { logger } from '@sls/lib';
import validation from './utils/validation/validation';
import inputSchema from './utils/schemas/input';

export default async (parameters) => {
  await validation(parameters, inputSchema);

  const message = 'This is a simple post request with input validation';
  logger.log(message);

  return { message, parameters };
};
