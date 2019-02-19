const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const devConfig = merge(baseConfig, {
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../bundles/dev'),
    publicPath: 'http://localhost:3000/static/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({ filename: '../bundles/webpack-stats.json' }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/dev'))
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3000
  }
});

module.exports = devConfig;
