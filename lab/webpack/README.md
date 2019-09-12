[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Webpack Lab

[Webpack](https://webpack.js.org) based boilerplate for producing libraries (input: ES6, output: universal library).

Base code taken from https://github.com/krasimir/webpack-library-starter.

We demonstrate here that a webpack javascript can import 3rd party libraries (in this case lodash) and can be run as a single file from:

+ Node.js
+ Java

Requirements: `node.js`, `yarn` (or `npm`), `jdk 8+`.

```bash
# Install Dependencies.
yarn install
# Build a Webpack.
yarn build
# Run the tests
yarn test
# Run from Node.js.
node lib/@datalayer/datalab-webpack.min.js
# Build Java.
javac InvokeNodeModule.java
# Run from Java.
java InvokeNodeModule
```

Running from `Node.js` will write in the console.

```
n { _name: 'Bobby' }
n { _name: 'Sammy' }
4.17.11
Hello, javascript!
Received: javascript - lodash version: 4.17.11
```

Running from `Java` will write in the console.

```
[object Object]
[object Object]
4.17.11
Hello, javascript!
Received: javascript - lodash version: 4.17.11
```

> Please note that the Nashorn scripting engine is used when running with Java and that as preliminary requirement the `nashorn-polyfill.js` must be evaluated.

TODO.

+ Fix `yarn repl`.
+ Fix `invocable.invokeFunction("sayHello"...`.
+ Support visual components such as `react.js` (if needed).
