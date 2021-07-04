/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
// // enables cache for functions throught api gateway(disabled: not free tier)
  // 'serverless-api-gateway-caching': {
  //   apiGatewayCaching: {
  //     enabled: true, // Enable cache to use the plugin(still requires definition per function)
  //     ttlInSeconds: 30,
  //   },
  // },
};
