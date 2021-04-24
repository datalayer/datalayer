import { lazy } from 'react';

const lazyImport = (
  mod: string,
) => (
  lazy(() => (
     import(`${mod}`)
  ))
);

export default lazyImport;
