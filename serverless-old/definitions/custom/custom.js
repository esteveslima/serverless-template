const bundlePluginsCustom = require('./utils/bundle-plugins-custom');

// Set custom configuration(including plugins)
module.exports.getCustom = () => {
  const pluginsCustom = bundlePluginsCustom();

  const custom = {
    ...pluginsCustom,
  };

  // set some extra custom configurations...

  return custom;
};
