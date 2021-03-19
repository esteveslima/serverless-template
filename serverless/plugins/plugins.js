const pluginsList = require('./pluginsList');
const { getAllCompatiblePlugins, getMatchingPlugins } = require('./utils/functionsPlugins');
const { getPluginsCustoms } = require('./utils/pluginsCustoms');

module.exports = {
  getAllPlugins: () => Object.keys(pluginsList),
  getAllCompatiblePlugins,
  getMatchingPlugins,
  getPluginsCustoms,
};
