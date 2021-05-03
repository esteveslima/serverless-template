/* eslint-disable no-template-curly-in-string */
// Functions configuration resolved as .js variable with extra custom logic

const { utils: { filterFunctions } } = require('@sls/definitions');

module.exports = async ({ options, resolveConfigurationProperty }) => {
  const stage = await resolveConfigurationProperty(['provider', 'stage']);

  const functions = {
    // someFunction: stage !== 'local' && {
    //   handler: './src/controllers/someController/handler.default',
    //   events: [
    //     {
    //       http: {
    //         method: 'POST',
    //         path: '/somePath',
    //       },
    //     },
    //   ],
    // },
  };

  return filterFunctions(functions);
};
