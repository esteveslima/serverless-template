/* eslint-disable no-template-curly-in-string */

// List of every plugin with its custom configuration(the items order is relevant)
const pluginsDefinitions = {
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
        port: '4001',
        accountId: '{ "Ref" : "AWS::AccountId" }',
      },
    },
  },

  // must come before offline server
  'serverless-s3-local': { // TODO: SCRIPT TO AUTOMATICALLY UPLOAD FILE THROUGHT AWS-SDK WITH DRAG-DROP FILES IN BUCKET FOLDER
    custom: {
      s3: {
        host: 'localhost',
        port: '4569',
        httpsProtocol: './resources/local-ssl-tls',
        directory: './.s3-local-bucket',
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
    },
    resources: {
      Resources: {
        NewResource: {
          Type: 'AWS::S3::Bucket',
          Properties: {
            BucketName: 'local-bucket',
          },
        },
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

  // REQUIRES DOWNGRADE TO serverless@2.4.0, UPGRADE TO @NEXT and disable configValidationMode
  'serverless-iam-roles-per-function': {
    custom: {},
  },

  // plugin to allow returning binary data throught API Gateway(it will throw an error if there is a non http triggered function in the service deploy)
  'serverless-apigw-binary': {
    custom: {
      apigwBinary: {
        types: [
          'image/jpeg',
          'text/html',
          'application/pdf',
          'application/vnd.ms-excel'],
      },
    },
  },

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
};

//
//
//

const pluginsList = () => Object.keys(pluginsDefinitions);

const bundleConfigObject = (objectsList/* , configType */) => {
  // const filteredObjectsList = Object.values(objectsList).filter((obj) => obj[configType]).map((obj) => obj[configType]);
  const bundleObject = objectsList.reduce((acc, curr) => {
    const [objKey, objProps] = [Object.keys(curr)[0], Object.values(curr)[0]];
    acc[objKey] = objProps;
    return acc;
  }, {});

  return bundleObject;
};
// Get only plugins custom configs from the definitions(config from unused plugins doesn't interfeer)
const pluginCustoms = () => {
  const custom = Object.values(pluginsDefinitions).filter((plugin) => plugin.custom).map((plugin) => plugin.custom);
  const pluginsConfigs = bundleConfigObject(custom);

  return pluginsConfigs;
};
// Get only plugins resources configs from the definitions
const pluginResources = () => {
  const resources = Object.values(pluginsDefinitions).filter((plugin) => plugin.resources).map((plugin) => plugin.resources);
  const pluginsConfigs = bundleConfigObject(resources);

  return pluginsConfigs;
};

const getFunctionsEvents = (functions) => {
  const configuredEvents = Object.keys(functions).reduce((acc, curr) => {
    const functionEvents = functions[curr].events;
    functionEvents.forEach((event) => {
      const functionEvent = Object.keys(event)[0];
      if (!acc.includes(functionEvent)) acc.push(functionEvent);
    });
    return acc;
  }, []);

  return configuredEvents;
};
// TODO: GET FUCNCTIONS/PROVIDER IAMROLESTATEMENTS TO FILTER/RECOVER PLUGINS FROM SELECTION

//
//
//

// Filter out unused plugins
module.exports.getMatchingPlugins = (functions) => {
  const functionEvents = getFunctionsEvents(functions);

  const removedPlugins = (() => {
    const list = [];
    // Mark plugins to remove based on matching conditions
    if (!functionEvents.includes('http') && !functionEvents.includes('httpApi')) {
      list.push('serverless-apigw-binary');
    }
    if (!functionEvents.includes('schedule')) {
      list.push('serverless-offline-scheduler');
    }
    if (!functionEvents.includes('sns')) {
      list.push('serverless-offline-sns');
    }
    if (!functionEvents.includes('sqs')) {
      list.push('serverless-offline-sqs');
    }
    if (!functionEvents.includes('s3')) {
      list.push('serverless-s3-local');
    }

    return list;
  })();

  const allPlugins = pluginsList();
  const matchingPlugins = allPlugins.filter((plugin) => !removedPlugins.includes(plugin));

  return matchingPlugins;
};

// Filter out potentially incompatible plugins
module.exports.getAllCompatiblePlugins = (functions) => {
  const functionEvents = getFunctionsEvents(functions);

  const removedPlugins = (() => {
    const list = [];
    // Mark plugins to remove based on compatibility conditions
    if (!functionEvents.includes('http') && !functionEvents.includes('httpApi')) {
      list.push('serverless-apigw-binary');
    }

    return list;
  })();

  const allPlugins = pluginsList();
  const compatiblePlugins = allPlugins.filter((plugin) => !removedPlugins.includes(plugin));

  return compatiblePlugins;
};

module.exports.getAllPlugins = pluginsList;

module.exports.pluginsResourcesConfig = pluginResources;

module.exports.pluginsCustomConfig = pluginCustoms;
