/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-template-curly-in-string */

const { readdirSync, statSync } = require('fs');
const { join } = require('path');

// Get services' function definitions
const bundleServiceFunctions = (service) => {
  const rootPath = `${__dirname}/../.././`;
  const servicePath = `project/services/${service}`;
  const configFileName = 'function.config.js';

  // Import function.config.js from folders of selected --service and bundle into an object
  const directoriesNames = readdirSync(servicePath).filter((f) => statSync(join(servicePath, f)).isDirectory());
  const functionsList = directoriesNames.map((dirName) => require(`${rootPath}/${servicePath}/${dirName}/${configFileName}`));
  const functionsObject = functionsList.reduce((acc, curr) => {
    Object.keys(curr).forEach((func) => { acc[func] = curr[func]; });
    return acc;
  }, {});

  // automatically sets default definitions
  Object.keys(functionsObject).forEach((func) => {
    functionsObject[func].handler = `${servicePath}/${func}/src/handler.lambdaFunction`; // set handler path
  });

  return functionsObject;
};

module.exports.getFunctions = (service) => bundleServiceFunctions(service);
