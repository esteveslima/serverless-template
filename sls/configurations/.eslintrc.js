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
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'import/no-extraneous-dependencies': 'off',  // TODO: check if this is the rule to help prevent problems with versions in imports in monorepo
    // camelcase: 'off',
  },
  // settings: {
  //   'import/resolver': {
  //     // webpack: {
  //     //   config: 'webpack.config.js',
  //     // },
  //     // // alias: {
  //     // //   map: [
  //     // //     ['@', '/'],
  //     // //   ],
  //     // //   extensions: ['.js', '.jsx'/* , '.ts', '.tsx' */],
  //     // // },
  //   },
  // },
};
