const pluginsList = require('./plugins-list');
const { getAllCompatiblePlugins, getMatchingPlugins } = require('./utils/functions-plugins');
const { getPluginsCustoms } = require('./utils/plugins-customs');

module.exports.getPluginsCustoms = getPluginsCustoms;

module.exports.getPlugins = (functions, option) => {
  switch (option) {
    case 'all': return Object.keys(pluginsList); // get all plugins, even potentially incompatible ones
    case 'compatible': return getAllCompatiblePlugins(functions); // get all plugins compatible with functions
    case 'matching': return getAllCompatiblePlugins(functions); // get all plugins matching functions
    default: return getMatchingPlugins(functions);
  }
};
