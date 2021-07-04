/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // bundle functions code with tree shaking, transcompiling with babel(must come before than offline servers)
  'serverless-webpack': {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: { forceExclude: ['aws-sdk'] },
    //   keepoutputDirectory: true, // required for localstack
    },
  },
};
