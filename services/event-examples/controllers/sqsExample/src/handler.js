import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('sqsExample'); });

export default lambda(async (event) => {
  const sqsMessages = 'event.Records.map((record) => JSON.parse(record.Sns.Message));';

  const message = 'This lambda function was triggered by a sns topic';

  console.log(message);
  console.log(sqsMessages);

  return event;
});
