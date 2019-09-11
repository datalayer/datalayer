# Datalayer Notebook Documentation

> This site contains documentation on the Jupyter components used to build the [Datalayer Platform](https://datalayer.io).

Project [Jupyter](https://jupyter.org) exists to develop open-source software, open-standards, and services for interactive computing across dozens of programming languages.

{% tabs jupyter="Jupyter", jupyterlab="JupyterLab", jupyterhub="JupyterHub", jupyterpool="JupyterPool", dashboard="Dashboard", apps="Applications" %}

{% content "jupyter" %}

The core of Jupyter.

* [Welcome](/index.md)
* [Jupyter](/jupyter/index.md)
  * [Community](/jupyter/community.md)
  * [Nomenclature](/jupyter/nomenclature.md)
  * [Core](/jupyter/core.md)
  * [Configuration](/jupyter/config.md)
  * [Format](/jupyter/format.md)
  * [Convert](/jupyter/convert.md)
  * [Viewer](/jupyter/viewer.md)
  * [Diff and Merge](/jupyter/dime.md)
  * [Docker Stack](/jupyter/docker-stack.md)
  * [Repo to Docker](/jupyter/repo2docker.md)
  * [Test](/jupyter/test.md)
  * [Proxy](/jupyter/proxy.md)
  * [Extensions](/jupyter/extensions.md)
  * [Develop](/jupyter/dev.md)
  * [Troubleshoot](/jupyter/troubleshoot.md)

{% content "jupyterlab" %}

JupyterLab is the next-generation web-based user interface for Project Jupyter.

* [JupyterLab](/jupyterlab/index.md)
  * [Renderers](/jupyterlab/renderers.md)
  * [Workspaces](/jupyterlab/workspaces.md)
  * [Themes](/jupyterlab/themes.md)
  * [Shortcuts](/jupyterlab/shortcuts.md)
  * [Rich Context](/jupyterlab/rich-context.md)
  * [Slides](/jupyterlab/slides.md)
  * [Phosphor.js](/jupyterlab/phosphor.js.md)
  * [IpyWidget](/jupyterlab/ipywidget.md)
  * [React.js](/jupyterlab/react.js.md)
  * [Develop](/jupyterlab/dev.md)
  * [Test](/jupyterlab/test.md)
  * [Extensions](/jupyterlab/extensions.md)
  * [Develop Extensions](/jupyterlab/dev-extensions.md)

{% content "jupyterhub" %}

JupyterHub, a multi-user version of the notebook designed for companies, classrooms and research labs.

* [JupyterHub](/jupyterhub/index.md)
  * [Tutorial](/jupyterhub/tutorial.md)
  * [Configuration](/jupyterhub/config.md)
  * [Proxy](/jupyterhub/proxy.md)
  * [SSL](/jupyterhub/ssl.md)
  * [Authenticators](/jupyterhub/auth.md)
  * [Spawners](/jupyterhub/spawners.md)
  * [Services](/jupyterhub/services.md)
  * [User Environment](/jupyterhub/user-env.md)
  * [Git Puller](/jupyterhub/gitpuller.md)
  * [Database](/jupyterhub/database.md)
  * [API](/jupyterhub/api.md)
  * [UI](/jupyterhub/ui.md)
  * [Lab Extension](/jupyterhub/lab.md)
  * [Develop](/jupyterhub/dev.md)
  * [Operation](/jupyterhub/operation.md)
  * [Upgrade](/jupyterhub/upgrade.md)
  * [Deploy in Docker](/jupyterhub/deploy-docker.md)
  * [Deploy on The Littlest](/jupyterhub/deploy-the-littlest.md)
  * [Deploy on Kubernetes](/jupyterhub/deploy-k8s.md)

{% content "jupyterpool" %}

A Resource Pool for Jupyter Notebooks and Kernels.

* [JupyterPool](/jupyterpool/index.md)
  * [Client](/jupyterpool/client.md)
  * [Console](/jupyterpool/console.md)
  * [QtConsole](/jupyterpool/qtconsole.md)
  * [Notebook Server](/jupyterpool/server-notebook.md)
  * [Server](/jupyterpool/server.md)
  * [Lab Server](/jupyterpool/server-lab.md)
  * [JupyterHub](/jupyterpool/jupyterhub.md)
  * [BinderHub](/jupyterpool/binderhub.md)
  * [Server to Gateway](/jupyterpool/server-to-gateway.md)
  * [Kernel Gateway](/jupyterpool/gateway-kernel.md)
  * [Enterprise Gateway](/jupyterpool/gateway-enterprise.md)
  * [Gateway Experiments](/jupyterpool/gateway-experiments.md).
  * [Pixie Gateway](/jupyterpool/gateway-pixie.md)

Details on Kernels Management and Configuration.

* [Kernels](/kernels/index.md)
  * [Magic](/kernels/magic.md)
  * [Manager](/kernels/manager.md)
  * [Multi](/kernels/multi.md)
  * [Sharing](/kernels/sharing.md)
  * [IPython](/kernels/ipython.md)
  * [R](/kernels/R.md)
  * [Spark](/kernels/spark.md)
  * [Kubeflow](/kernels/kubeflow.md)

{% content "dashboard" %}

* [Dashboard](/dashboard/index.md)
  * [Voila](/dashboard/voila.md)
  * [Dash](/dashboard/dash.md)
  * [PyViz](/dashboard/pyviz.md)

{% content "apps" %}

Applications built on top of Jupyter.

* [Applications](/apps/index.md)
  * [Education](/apps/edu.md)
  * [App Mode](/apps/app-mode.md)
  * [TheBeLab](/apps/thebelab.md)
  * [Juniper](/apps/juniper.md)
  * [Iodide](/apps/iodide.md)
  
Visualization toolkits.

* [Visualization](/viz/index.md)
  * [React.js](/viz/react.js.md)
  * [Plot.ly](/viz/plot.ly.md)
  * [Vega](/viz/vega.md)
  * [Altair](/viz/altair.md)
  * [D3.js](/viz/d3.js.md)
  * [Python](/viz/python.md)
  * [R](/viz/R.md)
  * [Java](/viz/java.md)
  * [Scala](/viz/scala.md)
  * [WISP](/viz/wisp.md)
  * [Plugins](/viz/plugins.md)

BinderHub, run your code in the cloud.

* [BinderHub](/binderhub/index.md)

Papermill, parameterize, execute, and analyze Jupyter Notebooks.

* [Papermill](/papermill/index.md)
  * [Paperboy](/papermill/paperboy.md)
  * [Scrapbook](/papermill/scrapbook.md)
  * [Bookstore](/papermill/bookstore.md)

Nteract, interactive computing suite.

* [Nteract](/nteract/index.md)
  * [Commuter](/nteract/commuter.md)
  * [Jupyter](/nteract/jupyter.md)
  * [Kernels](/nteract/kernels.md)
  * [Data Explorer](/nteract/data-explorer.md)
  * [Desktop](/nteract/desktop.md)
  * [Hydrogen](/nteract/hydrogen.md)
  * [Ion](/nteract/ion.md)
  * [Play](/nteract/play.md)
  * [VDOM](/nteract/vdom.md)

Other Jupyter components and projects from the overall ecosystem.

* [Others](/msc/index.md)
  * [Visual Studio Code](/msc/visual-studio-code.md)
  * [Spyder](/msc/spyder.md)

{% endtabs %}
