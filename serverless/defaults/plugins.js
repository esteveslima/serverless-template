// List of every plugin with its custom configuration(the items order is relevant)
const pluginsConfig = {
  // plugin to bundle only necessary code from service functions(must be the first on the list)
  'serverless-webpack': {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // config serverless offline sns plugin(must come before offline server)
  'serverless-offline-sns': {
    'serverless-offline-sns': {
      port: '4001',
      accountId: '{ "Ref" : "AWS::AccountId" }',
    },
  },
  // config serverless offline sqs plugin(must come before offline server)
  'serverless-offline-sqs': {
    'serverless-offline-sqs': {
      autoCreate: true,
      // apiVersion: '2012-11-05',
      endpoint: 'queue-container:9324',
      // region: '${self:provider.region}',
      // accessKeyId: 'root',
      // secretAccessKey: 'root',
      skipCacheInvalidation: true,
    },
  },
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
  // 'serverless-domain-manager':{},
  // 'serverless-localstack':{},
  // 'serverless-plugin-conditional-functions':{},
  // 'serverless-plugin-ifelse':{},
  // 'serverless-pseudo-parameters':{},
  // 'serverless-plugin-aws-alerts':{},
  // 'serverless-prune-plugin':{},
  // 'serverless-plugin-lambda-dead-letter':{},
  // 'serverless-offline-scheduler':{},
  // 'serverless-plugin-scripts':{},
  // 'serverless-offline-scheduler':{},
};

// Default plugins names
const defaultPlugins = [
  'serverless-webpack',
  'serverless-offline',
  'serverless-iam-roles-per-function',
];

// Get all plugins' configurations for the "custom" property(config from unused plugins doesn't interfeer)
module.exports.pluginsConfigurations = () => {
  const customConfig = Object.values(pluginsConfig).reduce((acc, curr) => {
    const [configKey, configProps] = [Object.keys(curr)[0], Object.values(curr)[0]];
    acc[configKey] = configProps;
    return acc;
  }, {});

  return customConfig;
};

// Returns plugins list
module.exports.getPlugins = (/* service */) => {
  // const plugins = Object.keys(pluginsConfig);    // sqs offline plugin is conflicting
  const plugins = defaultPlugins;
  return plugins;
};
