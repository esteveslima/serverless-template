const { pluginsResourcesConfig } = require('./plugins');

const pluginsConfig = pluginsResourcesConfig();

// Set custom configuration(including plugins)
module.exports.getResources = () => {
  const resources = {
    ...pluginsConfig,
  };

  // set some extra resources...

  return resources;
};
