/* eslint-disable no-template-curly-in-string */
const { getProvider } = require('./provider/provider');
const { getFunctions } = require('./functions/functions');
const { getAllPlugins, getAllCompatiblePlugins, getMatchingPlugins } = require('./plugins/plugins');
const { getCustom } = require('./custom/custom');
const { getResources } = require('./resources/resources');

const saveSlsEnvVar = (options) => {
  // Define(and validate) options as environment variables(SLS_'OPTION') accessible ONLY in build/bundle time(not running time)
  Object.keys(options).forEach((option) => {
    if (typeof options[option] !== 'string') throw new Error(`\n\nInvalid Option -> ${option}: ${options[option]}\n\n`);
    process.env[`SLS_${option.toUpperCase()}`] = options[option];
  });
};

// Serverless configurations loaded as .js variables
// CLI options and configurations from other variables available for access

module.exports.provider = async ({ options }) => {
  const {
    service,
    stage = 'local',
    cloud = 'aws',
    region = 'us-east-1',
  } = options;

  const config = {
    region,
  };

  saveSlsEnvVar({
    service, cloud, stage, ...config,
  });

  const provider = getProvider(cloud, stage, config);

  return provider;
};

module.exports.functions = async ({ options, resolveConfigurationProperty }) => {
  const { service } = options;
  const provider = await resolveConfigurationProperty(['provider']);

  const functions = getFunctions(service);

  return functions;
};

module.exports.plugins = async ({ options, resolveConfigurationProperty }) => {
  const { plugins } = options;
  const functions = await resolveConfigurationProperty(['functions']);

  switch (plugins) {
    case 'all': return getAllPlugins(); // get all plugins, even potentially incompatible ones
    case 'compatible': return getAllCompatiblePlugins(functions); // get all plugins compatible with functions
    case 'matching': return getAllCompatiblePlugins(functions); // get all plugins matching functions
    default: return getMatchingPlugins(functions);
  }
};

module.exports.custom = async ({ options, resolveConfigurationProperty }) => {
  const { service } = options;
  const functions = await resolveConfigurationProperty(['functions']);

  const custom = getCustom();

  return custom;
};

module.exports.resources = async ({ options, resolveConfigurationProperty }) => {
  const { service } = options;
  const functions = await resolveConfigurationProperty(['functions']);

  const resources = getResources(service);

  return { Resources: resources };
};
