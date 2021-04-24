import { lazy } from 'react';

const lazyImport = (
  filename: string,
) => (
  lazy(() => (
     import(`${filename}`)
  ))
);

export default lazyImport;
