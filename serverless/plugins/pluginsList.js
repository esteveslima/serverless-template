/* eslint-disable no-template-curly-in-string */

// List of every plugin with its custom configuration(the items order is relevant)
module.exports = {
  // plugin to bundle only necessary code from service functions(must be the first on the list)
  'serverless-webpack': {
    custom: {
      webpack: {
        webpackConfig: './webpack.config.js',
        includeModules: true,
      },
    },
  },

  //
  'serverless-offline-scheduler': {
    custom: {},
  },

  // // must come before offline server
  // 'serverless-offline-sqs': { // ---------------sqs offline plugin is conflicting------------
  //   'serverless-offline-sqs': {
  //     autoCreate: true,
  //     apiVersion: '2012-11-05',
  //     endpoint: 'queue-container:9324',
  //     region: '${self:provider.region}',
  //     accessKeyId: 'root',
  //     secretAccessKey: 'root',
  //     skipCacheInvalidation: false,
  //   },
  // },

  // must come before offline server
  'serverless-offline-sns': {
    custom: {
      'serverless-offline-sns': {
        port: '4002',
        accountId: '123456789012', // '{ "Ref" : "AWS::AccountId" }',
      },
    },
  },

  // must come before offline server
  'serverless-s3-local': { // TODO: SCRIPT TO AUTOMATICALLY UPLOAD FILE THROUGHT AWS-SDK WITH DRAG-DROP FILES IN BUCKET FOLDER(inotifywait with script)
    custom: {
      s3: {
        address: 'localhost',
        host: 'localhost',
        port: '4569',
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
        httpsProtocol: './resources/local-ssl-tls',
        directory: './.S3-local-bucket',
        silent: true,
      },
    },
  },

  // plugin to locally debug with api gateway
  'serverless-offline': {
    custom: {
      'serverless-offline': {
        httpsProtocol: './resources/local-ssl-tls',
        host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
        httpPort: '4000',
      },
    },
  },

  // DEPRECATED
  // REQUIRES DOWNGRADE TO serverless@2.4.0, UPGRADE TO @NEXT and disable configValidationMode
  // 'serverless-iam-roles-per-function': {
  //   custom: {},
  // },

  // DEPRECATED
  // plugin to allow returning binary data throught API Gateway(it will throw an error if there is a non http triggered function in the service deploy)
  // 'serverless-apigw-binary': {
  //   custom: {
  //     apigwBinary: {
  //       types: [
  //         'image/jpeg',
  //         'text/html',
  //         'application/pdf',
  //         'application/vnd.ms-excel'],
  //     },
  //   },
  // },

  // TODO...
  // 'serverless-domain-manager':{},
  // 'serverless-localstack':{},
  // 'serverless-s3-local': {},
  // 'serverless-plugin-conditional-functions':{},
  // 'serverless-plugin-ifelse':{},
  // 'serverless-pseudo-parameters':{},
  // 'serverless-plugin-aws-alerts':{},
  // 'serverless-prune-plugin':{},
  // 'serverless-plugin-lambda-dead-letter':{},
  // 'serverless-plugin-scripts':{},
  // 'serverless-aws-documentation':{},
  // 'serverless-reqvalidator-plugin':{},
};
