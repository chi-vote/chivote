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
    new BundleTracker({ filename: './bundles/webpack-stats.json' }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/dev'), {
      root: path.resolve(__dirname, '..')
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /\.module\.s?css$/
      },
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[folder]__[local]___[hash:base64:5]',
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  }
});

module.exports = devConfig;
