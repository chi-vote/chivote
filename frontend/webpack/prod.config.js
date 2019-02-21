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
    new BundleTracker({ filename: './bundles/webpack-stats.json' }),
    new CleanWebpackPlugin(path.resolve(__dirname, '../bundles/prod'), {
      root: path.resolve(__dirname, '..')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: [/\.module\.s?css$/],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.scss$/,
        include: [/\.module\.s?css$/],
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

module.exports = prodConfig;
