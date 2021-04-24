[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Webpack Extension

- [localhost:3001](http://localhost:3001)
- [localhost:3002](http://localhost:3002)
- [localhost:3000](http://localhost:3000)
- [localhost:4000](http://localhost:4000)

- https://medium.com/@JayKariesch/migrating-module-federation-from-webpack-5-0-0-beta-16-to-webpack-5-0-0-beta-21-16ee1d1ef5a8
- https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534

Support of dynamic remotes: Beta 16 has some capability, but it wasn’t enjoyable and not straight forward. In this release, we have created a simple pattern that offers all capabilities. But in a completely dynamic manner. The initialization stage lets you connect dynamic remotes to share scopes at runtime.

```js
function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}
```
