/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const { readdirSync, statSync } = require('fs');
const { join } = require('path');

module.exports = (service) => {
  const rootPath = `${__dirname}/../../.././`;
  const servicePath = `project/services/${service}`;
  const configFileName = 'function.config.js';

  // Import function.config.js from folders of selected --service and bundle definitions into an object
  const directoriesNames = readdirSync(servicePath).filter((f) => statSync(join(servicePath, f)).isDirectory());
  const definitions = directoriesNames.map((dirName) => {
    Object.keys(require.cache).forEach((key) => { delete require.cache[key]; }); // clearing modules cache to prevent repeating definitions
    const definition = require(`${rootPath}/${servicePath}/${dirName}/${configFileName}`);
    return definition;
  });

  return definitions;
};
