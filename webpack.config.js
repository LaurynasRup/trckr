const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		home: './src/js/Home/home.js',
		leagues: './src/js/Leagues/leagues.js',
		login: './src/js/Login/login.js',
		signup: './src/js/Signup/signup.js',
		logout: './src/js/Logout/logout.js',
		index: './src/js/Index/index.js',
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	// Where to take file and bundle
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
	},
	devServer: {
		contentBase: './dist', // From where webpack should serve the file
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'home.html',
			template: './src/html/home.html',
			chunks: ['home'],
		}),
		new HtmlWebpackPlugin({
			filename: 'leagues.html',
			template: './src/html/leagues.html',
			chunks: ['leagues'],
		}),
		new HtmlWebpackPlugin({
			filename: 'login.html',
			template: './src/html/login.html',
			chunks: ['login'],
		}),
		new HtmlWebpackPlugin({
			filename: 'signup.html',
			template: './src/html/signup.html',
			chunks: ['signup'],
		}),
		new HtmlWebpackPlugin({
			filename: 'logout.html',
			template: './src/html/logout.html',
			chunks: ['logout'],
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			chunks: ['index'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
};
