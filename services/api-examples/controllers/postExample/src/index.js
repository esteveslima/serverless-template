import { lambda } from '../../../../../serverless/lib/lib';

export const postExample = async (parameters) => {
  const message = 'This is a simple post request with input validation';

  return { message, parameters };
};
