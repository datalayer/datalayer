import React from 'react';

import { HTMLSelect } from '@jupyterlab/ui-components';

export default {
  title: 'JupyterLab/Select',
  component: HTMLSelect,
  id: 'jupyterlab-select-id',
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
};

export const SelectStory = () => {
  return <HTMLSelect
    options={[
      'option1', 
      'option2'
    ]}
  />
};
SelectStory.story = {
  name: 'Select',
  parameters: {
    docs: {
      storyDescription: 'HTML Select.',
    },
  },
};
