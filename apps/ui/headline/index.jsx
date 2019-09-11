import React from 'react';

// const Headline = () => (
//   <h1>Hello Lerna + React</h1>
// )

const Headline = React.createElement('div', null,
  React.createElement('h1', null, 'Hello Lerna2')
)

export default Headline
