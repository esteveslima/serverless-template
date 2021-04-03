import { } from '@sls/lib';

export const cronExample = async () => {
  const message = 'This lambda function was triggered by a cloudwatch event';

  console.log(message);

  return true;
};
