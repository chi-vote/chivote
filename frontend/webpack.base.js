const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
	context: path.resolve(__dirname, 'app'),
	entry: ['./src/index'],
	output: {
		filename: '[name]-[hash].js'
	},
	plugins: [new BundleTracker({ filename: './webpack-stats.json' })],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx']
	}
};
