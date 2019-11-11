const isProduction = process.env.NODE_ENV === 'production';

export default {
	target: 'node',
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
	node: {
		__dirname: false,
		__filename: false,
	},
	optimization: {
		nodeEnv: false,
	},
	entry: './src/server',
	output: {
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
