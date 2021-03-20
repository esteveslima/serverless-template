const { getResources } = require('./utils/functionsResources');

// Set stack resources
module.exports.getResources = (service) => {
  const resources = {
    ...getResources(service),
  };

  // set some extra resources...

  return resources;
};
