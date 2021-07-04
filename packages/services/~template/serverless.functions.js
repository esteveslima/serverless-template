/* eslint-disable no-template-curly-in-string */
// Functions configuration resolved as .js variable with extra custom logic

const { utils: { functions } } = require('@sls/definitions');

module.exports = async ({ options, resolveConfigurationProperty, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');

  return functions({
    someFunction: stage === 'local' && {
      handler: './src/functions/someFunction/handler.default',
      events: [
        {
          http: {
            method: 'POST',
            path: '/somePath',
          },
        },
      ],
    },
  });
};
