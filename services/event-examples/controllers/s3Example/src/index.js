import { } from '@sls/lib';

export const s3Example = async () => {
  const message = 'This lambda function was triggered by a s3 event';

  console.log(message);

  return true;
};
