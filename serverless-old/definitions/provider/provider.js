const aws = require('./defaults/aws');

const providers = {
  aws,
};

module.exports.getProvider = (cloud, stage, config) => {
  const configCopy = config;
  Object.keys(configCopy).forEach((prop) => (configCopy[prop] === undefined ? delete configCopy[prop] : {})); // Remove unset configurations
  const provider = { ...providers[cloud], ...configCopy }; // Replace provider default config properties

  provider.stage = stage;

  return provider;
};
