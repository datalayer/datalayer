---
title: JupyterLab Performance
---

# JupyterLab Performance

## Improvements

- We would like quansight to write a proposal for this.
- While we are ok if this is behind a flag for 2.2, we'd like to remove it form experimental by 3.x so that we are not the only users (and we think many others would want this).
- If the direction this takes changes substantially from our recommendation (which is fine if its better for lab and solves our problem), we should chat before moving forward to confirm. We do not want to spend our efforts moving more of lab away form lumio to react, and would rather do the cheaper thing.

## Notes

- Intersect observer made a huge difference, because it makes it proportional to screen size.
- Need to make it work for 2.x
- Key examples
  - 10k lines of text output from one cells
    - Notebook had an extension that limited the output... for a number of characters.
  - 1000 cells with 100 data tables with 5k rows
  - 100 cells with 10 lines of cells
- They implemented intersection observer for their outputs, it's still slow.
