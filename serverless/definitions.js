/* eslint-disable no-template-curly-in-string */
const { getProvider } = require('./defaults/provider');
const { getFunctions } = require('./defaults/functions');
const { getAllPlugins, getAllCompatiblePlugins, getMatchingPlugins } = require('./defaults/plugins');
const { getCustom } = require('./defaults/custom');

// Serverless configurations loaded as .js variables
// CLI options and configurations from other variables available to access

module.exports.provider = async ({ options }) => {
  const { service, cloud = 'aws' } = options;

  const provider = getProvider(cloud);

  return provider;
};

module.exports.functions = async ({ options, resolveConfigurationProperty }) => {
  const { service } = options;
  const provider = await resolveConfigurationProperty(['provider']);

  const functions = getFunctions(service);

  return functions;
};

module.exports.plugins = async ({ options, resolveConfigurationProperty }) => {
  const { plugins } = options || {};
  const functions = await resolveConfigurationProperty(['functions']);

  switch (plugins) {
    case 'all': return getAllPlugins(); // get all plugins, even potentially incompatible ones
    case 'compatible': return getAllCompatiblePlugins(functions); // get all compatible plugins
    default: return getMatchingPlugins(functions); // get only compatible plugins matching functions events
  }
};

module.exports.custom = async ({ options, resolveConfigurationProperty }) => {
  const { service } = options;
  const functions = await resolveConfigurationProperty(['functions']);

  const custom = getCustom();

  return custom;
};
