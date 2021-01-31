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
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    /* 'import/no-extraneous-dependencies': 'off',
    camelcase: 'off', */
  },
  /* settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  }, */
};
