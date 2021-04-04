const { getServiceFunctionsDefinitions } = require('../../../tools/tools');

// Bundle service functions' from definitions into an object
module.exports = (service) => {
  const definitions = getServiceFunctionsDefinitions(service);

  const functionsDefinitionsObject = definitions.reduce((acc, curr) => {
    const func = { ...curr };
    delete func.resources; // remove non-function definitions
    // delete func['']
    // ...
    if (Object.keys(func).length > 1) throw new Error(`More than one function specified: ${Object.keys(func)}`); // TODO: function name has to be the name of its folder?
    Object.keys(func).forEach((f) => { acc[f] = curr[f]; });
    return acc;
  }, {});

  const servicePath = `project/services/${service}`;
  // automatically sets default definitions
  Object.keys(functionsDefinitionsObject).forEach((func) => {
    functionsDefinitionsObject[func].handler = `${servicePath}/${func}/src/handler.default`; // set handler path
    // TODO: automatically set role and dependson for resources from definitions
  });

  return functionsDefinitionsObject;
};
