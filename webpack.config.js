/* eslint-disable max-len */
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const npmPackage = require('./package.json');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map', // map bundle code for better debugging
  mode: 'none', // 'production' // set to 'production' to colapse bundled code
  externals: [
    // selectively remove modules from bundle marking them as external...
    // { 'aws-sdk': 'commonjs aws-sdk' }, // remove aws-sdk from output bundle
    //
    // ... or make all modules external(fixing all conflicts, but making deployment possibly larger)
    // nodeExternals(),
  ],

  module: {
    rules: [
      // transcompile code to a compatible version(cloud supported node version)...
      // ... allowing to use new js features while being compatible
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                    node: '12',
                  },
                },
              ],
            ],
            // plugins: [
            //   '@babel/plugin-transform-runtime',
            // ],
          },
        },
      },
      // include extra files with original path directory(when imported)
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader', // npm package required
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

  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },

  // ---------------------testing path alias---------------------------
  resolve: {
    extensions: ['.ts', '.js'],
    // alias: {
    //   root: path.resolve(__dirname, '/'),
    // },
  },
  /* resolve: {
    root: __dirname,
    alias: npmPackage.moduleAliases || {},
    modules: npmPackage.moduleDirectories || [],
  }, */

};
