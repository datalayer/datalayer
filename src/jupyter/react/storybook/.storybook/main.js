//         sourceLoaderOptions: null,
module.exports = {
	stories: ['../src/**/*.(story|stories).(js|jsx|ts|tsx|mdx)'],
	core: {
		builder: "webpack5",
	},
	addons: [
		{
			name: '@storybook/addon-actions',
		},
		{
			name: '@storybook/addon-controls',
		},
		{
			name: '@storybook/addon-links',
		},
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
				babelOptions: {},
				sourceLoaderOptions: null,
			},
		},
	],
};
