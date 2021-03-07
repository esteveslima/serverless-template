const { pluginsCustomConfig } = require('./plugins');

const pluginsConfig = pluginsCustomConfig();

// Set custom configuration(including plugins)
module.exports.getCustom = (service) => {
  const custom = {
    ...pluginsConfig,
  };

  // set some extra custom configurations...

  return custom;
};
