const { getPluginsCustoms } = require('../plugins/plugins');

const pluginsConfig = getPluginsCustoms();

// Set custom configuration(including plugins)
module.exports.getCustom = () => {
  const custom = {
    ...pluginsConfig,
  };

  // set some extra custom configurations...

  return custom;
};
