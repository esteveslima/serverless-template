/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // test s3 events with sls offline
  'serverless-s3-local': { // TODO: SCRIPT TO AUTOMATICALLY UPLOAD FILE THROUGHT AWS-SDK WITH DRAG-DROP FILES IN BUCKET FOLDER(inotifywait with script)
    s3: {
      address: 'localhost',
      host: 'localhost',
      port: '4569',
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      httpsProtocol: `${pluginsAssets}/local-ssl-tls`,
      directory: `${serviceTempDir}/.s3-local`, // uploaded files at service .temp folder(bucket folder automatically created if there's a function with s3 event)
      silent: true,
    },
  },
};
