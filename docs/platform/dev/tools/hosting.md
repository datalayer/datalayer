---
title: Hosting
---

# Hosting

## Netlify

[Netlify](https://www.netlify.com): Build, deploy, and manage modern web projects.

## Now

+ [Now at Zeit](https://zeit.co/now).
+ [Blog](https://zeit.co/blog/now-2).
+ [Docs](https://zeit.co/docs/v2).
+ [API Docs](https://zeit.co/docs/api/v2).
+ [GitHub](https://github.com/zeit/now-cli).
+ [Examples](https://zeit.co/examples).
+ [Account](https://zeit.co/account).

```bash
# Install from https://github.com/zeit/now-cli/releases
yarn add global next@canary
now login
```

```bash
# Alias URL
# - Create a CNAME now.jupyterlab.datalayer.io to alias.zeit.co.
# - Add the TXT returned record.
now alias https://jupyterlab-now-15r2gzhf5.now.sh now.jupyterlab.datalayer.io
```

```bash
# Deploy.
# Append _src to see logs, input and outputs.
now
```

Node.js example.

```bash
mkdir test1 && cd test1
cat <<EOF > index.js
module.exports = (req, res) => {
  res.end('Hello from Node.js on Now 2.0!');
};
EOF
cat <<EOF > now.json
{
    "version": 2,
    "name": "nodejs",
    "builds": [
        { "src": "*.js", "use": "@now/node" }
    ]
}
EOF
now
```

```
    "routes": [
        { "src": "/(.*)", "dest": "/index.html" }
    ]
```

React.js example.

```bash
npx create-react-app test1 && cd test1
cat <<EOF > now.json
{
    "version": 2,
    "name": "test1",
    "builds": [
        { "src": "package.json", "use": "@now/static-build" }
    ],
    "routes": [
        {"src": "^/static/(.*)", "dest": "/static/$1"},
        {"src": ".*", "dest": "/index.html"}
    ]
}
EOF
now
```

## Surge

https://surge.sh
