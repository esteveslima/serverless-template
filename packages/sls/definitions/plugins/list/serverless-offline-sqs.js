/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // // test sqs events with sls offline(disabled by default due conflicts)
  // // requires elastimq queue container(may be a problematic plugin with conflicts inside docker container)
  // // to test directly on host machine, set environment variables: NODE_TLS_REJECT_UNAUTHORIZED=0 , SLS_MODE=no-scripts(may also require NODE_ENV=test to work)
  // // example disabled by default, enable at trigger.js for offline environment
  // // finally, run sls offline server(may require ports adjustments in docker-compose to avoid conflicts)
  // 'serverless-offline-sqs': {
  //   'serverless-offline-sqs': {
  //     autoCreate: true,
  //     apiVersion: '2012-11-05',
  //     endpoint: 'http://localhost:9324', // use 'http://queue-container:9324' to test directly at host machine
  //     region: 'us-east-1', // '${self:provider.region}',
  //     accessKeyId: 'root',
  //     secretAccessKey: 'root',
  //     skipCacheInvalidation: false,
  //   },
  // },
};
