import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('s3Example'); });

export default lambda(async (event) => {
  const message = 'This lambda function was triggered by a s3 event';

  console.log(message);

  return true;
});
