/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

const { SLS_STAGE } = process.env;

const rate = SLS_STAGE === 'local' ? 'rate(1 minute)' : 'cron(0 0 * * ? *)';

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
