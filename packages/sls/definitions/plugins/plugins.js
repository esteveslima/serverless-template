// TODO...
// 'serverless-plugin-aws-alerts':{},
// 'serverless-prune-plugin':{},
// 'serverless-domain-manager':{},

// 'serverless-plugin-lambda-dead-letter':{},
// 'serverless-split-stacks': {},
// 'serverless-aws-documentation':{},
// 'serverless-reqvalidator-plugin':{},

// Importing each individual plugin default definition
const serverlessApiGatewayCaching = require('./list/serverless-api-gateway-caching');
const serverlessApiGatewayThrottling = require('./list/serverless-api-gateway-throttling');
const serverlessDynamodbLocal = require('./list/serverless-dynamodb-local');
const serverlessIamRolesPerFunction = require('./list/serverless-iam-roles-per-function');
const serverlessLocalstack = require('./list/serverless-localstack');
const serverlessOffline = require('./list/serverless-offline');
const serverlessOfflineDynamodbStreams = require('./list/serverless-offline-dynamodb-streams');
const serverlessOfflineScheduler = require('./list/serverless-offline-scheduler');
const serverlessOfflineSns = require('./list/serverless-offline-sns');
const serverlessOfflineSqs = require('./list/serverless-offline-sqs');
const serverlessPluginScripts = require('./list/serverless-plugin-scripts');
const serverlessS3Local = require('./list/serverless-s3-local');
const serverlessStackTerminationProtection = require('./list/serverless-stack-termination-protection');
const serverlessWebpack = require('./list/serverless-webpack');

// Predefined list of plugins with default configuration
// !!!  THE POSITION OF EACH PLUGIN IN THE LISTS IS RELEVANT  !!!

const allPlugins = { // This is the order reference
  ...serverlessWebpack,

  ...serverlessOfflineScheduler,
  ...serverlessS3Local,
  ...serverlessOfflineSns,
  // serverlessOfflineSqs,  // disabled
  ...serverlessDynamodbLocal,
  ...serverlessOfflineDynamodbStreams,
  ...serverlessOffline,

  ...serverlessIamRolesPerFunction,
  ...serverlessStackTerminationProtection,
  ...serverlessApiGatewayThrottling,
  ...serverlessApiGatewayCaching,

  // serverlessLocalstack,  // disabled
  ...serverlessPluginScripts,
};
const securityPlugins = {
  ...serverlessIamRolesPerFunction,
  ...serverlessStackTerminationProtection,
  ...serverlessApiGatewayThrottling,
};
const customizationPlugins = {
  ...serverlessApiGatewayCaching,
  ...serverlessPluginScripts,
};

module.exports = {
  // Exposing the plugins sets and lists
  sets: {
    allPlugins,
    securityPlugins,
    customizationPlugins,
  },

  // Helper methods to create the plugins names list and the plugins settings for 'custom' object
  pluginsList: (plugins) => Object.keys(plugins),
  pluginsCustoms: (plugins) => {
    const customs = Object.values(plugins).reduce((acc, curr) => {
      const [key, value] = [Object.keys(curr)[0], Object.values(curr)[0]];
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    return customs;
  },
};
