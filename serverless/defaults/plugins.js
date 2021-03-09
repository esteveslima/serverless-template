/* eslint-disable no-template-curly-in-string */
// List of every plugin with its custom configuration(the items order is relevant)
const pluginsDefinitions = {
  // plugin to bundle only necessary code from service functions(must be the first on the list)
  'serverless-webpack': {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
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
    'serverless-offline-sns': {
      port: '4001',
      accountId: '{ "Ref" : "AWS::AccountId" }',
    },
  },

  //
  'serverless-offline-scheduler': {},

  // plugin to locally debug with api gateway
  'serverless-offline': {
    'serverless-offline': {
      httpsProtocol: './resources/local-ssl-tls',
      host: '0.0.0.0', // binding to special address to make "offline" server reachable from outside docker network
      httpPort: '4000',
    },
  },

  // REQUIRES DOWNGRADE TO serverless@2.4.0, UPGRADE TO @NEXT and disable configValidationMode
  'serverless-iam-roles-per-function': {},

  // plugin to allow returning binary data throught API Gateway(it will throw an error if there is a non http triggered function in the service deploy)
  'serverless-apigw-binary': {
    apigwBinary: {
      types: [
        'image/jpeg',
        'text/html',
        'application/pdf',
        'application/vnd.ms-excel'],
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

// Get only plugins names list
const pluginsList = () => Object.keys(pluginsDefinitions);

// Get only plugins configs from the definitions(config from unused plugins doesn't interfeer)
const pluginConfigurations = () => {
  const pluginsConfigs = Object.values(pluginsDefinitions).reduce((acc, curr) => {
    if (Object.keys(curr).length === 0) return acc;
    const [configKey, configProps] = [Object.keys(curr)[0], Object.values(curr)[0]];
    acc[configKey] = configProps;
    return acc;
  }, {});

  return pluginsConfigs;
};

//

module.exports.pluginsCustomConfig = pluginConfigurations;

module.exports.getAllPlugins = pluginsList;

// Filter out potentially incompatible plugins
module.exports.getAllCompatiblePlugins = (functions) => {
  const configuredEvents = Object.keys(functions).reduce((acc, curr) => {
    const functionEvents = functions[curr].events;
    functionEvents.forEach((event) => {
      const functionEvent = Object.keys(event)[0];
      if (!acc.includes(functionEvent)) acc.push(functionEvent);
    });
    return acc;
  }, []);

  const compatiblePlugins = pluginsList();

  // Remove plugins based on conditions
  if (!configuredEvents.includes('http') && !configuredEvents.includes('httpApi')) {
    const plugin = 'serverless-apigw-binary';
    const pluginPosition = compatiblePlugins.indexOf(plugin);
    if (pluginPosition !== -1) compatiblePlugins.splice(pluginPosition, 1);
  }

  return compatiblePlugins;
};

// Filter out unused plugins
module.exports.getMatchingPlugins = (functions) => {
  const configuredEvents = Object.keys(functions).reduce((acc, curr) => {
    const functionEvents = functions[curr].events;
    functionEvents.forEach((event) => {
      const functionEvent = Object.keys(event)[0];
      if (!acc.includes(functionEvent)) acc.push(functionEvent);
    });
    return acc;
  }, []);

  const matchingPlugins = pluginsList();

  // Remove plugins based on conditions
  if (!configuredEvents.includes('http') && !configuredEvents.includes('httpApi')) {
    const plugin = 'serverless-apigw-binary';
    const pluginPosition = matchingPlugins.indexOf(plugin);
    if (pluginPosition !== -1) matchingPlugins.splice(pluginPosition, 1);
  }
  if (!configuredEvents.includes('sns')) {
    const plugin = 'serverless-offline-sns';
    const pluginPosition = matchingPlugins.indexOf(plugin);
    if (pluginPosition !== -1) matchingPlugins.splice(pluginPosition, 1);
  }
  if (!configuredEvents.includes('sqs')) {
    const plugin = 'serverless-offline-sqs';
    const pluginPosition = matchingPlugins.indexOf(plugin);
    if (pluginPosition !== -1) matchingPlugins.splice(pluginPosition, 1);
  }

  return matchingPlugins;
};
