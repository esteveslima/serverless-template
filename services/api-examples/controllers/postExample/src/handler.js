import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('postExample'); });

export default lambda(async (event) => {
  const parameters = event.body;

  const message = 'This is a simple post request with input validation';

  return { message, parameters };
});
