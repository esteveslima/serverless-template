const bundleFunctions = require('./utils/bundle-functions');

// Get service functions' definitions
module.exports.getFunctions = (service) => {
  const functions = bundleFunctions(service);

  return functions;
};
