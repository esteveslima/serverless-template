/* eslint-disable no-template-curly-in-string */
// TODO: rename "sets" to "profiles"?
// References from project folder(not monorepo root folder)
// List of every plugin with its custom configuration(the items order may be relevant)
module.exports = {
  // plugin to bundle only necessary code from service functions(must be the first on the list)
  'serverless-webpack': {
    webpack: {
      // webpackConfig: './webpack.config.js',
      webpackConfig: '../../webpack.config.js',
      includeModules: true,
    },

  },

  //
  'serverless-offline-scheduler': {},

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
    'serverless-offline-sns': {
      port: '4002',
      accountId: '123456789012', // '{ "Ref" : "AWS::AccountId" }',
    },

  },

  // must come before offline server(bucket folder automatically created only if there is a function with s3 event)
  'serverless-s3-local': { // TODO: SCRIPT TO AUTOMATICALLY UPLOAD FILE THROUGHT AWS-SDK WITH DRAG-DROP FILES IN BUCKET FOLDER(inotifywait with script)
    s3: {
      address: 'localhost',
      host: 'localhost',
      port: '4569',
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      // httpsProtocol: './resources/local-ssl-tls',
      httpsProtocol: '../../resources/local-ssl-tls',
      directory: '../../.s3-local',
      silent: true,

    },
  },

  // 'serverless-dynamodb-local': {
  //   dynamodb: {
  //     stages: ['local'],
  //     start: {
  //       port: 8000,
  //       inMemory: false, // true,
  //       heapInitial: '200m',
  //       heapMax: '1g',
  //       migration: true,
  //       migrate: true,
  //       seed: true,
  //       convertEmptyValues: true,
  //       noStart: true, // using dynamoDB docker image
  //     },
  //   },
  // },

  // plugin to locally debug with api gateway(requires content-type header to parse data)
  'serverless-offline': {
    'serverless-offline': {
      // httpsProtocol: './resources/local-ssl-tls',
      httpsProtocol: '../../resources/local-ssl-tls',
      host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
      httpPort: '4000',
    },

  },

  // plugin to run scripts based on serverless commands and hooks(serverless-scriptable-plugin is similar)
  // Serverless hooks: https://gist.github.com/HyperBrain/50d38027a8f57778d5b0f135d80ea406 and https://gist.github.com/MikeSouza/b9d2c89aec768a8871c8778f530cf4ab
  'serverless-plugin-scripts': {
    scripts: {
      commands: {
        // teste: './resources/scripts/plugin-scripts/check-deploy-stage.sh',
        teste: '../../resources/scripts/plugin-scripts/check-dev-env.sh',
      },
      hooks: {
        // Run before offline -> prevent accidental runs outside docker environment
        // 'before:offline:start': './resources/scripts/plugin-scripts/check-dev-env.sh',
        // 'before:offline:start': '../../resources/scripts/plugin-scripts/check-dev-env.sh',
        // Run before deployment -> prevent accidental runs outside docker environment and deployments in stage 'local'
        // 'before:deploy:deploy': `\
        //   ./resources/scripts/plugin-scripts/check-dev-env.sh && \
        //   ./resources/scripts/plugin-scripts/check-deploy-stage.sh
        // `,
        // 'before:deploy:deploy': `\
        //   ../../resources/scripts/plugin-scripts/check-dev-env.sh && \
        //   ../../resources/scripts/plugin-scripts/check-deploy-stage.sh
        // `,
        // Run after deployment
        // 'after:deploy:finalize': '',
      },
    },

  },

  // TODO...
  // 'serverless-domain-manager':{},
  // 'serverless-localstack':{},
  // 'serverless-plugin-conditional-functions':{},
  // 'serverless-plugin-ifelse':{},
  // 'serverless-pseudo-parameters':{},
  // 'serverless-plugin-aws-alerts':{},
  // 'serverless-prune-plugin':{},
  // 'serverless-plugin-lambda-dead-letter':{},

  // 'serverless-aws-documentation':{},
  // 'serverless-reqvalidator-plugin':{},
};
