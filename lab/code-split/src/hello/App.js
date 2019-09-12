import * as React from 'react';
import * as Loadable from 'react-loadable';
import Loading from './Loading';
import fakeDelay from './fakeDelay';
import path from 'path';

let LoadableExample = Loadable({
  loader: () => fakeDelay(5000).then(() => import('./Example')),
  loading: Loading
});

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <LoadableExample/>
    </div>
  )
}
