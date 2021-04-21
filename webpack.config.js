/* eslint-disable max-len */
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const npmPackage = require('./package.json');

const { isLocal } = slsw.lib.webpack;
console.log(__dirname);
module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map', // map bundle code for better debugging
  mode: isLocal ? 'none' : 'production', // production mode colapses bundled code, 'none' keep bundled file identation for better visualization
  externals: [
    // selectively remove modules from bundle marking them as external...
    // { 'aws-sdk': 'commonjs aws-sdk' }, // remove aws-sdk from output bundle
    //
    // ... or make all modules external(fixing all conflicts, but making deployment possibly larger)
    // nodeExternals(),
  ],
  module: {
    rules: [
      // transcompile code to a compatible version using babel(allow new js features)
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },
      // include extra files with original path directory(when imported)
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      // remove files from bundle
      /* {
        exclude: /^.*\.(test).(js)$/,
      }, */
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',

    // vscode debugger resolution for breakpoints in original files
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },

};
