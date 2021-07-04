/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // plugin for triggering dynamoDB streams(using docker-compose container, requires the table to be created or the startup will fail)
  'serverless-offline-dynamodb-streams': {
    'serverless-offline-dynamodb-streams': {
      apiVersion: '2013-12-02',
      endpoint: 'http://dynamodb-container:8000',
      region: 'us-east-1',
      accessKeyId: 'root',
      secretAccessKey: 'root',
      skipCacheInvalidation: false,
      readInterval: 500,
    },
  },
};
