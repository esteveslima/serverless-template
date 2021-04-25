import { lambda, middleware } from '@sls/lib';

middleware.before((event) => { console.log('sqsExample'); });
// TODO: improve example(and lib) to poll and consume queue
export default lambda(async (event) => {
  const sqsMessages = event.Records.map((record) => ({ body: JSON.parse(record.body), messageAttributes: JSON.stringify(record.messageAttributes) }));

  const message = 'This lambda function was triggered by a sqs topic';

  console.log(message);
  console.log(sqsMessages);

  return event;
});
