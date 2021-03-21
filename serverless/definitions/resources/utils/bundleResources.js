const { getServiceFunctionsDefinitions } = require('../../../tools/tools');

// Bundle service functions' resources from functions definitions into an object
module.exports = (service) => {
  const definitions = getServiceFunctionsDefinitions(service);

  const resourcesDefinitionsObject = definitions.reduce((acc, curr) => {
    const { resources = {} } = { ...curr };
    Object.keys(resources).forEach((resourceName) => { acc[resourceName] = curr.resources[resourceName]; });
    return acc;
  }, {});

  return resourcesDefinitionsObject;
};
