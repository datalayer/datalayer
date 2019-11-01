import * as React from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import '../../styles/Styles.scss'

const K8S_TEXT = `
<a href='https://kubernetes.io' target="_blank">Kubernetes</a> is a fast growing open-source platform 
which provides container-centric infrastructure. 
Conceived by Google in 2014, and leveraging over a decade of experience running 
containers at scale internally, it is one of the fastest moving projects on 
GitHub with 1000+ contributors and 40,000+ commits. Kubernetes has first class 
support on Google Cloud Platform, Amazon Web Services, and Microsoft Azure.
Kubernetes is an open-source platform designed to automate deploying, scaling, 
and operating application containers, and is widely used by organizations across the 
world for a variety of large-scale solutions including serving, stateful applications, 
and increasingly - data science and ETL workloads.
`

const HELM_TEXT = `
<a href='https://github.com/kubernetes/helm' target="_blank">Helm</a> is a tool for managing Kubernetes charts.
Charts are packages of pre-configured Kubernetes resources. Use Helm to:
<ul>
  <li>Find and use popular software packaged as Kubernetes charts.</li>
  <li>Share your own applications as Kubernetes charts.</li>
  <li>Create reproducible builds of your Kubernetes applications.</li>
  <li>Intelligently manage your Kubernetes manifest files.</li>
  <li>Manage releases of Helm packages.</li>
</ul>
`

const RELEASE_TEXT = `
<strong>Datalayer</strong><br/>
<br/>
Author: Eric Charles<br/>
`
export default class Highlights extends React.Component<any, any> {

  public constructor(props) {
    super(props)
    this.state = {
      showAll: props.showAll,
      panelTitle: '',
      panelImg: '',
      panelText: {
        __html: ''
      },
      showPanel: false
    }
  }


  private showPanel = (e: React.MouseEvent<HTMLAnchorElement>, 
    title: string,
    img: string,
    text: string): void => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      panelTitle: title,
      panelImg: img,
      panelText: {
        __html: text
      },
      showPanel: true
    })
  }

  private closePanel = (): void => {
    this.setState({
      panelTitle: '',
      panelImg: '',
      panelText: {
        __html: ''
      },
      showPanel: false 
    })
  }

  private renderFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton
          onClick={ this.closePanel }
          style={ { 'marginRight': '8px' } }
        >
          Close
        </PrimaryButton>
      </div>
    )
  }

  public render() {

    return (

      <div className='ms-scaleDownIn100'>

        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this.closePanel }
          headerText={ this.state.panelTitle }
          closeButtonAriaLabel='Close'
          onRenderFooterContent={ this.renderFooterContent }
        >
          <img src={this.state.panelImg} width='100px' />
          <br/>
          <div dangerouslySetInnerHTML={this.state.panelText}/>
        </Panel>

        <div className="featured">

          <span className={ "featuredTitle" }>Highlights on Open Source</span>
          <span className={ "featuredDescription" }>Datalayer develops and integrates a variety of tools to help you create an experience that delights collaborative Big Data Scientists.</span>

          { (this.state.showAll == "true") ?

          <span>
            <ul className={ "featureList" } aria-label='List of highlighted features'>
              <li className="text-center">
                <a href='https://github.com/datalayer' target="_blank">
                  <img src={ '/img/datalayer/datalayer-square.png' } alt='' />
                  <span>Datalayer</span>
                </a>
              </li>
              <li className="text-center">
                <a href="" target="_blank" onClick={(e) => this.showPanel(e, 'Datalayer 0.0.2 #OMalley', '/img/releases/0.0.2-omalley.png', RELEASE_TEXT)}>
                  <img src={ '/img/releases/0.0.2-omalley.png' } alt='' />
                  <span><br/></span>
                  <span>0.0.2 #OMalley</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://github.com/datalayer' target="_blank">
                  <img src={ '/img/explorer/explorer.svg' } alt='' />
                  <span>Explorer</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://github.com/datalayer' target="_blank">
                  <img src={ '/img/kuber/kuber.svg' } alt='' />
                  <span>Kuber</span>
                </a>
              </li>
            </ul>
            <ul className={ "featureList" } aria-label='List of highlighted features'>
            <li className="text-center">
                <a href="" target="_blank" onClick={(e) => this.showPanel(e, 'Kubernetes', '/img/kubernetes/kubernetes_logo.png', K8S_TEXT)}>
                  <img src={ '/img/kubernetes/kubernetes_logo.png' } alt='' />
                  <span>Kubernetes</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://www.apache.org' target="_blank">
                  <img src={ '/img/apache/apache.svg' } alt='' />
                  <span>Apache Foundation</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://www.linuxfoundation.org' target="_blank">
                  <img src={ '/img/linux/linux-foundation.svg' } alt='' />
                  <span>Linux Foundation</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://jupyter.org' target="_blank">
                  <img src={ '/img/jupyter/jupyter.svg' } alt='' />
                  <span>Jupyter</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://www.docker.com' target="_blank">
                  <img src={ '/img/docker/docker.svg' } alt='' />
                  <span>Docker</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://aws.amazon.com' target="_blank">
                  <img src={ '/img/aws/aws-w.svg' } alt='' />
                  <span>Amazon AWS</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://developers.google.com/apis-explorer' target="_blank">
                  <img src={ '/img/google/google-icon.svg' } alt='' />
                  <span>Google APIs</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://cloud.google.com' target="_blank">
                  <img src={ '/img/google/google-cloud.svg' } alt='' />
                  <span>Google Cloud</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://azuremarketplace.microsoft.com/en-us/marketplace/api/datalayer.datalayer-notebook' target="_blank">
                  <img src={ '/img/azure/azure.svg' } alt='' />
                  <span>Microsoft Azure</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://reactjs.org' target="_blank">
                  <img src={ '/img/reactjs/reactjs.svg' } alt='' />
                  <span>React.js</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://spark.apache.org' target="_blank">
                  <img src={ '/img/spark/apache-spark-w.svg' } alt='' />
                    <span>Apache Spark</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://hadoop.apache.org' target="_blank">
                  <img src={ '/img/hadoop/apache-hadoop.svg' } alt='' />
                  <span>Apache Hadoop</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://twitter.com' target="_blank">
                  <img src={ '/img/twitter/twitter.svg' } alt='' />
                  <span>Twitter</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://github.com/datalayer' target="_blank">
                  <img src={ '/img/github/github-octocat.svg' } alt='' />
                  <span>Github</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://www.office.com' target="_blank">
                  <img src={ '/img/microsoft/microsoft-office-365.svg' } alt='' />
                  <span>Office 365</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://hbase.apache.org' target="_blank">
                  <img src={ '/img/hbase/apache-hbase-square.svg' } alt='' />
                  <span>Apache HBase</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://lucene.apache.org/solr/' target="_blank">
                  <img src={ '/img/solr/apache-solr-white.svg' } alt='' />
                  <span>Apache Solr</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://janusgraph.org' target="_blank">
                  <img src={ '/img/janusgraph/janusgraph.png' } alt='' />
                  <span>JanusGraph</span>
                </a>
              </li>
              <li className="text-center">
                <a href="" target="_blank" onClick={(e) => this.showPanel(e, 'Helm', '/img/helm/helm.svg', HELM_TEXT)}>
                  <img src={ '/img/helm/helm.svg' } alt='' />
                  <span>Helm</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://www.tensorflow.org' target="_blank">
                  <img src={ '/img/tensorflow/tensorflow.svg' } alt='' />
                  <span>Tensorflow</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://airflow.incubator.apache.org' target="_blank">
                  <img src={ '/img/airflow/airflow-logo.png' } alt='' />
                  <span>Airflow</span>
  {/*
  While traditional environments like YARN-based hadoop clusters have used Oozie, newer data and ML pipelines built on Kubernetes are increasingly using Airflow for orchestrating and scheduling DAGs. Adding native Kubernetes support into Airflow would increase the viable use cases for airflow, add a mature and well understood workflow scheduler to the Kubernetes ecosystem, and create possibilities for improved security and robustness within airflow in the future.
  */}
                </a>
              </li>
            </ul>
          </span>
          
          :

          <span>
            <ul className={ "featureList" } aria-label='List of highlighted features'>
              <li className="text-center">
                <a href="" target="_blank" onClick={(e) => this.showPanel(e, 'Kubernetes', '/img/kubernetes/kubernetes_logo.png', K8S_TEXT)}>
                <img src={ '/img/kubernetes/kubernetes_logo.png' } alt='' />
                  <span>Kubernetes</span>
                </a>
              </li>
              <li className="text-center">
                <a href='http://www.apache.org' target="_blank">
                  <img src={ '/img/apache/apache.svg' } alt='' />
                  <span>Apache Foundation</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://www.linuxfoundation.org' target="_blank">
                  <img src={ '/img/linux/linux-foundation.svg' } alt='' />
                  <span>Linux Foundation</span>
                </a>
              </li>
              <li className="text-center">
                <a href='https://aws.amazon.com' target="_blank">
                  <img src={ '/img/aws/aws-w.svg' } alt='' />
                  <span>Amazon AWS</span>
                </a>
              </li>
            </ul>
          </span>
          }

          <span className={ "trademark" }>All trademarks are the property of their respective owners.</span>

        </div>

      </div>

    )

  }

}
