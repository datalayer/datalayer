import React from "react";

import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { configure } from '@storybook/react';

addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

addParameters({
//	viewMode: 'docs',
//	docs: {
//	  container: DocsContainer,
//	  page: DocsPage,
//	},
	options: {
		storySort: {
			order: [
			'Welcome',
			'Lumino',
			'JupyterLab',
			'IPyWidgets',
			'Material UI',
			'VDOM',
			'Nteract',
			]
    },
	},
});

const req = require.context('./../src', true, /.(story|stories).(js|jsx|ts|tsx|mdx)$/);

configure(req, module);
