const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const serverConfig = merge(baseConfig, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../bundles/server')
  },
  plugins: [
    new BundleTracker({
      filename: './bundles/webpack-stats-server.json'
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/server'), {
      root: path.resolve(__dirname, '..')
    })
  ]
});

module.exports = serverConfig;
