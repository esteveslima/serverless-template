const plugins = require('../pluginsList');

// TODO: GET FUCNCTIONS/PROVIDER IAMROLESTATEMENTS TO FILTER/RECOVER PLUGINS FROM SELECTION
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

// Filter out unused plugins
module.exports.getMatchingPlugins = (functions) => {
  const functionEvents = getFunctionsEvents(functions);

  const removedPlugins = (() => {
    const list = [];
    // Mark plugins to remove based on matching conditions
    if (!functionEvents.includes('http')) {
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

  const allPlugins = Object.keys(plugins);
  const matchingPlugins = allPlugins.filter((plugin) => !removedPlugins.includes(plugin));

  return matchingPlugins;
};

// Filter out potentially incompatible plugins
module.exports.getAllCompatiblePlugins = (functions) => {
  const functionEvents = getFunctionsEvents(functions);

  const removedPlugins = (() => {
    const list = [];
    // Mark plugins to remove based on compatibility conditions
    if (!functionEvents.includes('http')) {
      list.push('serverless-apigw-binary');
    }

    return list;
  })();

  const allPlugins = Object.keys(plugins);
  const compatiblePlugins = allPlugins.filter((plugin) => !removedPlugins.includes(plugin));

  return compatiblePlugins;
};
