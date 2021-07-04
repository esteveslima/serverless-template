/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // local api gateway debug server(dependant plugins must come before)
  'serverless-offline': {
    'serverless-offline': {
      httpsProtocol: `${pluginsAssets}/local-ssl-tls`,
      host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
      httpPort: '4000',
      apiKey: 'someApiKey1234567890', // mocked api-key(for private functions)
    },
  },
};
