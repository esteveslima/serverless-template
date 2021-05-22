const slsw = require('serverless-webpack');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const fs = require('fs');

// Using plugin to get sls variables
const { serviceDir } = slsw.lib.serverless || { serviceDir: '' }; // requires the result fallback due eslint conflicting with this file
const { isLocal } = slsw.lib.webpack || { isLocal: true };
const isTsProject = (() => {
  try {
    return fs.readdirSync(serviceDir).includes('tsconfig.json'); // testing only if has tsconfig file to consider it as a ts project
  } catch (err) { return false; }
})();

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: isLocal ? 'cheap-source-map' : 'source-map', // map bundle code for better debugging(cheap-source-map for local development build time)
  mode: isLocal ? 'none' : 'production', // production mode colapses and optimizes bundled code, 'none' does the minimum bundle for better visualization

  externals: [
    // selectively remove modules from bundle marking them as external...
    { 'aws-sdk': 'commonjs aws-sdk' }, // removing aws-sdk from output bundle
    //
    // ... or make all modules external(fixing all conflicts, but making deployment possibly larger)
    // nodeExternals(),
  ],

  module: {
    rules: [
      // transcompile code to a compatible version using babel(allow new js features)
      {
        test: /\.(m?j|t)s$/,
        exclude: /node_modules/,
        include: `${serviceDir}/src`, // TODO: check if this optimize build time (maybe use fork-ts-checker-webpack-plugin npm package)
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.js'), // Using configurations' package unique babel config file
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
      {
        exclude: /^.*\.(test|mock).(j|t)s$/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    libraryTarget: 'commonjs2', // TODO: change to the latest output version possible(node14.x)
    path: `${serviceDir}/.temp/.webpack`, // Set output bundle to the service folder(.temp)
    filename: '[name].js',

    // vscode debugger resolution for breakpoints in original files
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },

  plugins: [
    ...(isLocal ? [
      // Only local plugins

      // generates html report in bundle folder
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),

    ] : [
      // Only non local plugins

    ]),
    // General plugins

    // Runs typescript type checking in a separate process("enabling" type checking with babel-loader)
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: isTsProject ? 'tsconfig.json' : path.resolve(__dirname, 'tsconfig.json'), // Using configurations' tsconfig file if service doesn't have its own
      },
    }),
  ],

  // Project/File won't be properly tree shaken unless explicitelly marked as side-effect free in package.json
  // Imported files/modules that makes some configurations/changes to a global scope should be avoided or marked with side-effects
  // A proper module should be like a pure function, with changes affecting only local scope with predictable output: the exported resource/function/module
  // References:
  // https://webpack.js.org/guides/tree-shaking/
  // https://bluepnume.medium.com/javascript-tree-shaking-like-a-pro-7bf96e139eb7
  // https://medium.com/@craigmiller160/how-to-fully-optimize-webpack-4-tree-shaking-405e1c76038#:~:text=Just%20because%20Webpack%20can't,important%20impact%20on%20the%20application.&text=A%20file%20with%20side%20effects,the%20application%20as%20a%20whole.
  // https://stackoverflow.com/questions/41127479/es6-import-for-side-effects-meaning#:~:text=A%20module%20with%20side%2Deffects,forces%20(non%20pure%20function)
  optimization: {
    usedExports: true, // for initial unused code detection
    sideEffects: true, // enables webpack to search for sideEffects definitions(if this brings problems to the bundle code, disable package sideEffects by returning it's value to "true")

    emitOnErrors: false, // prevent generating files with errors(useful for typescript type checking, PS: offline server may still start)
  },

};
