const pluginsList = require('../plugins-list');

const bundleConfigObject = (objectsList/* , configType */) => {
  // const filteredObjectsList = Object.values(objectsList).filter((obj) => obj[configType]).map((obj) => obj[configType]);
  const bundleObject = objectsList.reduce((acc, curr) => {
    const [objKey, objProps] = [Object.keys(curr)[0], Object.values(curr)[0]];
    acc[objKey] = objProps;
    return acc;
  }, {});

  return bundleObject;
};
  // Get only plugins custom configs from the definitions(config from unused plugins doesn't interfeer)
module.exports.getPluginsCustoms = () => {
  const custom = Object.values(pluginsList).filter((plugin) => plugin.custom).map((plugin) => plugin.custom);
  const pluginsConfigs = bundleConfigObject(custom);

  return pluginsConfigs;
};
