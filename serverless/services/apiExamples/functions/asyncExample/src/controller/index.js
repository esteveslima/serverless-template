import { } from '../../../../../../lib/lib';

export const asyncExample = async (path, query, headers, body) => {
  const message = 'This is a simple post request that ran in async mode(apiGateway instantaneously returns 200 response but lambda continues running)';

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 35000);
  });

  console.info({
    message, path, query, headers, body,
  });
  // return { message, pathParameters };
};
