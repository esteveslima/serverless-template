// const path = require('path');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'max-len': 'off',
    'no-unused-vars': 'off',

    // TODO: check if this is the rule to help prevent problems with versions in imports in monorepo
    'import/no-extraneous-dependencies': 'error',
  },
  settings: {
    'import/internal-regex': '^@sls/', // Resolving errors from no-extraneous-dependencies for the monorepo packages
  },
};
