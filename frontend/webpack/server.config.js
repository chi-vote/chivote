const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const serverConfig = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: './src/render.js',
  output: {
    path: path.resolve(__dirname, '../bundles/server'),
    library: 'render',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react'
  },
  plugins: [
    new BundleTracker({
      filename: './bundles/webpack-stats-server.json'
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/server'), {
      root: path.resolve(__dirname, '..')
    })
  ],
  module: {
    rules: [{ test: /\.s?css$/, use: 'ignore-loader' }]
  }
});

module.exports = serverConfig;
