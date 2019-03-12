const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: './src/client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      Assets: path.resolve(__dirname, '../src/assets/'),
      Components: path.resolve(__dirname, '../src/components/'),
      Public: path.resolve(__dirname, '../public/'),
      Theme: path.resolve(__dirname, '../src/theme/'),
      Root: path.resolve(__dirname, '../src/')
    }
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
};
