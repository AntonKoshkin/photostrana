const path						= require('path');
const webpack					= require('webpack');

const CleanWebpackPlugin	= require('clean-webpack-plugin');
const CopyWebpackPlugin		= require('copy-webpack-plugin');
const HtmlWebpackPlugin		= require('html-webpack-plugin');

const CONFIG = {
	entry : './src/app',
	output: {
		path      : path.join(__dirname, 'dist'),
		filename  : 'bundle.js',
		publicPath: '/',
	},

	devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader : 'eslint-loader',
			}, {
				test   : /\.js$/,
				exclude: /node_modules/,
				loader : 'babel-loader',
			}, {
				test   : /\.css$/,
				exclude: /(node_modules)/,
				use    : [
					'style-loader',
					'css-loader',
					{
						loader : 'postcss-loader',
						options: {sourceMap: 'inline'},
					}
				],
			}
		],
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({BUNDLE: JSON.stringify(process.env.BUNDLE)}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: process.env.BUNDLE === 'static' ? './src/index.static.html' : './src/index.html',
			path    : 'dist',
			filename: 'index.html',
			inject  : false,
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/style.css',
				to  : 'style.css',
			}, {
				from: 'src/img',
				to  : 'img',
			}
		])
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress   : true,
		port       : 7777,
		overlay    : {errors: true},

		watchContentBase: true,
	},
};

module.exports = CONFIG;
