const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./base.config');

const serverConfig = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: {
    main: './src/render.js'
  },
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
    }),
    new MiniCssExtractPlugin({ filename: 'theme.[hash].css' })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: [/\.module\.s?css$/],
        use: 'ignore-loader'
      },
      {
        test: /\.scss$/,
        include: [/\.module\.s?css$/],
        use: [
          MiniCssExtractPlugin.loader,
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
              name: '[name].[ext]',
              emitFile: false,
              publicPath: '/static/dist/images'
            }
          }
        ]
      }
    ]
  }
});

module.exports = serverConfig;
