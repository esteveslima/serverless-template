const path = require('path');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false, // fix @babel/eslint-parser error with eslint-plugin-import
    babelOptions: {
      configFile: path.resolve(__dirname, 'babel.config.js'), // Using configurations' package babel config file
    },
  },
  // ESLINT PLUGINS NOT WORKING IN MONOREPO?
  // plugins: [
  //   '@babel/plugin-proposal-class-properties', ---> using directly from babel.config.js file
  // ],
  // root: true,
  rules: {
    'max-len': 'off',
    'no-unused-vars': 'off',

    // TODO: check if this is the rule to help prevent problems with versions in imports in monorepo
    'import/no-extraneous-dependencies': 'error', // should prevent dependency versions incompatibility by prohibiting to use external dependencies(root node_modules)
  },
  settings: {
    // TODO: check if it would be required to install these shared packages and stop using this setting
    'import/internal-regex': '^@sls/', // Resolving errors from no-extraneous-dependencies for the monorepo packages
  },
};
