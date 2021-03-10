/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

const { stage } = process.env;

const rate = stage === 'local' ? 'rate(1 minute)' : 'cron(0 0 * * ? *)';

module.exports.cronExample = {
  timeout: 60,
  events: [
    {
      schedule: {
        enabled: true,
        rate,
        // input: {}
      },
    },
  ],
};
