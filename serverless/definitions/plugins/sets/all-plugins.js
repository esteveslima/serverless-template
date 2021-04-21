/* eslint-disable no-template-curly-in-string */
// TODO: check and clean eslint disables
// TODO: rename "sets" to "profiles"?
// References from project folder(not monorepo root folder)
// List of every plugin with its custom configuration(the items order may be relevant)
module.exports = {
  // plugin to bundle only necessary code from service functions(must be the first on the list)
  'serverless-webpack': {
    webpack: {
      webpackConfig: '../../webpack.config.js',
      includeModules: true,
      // keepOutputDirectory: true,
    },
  },

  //
  'serverless-offline-scheduler': {},

  // plugin to test s3 events with sls offline(bucket folder automatically created only if there is a function with s3 event)
  'serverless-s3-local': { // TODO: SCRIPT TO AUTOMATICALLY UPLOAD FILE THROUGHT AWS-SDK WITH DRAG-DROP FILES IN BUCKET FOLDER(inotifywait with script)
    s3: {
      address: 'localhost',
      host: 'localhost',
      port: '4569',
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      // httpsProtocol: './resources/local-ssl-tls',
      httpsProtocol: '../../resources/local-ssl-tls', // TODO: move plugins resources(maybe to definitions, importing here loaded from js 'path')
      directory: '../../.s3-local',
      silent: true,
    },
  },

  // plugin to test sns events with sls offline
  'serverless-offline-sns': {
    'serverless-offline-sns': {
      port: '4002',
      accountId: '123456789012', // '{ "Ref" : "AWS::AccountId" }',
    },
  },

  // // plugin to test sqs events with sls offline, removed by default(need fix: not working inside docker container)
  // // to use it, test directly on host machine with command: export NODE_TLS_REJECT_UNAUTHORIZED=0 && sls offline start
  // // also, remove serverless-plugin-scripts environment check, change serverless-offline port if containers are still running and enable the call at trigger.js for offline environment
  // 'serverless-offline-sqs': {
  //   'serverless-offline-sqs': {
  //     autoCreate: true,
  //     apiVersion: '2012-11-05',
  //     endpoint: 'http://localhost:9324', // 'http://queue-container:9324',  // use 'http://localhost:9324' to test directly at host machine
  //     region: '${self:provider.region}',
  //     accessKeyId: 'root',
  //     secretAccessKey: 'root',
  //     skipCacheInvalidation: false,
  //   },
  // },

  // TODO: attach vscode debugger to use with 'sls offline' plugins
  // plugin to locally debug with api gateway(requires content-type header to parse data)
  'serverless-offline': {
    'serverless-offline': {
      httpsProtocol: '../../resources/local-ssl-tls',
      host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
      httpPort: '4000',
    },
  },

  // plugin to run scripts based on serverless commands and hooks(serverless-scriptable-plugin is similar)
  'serverless-plugin-scripts': {
    scripts: {
      commands: {
        teste: '. ../../resources/scripts/plugin-scripts/update-aws-keys-prod.sh',
        checkdeploystage: '../../resources/scripts/plugin-scripts/check-deploy-stage.sh',
      },
      hooks: { // See some serverless hooks: export SLS_DEBUG=* or https://gist.github.com/HyperBrain/50d38027a8f57778d5b0f135d80ea406 and https://gist.github.com/MikeSouza/b9d2c89aec768a8871c8778f530cf4ab
        // Run before offline -> prevent accidental runs outside docker environment
        'before:offline:start': '../../resources/scripts/plugin-scripts/check-dev-env.sh',
        // Run before deployment -> prevent accidental runs outside docker environment
        'before:deploy:deploy': `\
          ../../resources/scripts/plugin-scripts/check-dev-env.sh
        `,
        // Run after deployment
        // 'after:deploy:finalize': '',
      },
    },
  },

  // TODO...
  // 'serverless-offline-dynamodb-streams': {},
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
  // 'serverless-api-gateway-throttling': {},
};
