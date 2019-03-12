
"use strict";

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './client/src/index.js',
	module: {
		rules: [
			{	exclude: /node_modules/, test: /\.js$/, use: 'babel-loader' },
			{ test: /\.(png|jpg|gif|ico)$/, use: {loader: 'file-loader'}},
			{ 
				test: /\.(sass|scss|css)$/, 
				use: [
					process.env.NODE_ENV != 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './client/public/index.html'
		}),
		new MiniCssExtractPlugin()
	],
	devServer: {
		port: 3000
	}
};