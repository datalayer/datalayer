[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# React Boilerplate

```bash
cd $DLAHOME/lab/apps/react-boilerplate && \
  yarn install && \
  yarn start
```

```bash
cd $DLAHOME/lab/apps/react-boilerplate && \
  yarn install && \
  yarn build && \
  serve -s build
```

Created with.

```bash
npx create-react-app@next react-boilerplate --scripts-version=react-scripts-ts@4.0.8 && \
  cd react-boilerplate && \
  yarn add node-sass office-ui-fabric-react @uifabric/icons && \
  mv src/App.css src/App.scss && \
cat <<EOF > src/App.tsx
import * as React from 'react'

import './App.scss'

import { initializeIcons } from '@uifabric/icons'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'

import logo from './logo.svg'

// initializeIcons('https://my.cdn.com/path/to/icons/');
initializeIcons()

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <DefaultButton
              text='See Button'
              primary={ true }
              href='#'
            />
        </header>
      </div>
    )
  }
}
export default App;
EOF
yarn start
yarn run eject
cat <<EOF > index.html
<html>
<head>
<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css">
<head>
<body class="ms-Fabric" dir="ltr">
  <span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>
</body>
</html>
EOF
```
