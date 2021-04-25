import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('asyncExample'); });

export default lambda(async (event) => {
  const {
    path, query, headers, body,
  } = event;

  const message = 'This is a simple post request that ran in async mode(apiGateway instantaneously returns 200 response but lambda continues running)';

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 35000);
  });

  console.info({
    message, path, query, headers, body,
  });
});
