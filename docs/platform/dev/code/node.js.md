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
