---
title: Static Site
---

# Static Site

## Gitbook

[Gitbook](https://github.com/GitbookIO/gitbook).

## Hugo

[Hugo](https://gohugo.io).

```bash
hugo new site quickstart
cd quickstart
git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
hugo new posts/my-first-post.md 
echo 'theme = "ananke"' >> config.toml
hugo server --disableFastRender
# hugo server -D
open http://localhost:1313
```

```bash
baseURL = "https://example.org"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "ananke"
```

## MkDocs

[MkDocs](https://www.mkdocs.org).

Examples

+ https://github.com/floydhub/floyd-docs
+ https://kind.sigs.k8s.io https://github.com/kubernetes-sigs/kind/tree/master/site

```bash
pip install mkdocs
mkdocs --version
mkdocs new my-project
cd my-project
mkdocs serve
```

```bash
# Add to your mkdocs.yml: theme: 'material'
pip install mkdocs-material
```

```bash
# Add to your mkdocs.yml: theme: 'alabaster'
# pip install mkdocs-alabaster
pip install git+https://github.com/notpushkin/mkdocs-alabaster
```

## Ghost

[Ghost](https://github.com/tryghost/ghost).

[Ghost Site](https://ghost.org).

[Ghost Marketplace](https://marketplace.ghost.org).

## Docusaurus

[Docusaurus](https://docusaurus.io).

## Documentalist

[Documentalist Site](https://palantir.github.io/documentalist).

[Documentalist](https://github.com/palantir/documentalist).

## Gatsby.js

[Gatsby.js](https://www.gatsbyjs.org).

[Showcase](https://www.gatsbyjs.org/showcase).

[Starters](https://www.gatsbyjs.org/starters).

[Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog).

[gatsby-starter-ggt-material-ui-blog](https://github.com/greatgatsbyjsthemes/gatsby-starter-ggt-material-ui-blog).

[gatsby-starter-uifabric](https://github.com/microsoft/gatsby-starter-uifabric).

## Vuepress

[Vuepress](https://vuepress.vuejs.org).

## Others

+ https://github.com/phenomic/phenomic
+ https://docsify.js.org
+ https://github.com/lord/slate
+ https://middlemanapp.com
+ https://github.com/jnordberg/wintersmith
+ https://github.com/jaredpalmer/razzle
+ https://github.com/pedronauck/docz
+ https://neocities.org

## Examples

+ https://github.com/expo/expo/tree/master/docs
