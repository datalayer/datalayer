[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Source Development

The `Endgame` details for this iteration are tracked in the linked issues.

- Begin: Monday December 9, 2019.
- End: Sunday November 15, 2019.

Below is a summary of the top level play items. See the [legend](#legend) for interpretation.

## Datalayer DSP

- 🏃 [Port DSP on Material UI](https://github.com/datalayer/datalayer/issues/2)
- 💪 [Port DSP on K8S](https://github.com/datalayer/datalayer/issues/18)
- 💪 [Index and Search Data Papers](https://github.com/datalayer/datalayer/issues/3)
- 🔵 [Deploy DSP PROD on K8S](https://github.com/datalayer/datalayer/issues/20)
- 🔵 [Implement Datalayer Control GUI + API](https://github.com/datalayer/datalayer/issues)
- 🔵 [Implement Datalayer Data GUI + API](https://github.com/datalayer/datalayer/issues)
- 🔵 [Implement Datalayer Explorer GUI + API](https://github.com/datalayer/datalayer/issues)
- 🔵 [Implement Datalayer Studio GUI + API](https://github.com/datalayer/datalayer/issues)

## Jupyter Control

- 🔵 [Implement Jupyter Control](https://github.com/datalayer/datalayer/issues/19)
- ✋ [Implement Jupyter HTTP Proxy ExtensionApp](https://github.com/datalayer/datalayer/issues)

## Jupyter Pool

- 🔵 [Implement Jupyter Kernel Pool](https://github.com/datalayer/datalayer/issues/19)
- 🔵 [Implement Jupyter Server Pool](https://github.com/datalayer/datalayer/issues/19)

## Jupyter Storybook

- 🔵 [Implement Jupyter Storybook](https://github.com/datalayer/datalayer/issues)

## Jupyter Server

- 🏃 [Ensure extension apps read config from file and cli](https://github.com/jupyter/jupyter_server/pull/149)
- 👀 [Simple Extension Example](https://github.com/jupyter/jupyter_server/pull/117)
- ⌛ [Link server extension subcommands to main app](https://github.com/jupyter/jupyter_server/pull/157)
- ⌛ [Document jupyter_server](https://github.com/jupyter/jupyter_server/issues/131)
- 💪 [Kernel Providers](https://github.com/jupyter/jupyter_server/pull/112)
- 💪 [Transition to Kernel Provider model for kernel management](https://github.com/jupyter/jupyter_server/issues/90)
- ⌛ [Release jupyter_server 0.2.0](https://github.com/jupyter/jupyter_server/issues/144)
- ⌛ [Release jupyter_server 0.3.0 with kernel_mgmt 0.5.0](https://github.com/jupyter/jupyter_server/issues/138)
- 🔵 [Make frontends discoverable and add a frontend alias](https://github.com/jupyter/jupyter_server/issues/121)
- 🔵 [Pluggable user token creation/validation](https://github.com/jupyter/jupyter_server/issues/50)
- ✋ [Add a Session Management infrastructure for extension developers](https://github.com/jupyter/jupyter_server/issues/122)
- 🗺️ [Jupyter Server Roadmap](https://github.com/jupyter/jupyter_server/issues/127)

## Jupyter Kernel Management

- 💪 [Fix KernelApp](https://github.com/takluyver/jupyter_kernel_mgmt/issues/40)
- 👀 [Parameterized Kernel Launch](https://github.com/jupyter/enhancement-proposals/pull/46)
+ 👀 [Proposal for new kernel providers mechanism](https://github.com/jupyter/enhancement-proposals/pull/45)

## Jupyter Kernel Provider

- ✋ [De-gateway the Providers](https://github.com/gateway-experiments/remote_kernel_provider/issues/19)
- 💄 [Support Conda as Kernl Provider](https://github.com/anaconda-platform/nb_conda_kernels/issues/151)

## JupyterLab

- 👀 [JupyterLab as Server Extension](https://github.com/jupyterlab/jupyterlab/pull/7416)
- 👀 [JupyterLab Server as Server Extension](https://github.com/jupyterlab/jupyterlab_server/pull/79)
- 💪 [POC Kernel Launch Parameters](https://github.com/datalayer/datalayer/issues/24)
- ⚫️ [Upgrade to React to 16.9](https://github.com/jupyterlab/jupyterlab/pull/7504)

## 👔 JupyterLab Themes

- 🏄 [Material UI Themes for JupyterLab](https://github.com/datalayer/datalayer/issues)

## JupyterLab Examples

- 💪 [Upgrade from Phasphor to Lumino](https://github.com/jtpio/jupyterlab-extension-examples/issues)
- 🗺️ [Create JupyterLab Extension Examples](https://github.com/datalayer/datalayer/issues/21)

## Visual Studio Code

- ✋ [Implement Jupyter Code ExtensionApp](https://github.com/datalayer/datalayer/issues/27)
- ⚪️ [yarn web should support extension](https://github.com/microsoft/vscode/issues/84901)

## Voila

- 👀 [Voila as an ExtensionApp](https://github.com/voila-dashboards/voila/pull/492)

## Jupyter Notebook

- 💪 [Config shim initial support ](https://github.com/zsailer/nbclassic/pull/3)
- 💪 [Kernel name is not displayed with Kernel Manager](https://github.com/zsailer/nbclassic/issues/2)

## Legend

| Mark | Description |
| ---- | ----------- |
| ⛳ | Goal |
| 🗺️ | Roadmap |
| 🚀 | Ready to be released |
| 🔥 | This is burning, hurry up to fix |
| 🏃 | Work in progress |
| 💪 | Stretch it |
| 👀 | Review is needed |
| 💄 | Nice to have |
| ⏰ | Timeboxed |
| 💡 | Innovation |
| 😄 | Have fun |
| 🏄 | Spike |
| 🐛 | Bug |
| ✋ | Blocked task |
| 🔴 | Do not merge |
| 🔵 | Under discussion within the team |
| ⚪️ | Looking for help |
| ⚫️ | More investigation required to remove uncertainty |
| 🔄 | Do it again |
| ⌛ | On hold, meaning it is paused |
