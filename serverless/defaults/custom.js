const { pluginsConfigurations } = require('./plugins');

const pluginsConfig = pluginsConfigurations();

// Set custom configuration(including plugins)
module.exports.getCustom = (service) => {
  const custom = {
    ...pluginsConfig,
  };

  // set some extra custom configurations...

  return custom;
};
