const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const prodConfig = merge(baseConfig, {
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../bundles/prod/dist'),
    publicPath: '/static/dist/',
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[name]-[hash].bundle.js'
  },
  plugins: [
    new BundleTracker({ filename: '../bundles/webpack-stats.json' }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/prod'))
  ]
});

module.exports = prodConfig;
