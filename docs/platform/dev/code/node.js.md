---
title: Node.js
---

# Node.js

> [Node.js](https://nodejs.org) is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. [Wikipedia](https://nodejs.org) 

```bash
# HTTP Server example.
cat <<EOF > server.js
var http = require('http');
http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(8080);
EOF
echo http://localhost:8080
node server.js
```

## Registry

+ https://help.github.com/en/github/managing-packages-with-github-package-registry/configuring-npm-for-use-with-github-package-registry

## Yarn

+ https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin#resolving-duplicate-packages-in-your-bundle
+ https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d
