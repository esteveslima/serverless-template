/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // // EXPERIMENTAL: aws local services
  // // some features not working(see localstack-container logs to find out which ones to disable, e.g: httpApi)
  // // access the function adding the /route... after the provided endpoint
  // // requires to reload container in each deploy
  // // may require to reinstall dependencies at root dir after restarting container
  // 'serverless-localstack': {
  //   localstack: {
  //     host: 'http://localstack-container',
  //     edgePort: '4566',
  //     stages: ['local'],
  //     // lambda: {
  //     //   mountCode: true,
  //     // },
  //     docker: {
  //       sudo: true,
  //     },
  //     autoStart: false,
  //   },
  // },
};
