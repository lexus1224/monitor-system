var path = require('path');

module.exports = {
	entry: './app/src/index.js',
	
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './app/dist'),
	},
	
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: path.resolve(__dirname, 'node_modules'),
			include: path.resolve(__dirname, 'app/dist'),
			query: {
				presets: ['es2015']
			}
		}]
	},
	
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
		},
		contentBase: path.join(__dirname, './app/dist'),
		compress: false,
		hot: true
	}
}
