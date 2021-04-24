<div align="center" style="text-align: center">
  <a href="https://datalayer.io">
    <img alt="Datalayer" src="https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-square.png" width="60" />
  </a>
  <h1 >Datalayer</h1>
  <h3>Reproducible Data Papers and Courses</h3>
</div>

Datalayer is a Data Science Platform for **teachers and students** to create **reproducible data papers and courses**.

A `Sharebook` is available as a standalone [React.js](https://reactjs.org) application from our CDN (Content Delivery Network), or if you prefer shipped in [JupyterLab](https://github.com/jupyterlab/jupyterlab), [Visual Studio Code](https://github.com/microsoft/vscode), [Electron](https://github.com/electron/electron), [Android](https://www.android.com) or [iPhone](https://www.apple.com/iphone). You can also reuse the React.js components in your custom application to deliver your own data analysis experience to your users. The Notebook can deployed on its own on your local laptop, or can be integrated in broader cluster.

For the pure cluster infrastructure side-of-things, we provide `Kuber`, an easy way to spin Kubernetes clusters on your favorite cloud. `Kuber` also alllows you to schedule the cluster size, providing substantial cost gains. For now, Google Cloud with [GKE](https://cloud.google.com/kubernetes-engine) clusters are supported and will also provide support for Amazon [EKS](https://aws.amazon.com/eks) clusters.

The Datalayer services run on a [JupyterHub](https://github.com/jupyterhub/jupyterhub) instance deployed on a [Kubernetes](https://kubernetes.io) cluster. Datalayer provides a `Jupyter Operator`to ease the management of the Jupyter components. An `Administration` user interface allows devops to control `JupyterHub` to transform the user journey as a truly collaborative and easy experience with the following libraries.

- `Auth` to secure and provide identity, permissions and auditing with OAuth, OpenID Connect or Kerberos.
- `Federation` to connect users with each-other and collaborate in a secure way.
- `Environments` to forge tailored-made environments with software and datasets you need. This service is based on [Conda Store](https://github.com/quansight/conda-store).
- `Library` to provide a catalog of datasets and analysis.
- `JupyterPool` to instantly bind and access a living pool of `Environments` connected with the `Library`.

## 🧐 How does Datalayer compare with other Platforms?

Datalayer is more than `Infrastructure`. We provide truly `collaborative experience on data`, while most of the other platforms just provide utilities to spin-up notebooks.

As a enterprise, you may be interested to deploy it into your organisation. We empower **scientists** to collaborate, analyse datasets and securely share their results. Our platform is fully open-source from where you can pick any component you like and integrate it in your systems. Read more on our [web site for the enteprise](https://datalayer.io/enterprise). You can see Datalayer as a composable **GitHub for Data** or **Medium for Data Stories** adapatable to your business.

## 💫 How can I join?

You can create a **free account** on the [Datalayer public website](https://datalayer.io) and learn to love data by **doing** in a **collaborative way** at **Internet scale**.

- Level up you Data knowledge through interactive **exercises** and **examples**.
- Users get on-line **Jupyter notebooks** with **collaboration** and **sharing** capabilities.
- The notebooks are **reproducible**, **scalable** and **secured**.
- Write and share **data papers** with a mix of **math**, **code** and **medias**.
- Use real **datasets** and **code** to make your paper **reproducible**.
- Access a searchable **library** with reusable community artifacts like **datasets**, **papers**, **exercises**, **courses** and **dashboards**.

## ✨ Why should I write a Data Paper?

With the Datalayer Sience Platform, you write and publish papers so other users can **understand** and **reuse** them in a **variety of use case**.

1.  **Open Science.**

    Make scientific research (including publications, datasets, and code) and its dissemination accessible to all levels of an inquiring society, amateur or professional.

1.  **Data Storytelling.**

    Communicate information, tailored to a specific audience, with a compelling narrative. It is the last ten feet of your data analysis and arguably one of the most important aspect.

1.  **Data Journalism.**

     Reflect the increased interaction between content producers (journalist) and several other fields such as design, computer science and statistics. Communicate information, tailored to a specific audience, with a compelling narrative. It is the last ten feet of your data analysis and arguably one of the most important aspect.

1.  **and more...**

    It is really on what you want to achieve with Data and Code.

## 😍 Inside this Monorepo?

This **monorepo** contains all you need to build up `DSP`, the `Datalayer Science Platform`. You will find here the source code, documentation, scripts and configuration under an [open source license](LICENSE).

## ❤️ Become a Contributor

[![Join the chat at https://gitter.im/datalayer/datalayer](https://badges.gitter.im/datalayer/datalayer.svg)](https://gitter.im/datalayer/datalayer)

We welcome you to contribute to this repository. Follow the guidelines to [setup your development environment](https://github.com/datalayer/datalayer/blob/main/src/README.md). You can also read more about Datalayer architecture on the [documentation site](https://datalayer.readthedocs.io).

Datalayer ♥ You!
