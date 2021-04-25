import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('cronExample'); });

export default lambda(async (event) => {
  const message = 'This lambda function was triggered by a cloudwatch event';

  console.log(message);
});
