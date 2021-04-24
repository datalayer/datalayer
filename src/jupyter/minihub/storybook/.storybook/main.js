module.exports = {
	stories: [
		'../src/**/*.story.@(tsx|mdx)'
	],
	addons: [
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
