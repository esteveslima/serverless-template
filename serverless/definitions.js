/* eslint-disable no-template-curly-in-string */
const { getProvider } = require('./defaults/provider');
const { getFunctions } = require('./defaults/functions');
const { getPlugins } = require('./defaults/plugins');
const { getCustom } = require('./defaults/custom');

module.exports.functions = (serverless) => {
  const service = serverless ? serverless.processedInput.options.service : undefined;

  const functions = getFunctions(service);

  return functions;
};

module.exports.provider = getProvider(); // cannot be imported as .js variable(require to be resolved before serverless.js)

module.exports.plugins = getPlugins(); // cannot be imported as .js variable(require to be resolved before serverless.js)

module.exports.custom = getCustom();
