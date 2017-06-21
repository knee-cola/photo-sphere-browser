const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

// during the development phase the App is located inside the "dist" folde runder project folder
// while in production env it's placed in root folder
const projectPath = '/photo-sphere-browser/';
const publicPath = process.argv.indexOf('-p') !== -1 ? '/' : projectPath+'dist/';

module.exports = {
	// Defining JavaScript files, which act as entry points to application
	// > usually each is responsible for a separate sub-page
	// > Values listed here are used in [plugin] section, where we link subpages
	//   to coresponding entry points - search for [excludeChunks] & [chunks]
	entry: {
		app: './src/app.js'
	},
	output: {
		// here we need to set an absolute path - we're resolve path at runtime
		path: path.resolve(__dirname, 'dist'),
		// by specifying the [publicPath],
		// all JS and CSS files are linked
		// via absolute path (not relative)
		publicPath: publicPath,
		filename: '[name].bundle.js' // the [name] will be replaced by the name of entry JavaScript File
	},
	module: {
		rules: [
			{
				// this [test] is applied to [require] statements in [app.js] file
				// ... so CSS needs to be required from JavaScript in order for WebPack to procerss it
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					// in case the ExtractTextPlugin doesn't  extract the CSS,
					// then the output of 'css-loader' will be forwarded to
					// to fallback loader
					fallback: 'style-loader',
					use: [
						// loaders are execure starting from bottom - the last in the list
						'css-loader', // translates CSS into CommonJS  
						'sass-loader' // compiles Sass to CSS 
					]
				})
			},
			// all JS files should be processed by Babel
			{
				test: /\.js$/,
				exclude: /node_modules/, // skip the Node modules loader
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?outputPath=img/&publicPath='+publicPath+'&hash=sha512&digest=hex&name=[name].[ext]?[hash]',
					// ne želim da mi image loader radi bilo kakvu optimizaciju slika
					// > sve je već unaprijed optimizirano
					// 'image-webpack-loader?bypassOnDebug' // &optimizationLevel=7&interlaced=false
				]
			},
			{
				// the following line makes webpack copy varius files required from app.js
				// into the output folder
				test: /\.(ashx|config)$/i,
				use: [
					'file-loader?name=[name].[ext]?[hash]'
				]
			}
		]
	},
	plugins: [
		// Generates index.html based on the given template
		new HtmlWebpackPlugin({
			title: "This title is set from config file",
			template: './src/index.ejs',  // load a custom template
			minify: {
				// collapseWhitespace: true
			},
			hash: true // cache busting for JS and CSS files - a hash will be added to after ".js" and ".css"
		}),
		new ExtractTextPlugin({
			filename:"app.css", // here we configure how the resulting CSS file will be named
			disable: false,
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'BASE_URL': JSON.stringify(publicPath)
		})
	]
}