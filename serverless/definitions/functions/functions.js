const bundleFunctions = require('./utils/bundleFunctions');

// Get service functions' definitions
module.exports.getFunctions = (service) => {
  const functions = bundleFunctions(service);

  return functions;
};
