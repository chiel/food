import CSSPlugin from '@modular-css/webpack/plugin';
import postcssColorFunction from 'postcss-color-function';
import postcssImport from 'postcss-import';
import postcssInlineSVG from 'postcss-inline-svg';
import postcssNested from 'postcss-nested';

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
			{
				test: /\.css$/,
				use: {
					loader: '@modular-css/webpack/loader',
					options: {
						namedExports: false,
					},
				},
			},
		],
	},
	plugins: [
		new CSSPlugin({
			css: 'assets/app.css',
			map: { inline: false },
			after: [
				postcssImport(),
				postcssNested,
				postcssColorFunction,
				postcssInlineSVG(),
			],
		}),
	],
};
