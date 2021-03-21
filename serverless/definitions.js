/* eslint-disable no-template-curly-in-string */
const { saveSlsEnvVar } = require('./tools/tools');
const { getProvider } = require('./definitions/provider/provider');
const { getFunctions } = require('./definitions/functions/functions');
const { getPlugins } = require('./definitions/plugins/plugins');
const { getCustom } = require('./definitions/custom/custom');
const { getResources } = require('./definitions/resources/resources');
const { getPluginsCustoms } = require('./definitions/plugins/utils/pluginsCustoms');

// Serverless configurations loaded as .js variables(loading provider and than functions before anything else)
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
  const { service } = options;
  const functions = await resolveConfigurationProperty(['functions']);

  const plugins = getPlugins(functions, options.plugins);

  return plugins;
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
