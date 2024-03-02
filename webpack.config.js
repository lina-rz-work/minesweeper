export default {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
    },
    module: {
		rules: [
			{
				use: 'ts-loader', // для обработки TypeScript файлов
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	watch: true,
}