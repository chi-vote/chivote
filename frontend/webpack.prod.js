const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'app/static/dist'),
    publicPath: '/static/dist/'
  },
  plugins: [new CleanWebpackPlugin(['app/static/dist'])]
});
