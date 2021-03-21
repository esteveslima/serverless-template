const { getPluginsCustoms } = require('../../plugins/plugins');

module.exports = () => {
  const pluginsConfig = getPluginsCustoms();

  return pluginsConfig;
};
