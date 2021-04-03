import { } from '../../../../../serverless/lib/lib';

export const snsExample = async (snsMessages) => {
  const message = 'This lambda function was triggered by a sns topic';

  console.log(message);
  console.log(snsMessages);

  return true;
};
