const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    publicPath: '/static/dist/'
  },
  plugins: [new CleanWebpackPlugin(path.resolve(__dirname, 'static'))]
});
