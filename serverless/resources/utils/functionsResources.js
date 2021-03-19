/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-template-curly-in-string */

const { readdirSync, statSync } = require('fs');
const { join } = require('path');

// Get services' functions' resources definitions
const bundleServiceResources = (service) => {
  const rootPath = `${__dirname}/../../.././`;
  const servicePath = `project/services/${service}`;
  const configFileName = 'function.config.js';

  // Import function.config.js from folders of selected --service and bundle resources into an object
  const directoriesNames = readdirSync(servicePath).filter((f) => statSync(join(servicePath, f)).isDirectory());
  const definitionsList = directoriesNames.map((dirName) => {
    Object.keys(require.cache).forEach((key) => { delete require.cache[key]; }); // clearing modules cache to prevent repeating definitions
    const definition = require(`${rootPath}/${servicePath}/${dirName}/${configFileName}`);
    return definition;
  });
  const definitionsObject = definitionsList.reduce((acc, curr) => {
    const { resources = {} } = { ...curr };
    Object.keys(resources).forEach((resName) => { acc[resName] = curr.resources[resName]; });
    return acc;
  }, {});

  // console.log(definitionsObject);
  return definitionsObject;
};

module.exports.getResources = (service) => bundleServiceResources(service);
