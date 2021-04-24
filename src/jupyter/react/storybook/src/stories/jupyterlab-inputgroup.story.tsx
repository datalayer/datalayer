import React from 'react';

import { InputGroup } from '@jupyterlab/ui-components';

export default {
  title: 'JupyterLab/InputGroup',
  id: 'jupyterlab-input-group-id',
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
};

export const InputGroupStory = () => {
    return  <InputGroup
      disabled={false}
      large={true}
      leftIcon="filter"
      placeholder="Filter histogram..."
    />
};
InputGroupStory.story = {
  name: 'Input Group',
  parameters: {
    docs: {
      storyDescription: 'This Example demonstrates react hooks working inside stories. Go team! 🚀',
    },
  },
};
