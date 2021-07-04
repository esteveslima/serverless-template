/* eslint-disable no-template-curly-in-string */
const path = require('path');
// The paths references in properties are from the project folder scope(not the monorepo root folder), because this file will be imported and used as boilerplate
const pluginsAssets = path.resolve(`${__dirname}/../assets`); // absolute path to definitions package plugin assets
const serviceTempDir = '.temp/'; // service's relative path to custom temp files folder
// Beware that the position of this plugin in the plugins list may be relevant

module.exports = {
  // run scripts with serverless commands/hooks(TODO: fix -> not working when running sls offline directly from node_modules for vscode debugger)
  'serverless-plugin-scripts': { // TODO: migrate to serverless-scriptable-plugin (?)
    scripts: {
      commands: {
        checkdeploystage: `${pluginsAssets}/scripts/check-deploy-stage.sh`,
      },
      hooks: { // See some serverless hooks: export SLS_DEBUG=* or https://gist.github.com/HyperBrain/50d38027a8f57778d5b0f135d80ea406 and https://gist.github.com/MikeSouza/b9d2c89aec768a8871c8778f530cf4ab
        // Run before offline -> prevent accidental runs outside docker environment
        'before:offline:start': `${pluginsAssets}/scripts/check-dev-env.sh`,
        // Run before deployment -> prevent accidental runs outside docker environment
        'before:deploy:deploy': `\
          ${pluginsAssets}/scripts/check-dev-env.sh && \
          printf "\nDeployment starting...\n\n"
        `,
        // Run after deployment
        'after:deploy:finalize': 'printf "\nDeployment finished\n\n"',
      },
    },
  },
};
