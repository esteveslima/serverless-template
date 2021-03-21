const bundlePluginsCustom = require('./utils/bundlePluginsCustom');

// Set custom configuration(including plugins)
module.exports.getCustom = () => {
  const pluginsCustom = bundlePluginsCustom();

  const custom = {
    ...pluginsCustom,
  };

  // set some extra custom configurations...

  return custom;
};
