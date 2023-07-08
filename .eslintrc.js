module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'universe/native',
		'universe/shared/typescript-analysis',
		'plugin:react-native-a11',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.d.ts'],
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	],
};
