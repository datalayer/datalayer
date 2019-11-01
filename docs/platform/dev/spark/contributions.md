---
title: Spark Contributions
---

# Spark Contributions

<table class="bodyTable table table-striped table-hover" border="1">

  <tbody>

  <tr class="a">
    <td style="text-align: center;"><b>DESCRIPTION</b></td>
    <td style="text-align: center;"><b>ISSUE</b></td>
    <td style="text-align: center;"><b>REPOSITORY</b></td>
    <td style="text-align: center;"><b>DOC</b></td>
    <td style="text-align: center;"><b>PR</b></td>
    <td style="text-align: center;"><b>STATUS</b></td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>History Server for Kubernetes</td>
    <td><a href="https://issues.apache.org/jira/browse/SPARK-24179">SPARK-24179</a></td>
    <td></td>
    <td></td>
    <td></td>
    <td>OPEN</td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Integration Tests for Client Mode</td>
    <td><a href="https://issues.apache.org/jira/browse/SPARK-23146">SPARK-23146</a></td>
    <td>
      <a href="https://github.com/datalayer-contrib/spark-integration/tree/client-mode dev">datalayer-contrib:client-mode</a>
    </td>
    <td>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark-integration/pull/45">#45</a>
    </td>
    <td>OPEN</td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Client Mode</td>
    <td>
      <a href="https://issues.apache.org/jira/browse/SPARK-23146">SPARK-23146</a>
    </td>
    <td>
      Apache: <a href="https://github.com/datalayer-contrib/spark/tree/k8s-client-mode">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <br/>
      Apache Fork: <a href="https://github.com/datalayer-contrib/spark/tree/client-mode-datalayer-dev">datalayer-contrib:client-mode-datalayer-dev</a>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/userdocs/pull/25">[WIP] Describe Spark submit in relation with client-mode (+ hadoop and dependencies)</a></td>
    <td>
      <a href="https://github.com/apache/spark/pull/21748">palantir:k8s-client-mode</a>
      <br/>
      <br/>
      <a href="https://github.com/apache/spark/pull/20451">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <br/>
      <a href="https://github.com/apache-spark-on-k8s/spark/pull/456">#456</a>
    </td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Kubernetes code for configuring driver/executor pods to use consistent and cleaner abstraction
    </td>
    <td>
      <a href="https://issues.apache.org/jira/browse/SPARK-22839">SPARK-22839</a>
    </td>
    <td>
      <a href="https://github.com/mccheah/spark/tree/spark-22839-incremental">mccheah:spark-22839-incremental</a>
    </td>
    <td>
      <a href="https://docs.google.com/document/d/1XPLh3E2JJ7yeJSDLZWXh_lUcjZ1P0dy9QeUEyxIlfak/edit">Initial framework for pod construction architecture refactor</a>
    </td>
    <td>
      <a href="https://github.com/apache/spark/pull/20910">#20910</a>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Steps Orchestrator based on the Chain Pattern
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark/issues/604">#604</a>
    </td>
    <td>
    </td>
    <td>
      Example: Include and exclude driver and executor steps (with etcd example)
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [INTEGRATION_TESTS] Random failure of tests (java.net.ConnectException)
    </td>
    <td>
      https://github.com/apache-spark-on-k8s/spark/issues/571
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Use a pre-installed Minikube instance for integration tests.
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark/pull/521">#521</a>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Application names should support whitespaces and special characters
    </td>
    <td>
      https://github.com/apache-spark-on-k8s/spark/issues/551
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [ShuffleService] Need for spark.local.dir?
    </td>
    <td>
      https://github.com/apache-spark-on-k8s/spark/issues/549
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Spark UI
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
      When Spark runs, it gives you a useful user interface to manage and monitor your jobs and configuration (` echo http://localhost:4040`).
      <br/>
      This can be enhanced with a specific tab for Kubernetes
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Docker Logging Handler</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/docker-logging-handler">datalayer-contrib:spark/docker-logging-handler</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/576">#576</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Disable ssl test for staging server if current classpath contains the jetty shaded classes</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/jetty-sslcontext">datalayer-contrib:spark/jetty-sslcontext</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/issues/463">#463</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/573">#573</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Develop and build Kubernetes modules in isolation without the other Spark modules</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/kubernetes-parent">datalayer-contrib:spark/kubernetes-parent</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/570">#570</a></td>
    <td>OPEN</td>
  </tr>

  <tr class="a">
    <td>Add libc6-compat in spark-bash to allow parquet</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/libc6-compat">datalayer-contrib:spark/libc6-compat</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/issues/504">#504</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/550">#550</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Add documentation for Zeppelin with Spark on Kubernetes</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark-docs/tree/zeppelin">datalayer-contrib:spark-docs/zeppelin</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/userdocs/pull/21">#21</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [WIP] [SPARK-19552] [BUILD] Upgrade Netty version to 4.1.8 final 
    </td>
    <td>
    </td>
    <td>
      https://github.com/apache/spark/pull/16888
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  </tbody>

</table>
