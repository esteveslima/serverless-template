const bundleResources = require('./utils/bundleResources');

// Get stack resources
module.exports.getResources = (service) => {
  const resources = {
    ...bundleResources(service),
  };

  // set some extra resources...

  return resources;
};
