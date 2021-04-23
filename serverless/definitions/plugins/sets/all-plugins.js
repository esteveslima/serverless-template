const path = require('path');

const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const monorepoRoot = '../../'; // relative monorepo root path
const serviceTempDir = '.temp/'; // relative path to temporary folder used for each service --> TODO: move .serverless to .temp in each service(?)

// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
// List of every plugin with its custom configuration(the items order may be relevant)
module.exports = {
  // must be the first on the list
  // bundle functions code with tree shaking, transcompiling with babel
  'serverless-webpack': {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },

  // test cronjobs with sls offline
  'serverless-offline-scheduler': {},

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

  // test sns events with sls offline
  'serverless-offline-sns': {
    'serverless-offline-sns': {
      port: '4002',
      accountId: '123456789012', // '{ "Ref" : "AWS::AccountId" }',
    },
  },

  // // test sqs events with sls offline
  // // removed by default(need fix: not working inside docker container)
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

  // local api gateway debug server(dependant plugins must come before)
  'serverless-offline': {
    'serverless-offline': {
      httpsProtocol: `${pluginsAssets}/local-ssl-tls`,
      host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
      httpPort: '4000',
    },
  },

  // run scripts with serverless commands/hooks
  'serverless-plugin-scripts': {
    scripts: {
      commands: {
        teste: `. ${monorepoRoot}/resources/scripts/update-aws-keys-prod.sh`,
        checkdeploystage: `${pluginsAssets}/scripts/check-deploy-stage.sh`,
      },
      hooks: { // See some serverless hooks: export SLS_DEBUG=* or https://gist.github.com/HyperBrain/50d38027a8f57778d5b0f135d80ea406 and https://gist.github.com/MikeSouza/b9d2c89aec768a8871c8778f530cf4ab
        // Run before offline -> prevent accidental runs outside docker environment
        'before:offline:start': `${pluginsAssets}/scripts/check-dev-env.sh`,
        // Run before deployment -> prevent accidental runs outside docker environment
        'before:deploy:deploy': `\
          ${pluginsAssets}/scripts/check-dev-env.sh && \
          printf "\nDeployment starting...\n\n"
        `,
        // Run after deployment
        'after:deploy:finalize': 'printf "\nDeployment finished\n\n"',
      },
    },
  },

  // enables providing extra permissions for each lambda function individually
  'serverless-iam-roles-per-function': {},

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
