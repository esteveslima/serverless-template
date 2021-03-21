const bundleResources = require('./utils/bundle-resources');

// Get stack resources
module.exports.getResources = (service) => {
  const resources = {
    ...bundleResources(service),
  };

  // set some extra resources...

  return resources;
};
