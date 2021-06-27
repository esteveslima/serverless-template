/* eslint-disable no-template-curly-in-string */

// Deploy this stack independently using the flag '--config <path/filename>' to select this file on serverless CLI command

// Dedicated stack used exclusevelly for infrastructure deployment, this approach grants safier environments on updating CloudFormation resources
// The outputs from this stack can be recovered as variables in other stacks

const { provider: { aws }, plugins: { allPlugins, pluginsCustoms } } = require('@sls/definitions');

const serviceName = __dirname.split('/').slice(-1)[0]; // Using project folder name as service name
const infraServiceName = `${serviceName}-infra`; // suffixing with 'infra'(final name becomes: {serviceName}-infra-{stage})

module.exports = {
  service: infraServiceName,

  frameworkVersion: '^2',
  useDotenv: true,
  variablesResolutionMode: 20210219, // DEPRECATION_RESOLUTION - new variables resolutions upcoming in v3
  configValidationMode: 'warn',

  provider: { ...aws },

  // // Create the stack's infraestructure resources and set the custom outputs available to be fetched from other stacks(stage required to make exported names unique)
  // // Using a DeletionPolicy could also be a good idea to protect sensitive data.
  // resources: {
  //   Resources: {

  //   },

  //   // // //

  //   Outputs: {

  //   },
  // },
};
