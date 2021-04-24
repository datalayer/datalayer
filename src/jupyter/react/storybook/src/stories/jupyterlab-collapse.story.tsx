import React, { useState } from 'react';

import { Collapse, Button } from '@jupyterlab/ui-components';

export default {
  title: 'JupyterLab/Collapse',
  component: Collapse,
  id: 'jupyterlab-collapse-id',
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
}

export const CollapseStory = () => {
  const [open, setOpen] = useState(false);
  return <>
    <Button onClick={() => setOpen(!open)}>
        {open ? "Hide" : "Show"} collapse
    </Button>
    <Collapse isOpen={open}>
      <pre>
        Dummy Text.
        Dummy Text.
        Dummy Text.
        Dummy Text.
      </pre>
    </Collapse>
  </>
};

CollapseStory.story = {
  name: 'Collapse',
  parameters: {
    docs: {
      storyDescription: 'This Example demonstrates react hooks working inside stories. Go team! 🚀',
    },
  },
}
