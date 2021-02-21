/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-template-curly-in-string */

const { readdirSync, statSync } = require('fs');
const { join } = require('path');

// Autoimport every individual function.config.js from folders of selected --service
const getAllFunctionsDefinitions = (service) => {
  const rootPath = `${__dirname}/../.././`;
  const servicePath = `project/services/${service}`;
  const configFileName = 'function.config.js';

  const directoriesNames = readdirSync(servicePath).filter((f) => statSync(join(servicePath, f)).isDirectory());
  const definitionsList = directoriesNames.map((dirName) => require(`${rootPath}/${servicePath}/${dirName}/${configFileName}`)); // import definitions from files
  // convert definitions list to object and automatically set handler path
  const definitionsObject = definitionsList.reduce((acc, curr) => {
    Object.keys(curr).forEach((func) => {
      acc[func] = curr[func];
      acc[func].handler = `${servicePath}/${func}/src/handler.lambdaFunction`; // set handler path
    });
    return acc;
  }, {});

  const definitions = definitionsObject;

  return definitions;
};

// Service functions definitions
module.exports.getFunctions = (service) => {
  const functions = getAllFunctionsDefinitions(service);

  // some filter for functions...

  return functions;
};
