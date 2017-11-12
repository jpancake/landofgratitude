const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		bundle: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:3050/',
			'webpack/hot/dev-server',
			'babel-polyfill',
			'font-awesome-sass-loader!font-awesome.config.js',
			'script-loader!jquery/dist/jquery.min.js',
			'script-loader!tether/dist/js/tether.min.js',
			'script-loader!bootstrap/dist/js/bootstrap.min.js',
			'index',
		]
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js'
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src-client')],
		extensions: ['.js', '.jsx', '.sass'],
		mainFiles: ['index', 'configureStore', 'index_styles', 'reducers'],
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: 'pug-loader',
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(sass|scss)$/,
				loaders: ['style-loader', 'css-loader',
					{
						loader: 'sass-loader',
						query: {
							includePaths: [
								path.resolve(__dirname, 'node_modules/bootstrap/scss'),
								path.resolve(__dirname, 'node_modules/font-awesome/scss'),
								path.resolve(__dirname, 'node_modules/font-awesome')
							]
						}
					}]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/font-woff'
						}
					}
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{ loader: 'file-loader' }
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src-client/views/template.pug',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map'
}
