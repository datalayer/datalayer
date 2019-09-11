/*
 * Copyright 2017 Datalayer (https://datalayer.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.hadoop.net

import java.util.concurrent.Executors
import javax.annotation.Nullable
import javax.annotation.concurrent.GuardedBy

import scala.collection.mutable
import scala.collection.JavaConversions._

import com.google.common.net.InetAddresses
import com.google.common.util.concurrent.ThreadFactoryBuilder

import io.fabric8.kubernetes.client.Config
import io.fabric8.kubernetes.client.ConfigBuilder
import io.fabric8.kubernetes.client.DefaultKubernetesClient
import io.fabric8.kubernetes.client.KubernetesClient
import io.fabric8.kubernetes.client.utils.HttpClientUtils

import okhttp3.Dispatcher
import okhttp3.OkHttpClient

import org.apache.commons.cli.BasicParser
import org.apache.commons.cli.Option
import org.apache.commons.cli.Options
import org.apache.commons.cli.ParseException
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.apache.commons.net.util.SubnetUtils
import org.apache.hadoop.conf.Configuration
import org.apache.log4j.BasicConfigurator
import org.apache.log4j.Level
import org.apache.log4j.Logger

/**
  * A namenode topology plugin mapping pods to cluster nodes for a K8s configured with pod CIDR.
  *
  * For each k8s pod, determines a network path with three components. The full path would look like:
  *
  * RACK-NAME '/' NODE-NAME '/' POD-HOST
  *
  * , where NODE-NAME is the cluster node that the pod is running on.
  *
  * To comply with this, datanodes will be also put the node name into the same hierarchy.
  *
  * RACK-NAME '/' NODE-NAME '/' NODE-NAME
  *
  * This way, the namenode will see the datanode and pods in the same node are closer than otherwise.
  *
  * The resolve method below only returns the first parts for input entries.
  *
  * Note this three level hierarchy requires NetworkTopologyWithNodeGroup to be used in namenode.
  * For details on installation instruction, see README.md at the project directory.
  */
@SuppressWarnings(Array("unused")) object PodCIDRToNodeMapping {

  private val DEFAULT_NETWORK_LOCATION = NetworkTopology.DEFAULT_RACK + NetworkTopologyWithNodeGroup.DEFAULT_NODEGROUP
  private val log: Log = LogFactory.getLog(classOf[PodCIDRToNodeMapping])

  private def getNetworkPathDir(node: String): String = NetworkTopology.DEFAULT_RACK + NodeBase.PATH_SEPARATOR_STR + node

  /**
    * Looks up a node that runs the pod with a given pod IP address.
    *
    * Each K8s node runs a number of pods. K8s pods have unique virtual IP addresses. In kubenet,
    * each node is assigned a pod IP subnet distinct from other nodes, which can be denoted by
    * a pod CIDR. For instance, node A can be assigned 10.0.0.0/24 while node B gets 10.0.1.0/24.
    * When a pod has an IP value, say 10.0.1.10, it should match node B.
    *
    * The key lookup data structure is the podSubnetToNode list below. The list contains 2-entry
    * tuples.
    *  - The first entry is netmask values of pod subnets. e.g. ff.ff.ff.00 for /24.
    * (We expect only one netmask key for now, but the list can have multiple entries to support
    * general cases)
    *  - The second entry is a map of a pod network address, associated with the netmask, to the
    * cluster node. e.g. 10.0.0.0 -> node A and 10.0.1.0 -> node B.
    */
  private object PodCIDRLookup {

    private[net] def fetchPodCIDR(kubernetesClient: KubernetesClient): PodCIDRToNodeMapping.PodCIDRLookup = {

      var nodeNames = Set.empty[String]
      val netmaskToNetworkToNode = mutable.Map.empty[String, Map[String, String]]

      val nodes = kubernetesClient.nodes.list

      for (node <- nodes.getItems) {

        val nodeName = node.getMetadata.getName

        @Nullable val podCIDR = node.getSpec.getPodCIDR

        if (podCIDR == null || podCIDR.length == 0) {
          log.warn("Could not get pod CIDR for node " + nodeName)
        }

        if (log.isDebugEnabled) log.debug("Found pod CIDR " + podCIDR + " for node " + nodeName)

        nodeNames += nodeName

        var subnetInfo: SubnetUtils#SubnetInfo = null
        try {
          subnetInfo = new SubnetUtils(podCIDR).getInfo
        }
        catch {
          case e: IllegalArgumentException => {
            log.debug(e)
          }
        }

        val netmask = subnetInfo.getNetmask
        val networkAddress = subnetInfo.getNetworkAddress
        var networkToNode = netmaskToNetworkToNode.get(netmask)
        (networkToNode == null) match {
          case true => {
            networkToNode = Some(Map[String, String]())
            netmaskToNetworkToNode += (netmask -> networkToNode.get)
          }
          case _ =>
        }
        var networkToNodeSome = networkToNode.get
        networkToNodeSome += (networkAddress -> nodeName)
      }

      buildLookup(nodeNames, netmaskToNetworkToNode.toMap)

    }

    private def buildLookup(nodeNames: Set[String], netmaskToNetworkToNode: Map[String, Map[String, String]]): PodCIDRToNodeMapping.PodCIDRLookup = {

      val builder = mutable.ListBuffer.empty[(PodCIDRToNodeMapping.Netmask, Map[PodCIDRToNodeMapping.NetworkAddress, String])]

      for (entry <- netmaskToNetworkToNode) {

        val netmask = new PodCIDRToNodeMapping.Netmask(entry._1)
        val networkToNodeBuilder = mutable.Map.empty[PodCIDRToNodeMapping.NetworkAddress, String]

        for (networkToNode <- entry._2) {
          networkToNodeBuilder += (new PodCIDRToNodeMapping.NetworkAddress(networkToNode._1) -> networkToNode._2)
        }
        builder += Tuple2(netmask, networkToNodeBuilder.toMap)
      }

      new PodCIDRToNodeMapping.PodCIDRLookup(builder.toList, nodeNames)

    }

  }

  private class PodCIDRLookup (
        // See the class comment above.
        podSubnetToNode: List[(PodCIDRToNodeMapping.Netmask, Map[PodCIDRToNodeMapping.NetworkAddress, String])],
        // K8s cluster node names.
        nodeNames: Set[String]
      ) {

    def this() {
      this(List[(PodCIDRToNodeMapping.Netmask, Map[PodCIDRToNodeMapping.NetworkAddress, String])](), Set[String]())
    }

    private[net] def containsNode(nodeName: String): Boolean = nodeNames.contains(nodeName)

    private[net] def findNodeByPodIP(podIP: String): String = {

      for (entry <- podSubnetToNode) {

        val netmask: PodCIDRToNodeMapping.Netmask = entry._1
        val networkToNode = entry._2

        // Computes the subnet that results from the netmask applied to the pod IP.
        var podSubnetToCheck: SubnetUtils#SubnetInfo = null
        try {
          podSubnetToCheck = new SubnetUtils(podIP, netmask.getValue).getInfo
        }
        catch {
          case e: IllegalArgumentException => {
            log.warn(e)
          }
        }
        val networkAddress: String = podSubnetToCheck.getNetworkAddress
        val nodeName = networkToNode.get(new PodCIDRToNodeMapping.NetworkAddress(networkAddress))

        (nodeName) match {
          case Some(x) => return nodeName.get
          case _ =>
        }

      }

      return DEFAULT_NETWORK_LOCATION

    }

  }

  private class Netmask private[net](val netmask: String) {

    private[net] def getValue: String = netmask

    override def equals(o: Any): Boolean = {
      if (this.equals(o)) return true
      if (o == null || (getClass ne o.getClass)) return false
      val netmask1: PodCIDRToNodeMapping.Netmask = o.asInstanceOf[PodCIDRToNodeMapping.Netmask]
      netmask == netmask1.netmask
    }

    override def hashCode: Int = netmask.hashCode

  }

  private class NetworkAddress private[net](networkAddress: String) {

    private[net] def getValue = networkAddress

    override def equals(o: Any): Boolean = {
      if (this.equals(o)) return true
      if (o == null || (getClass ne o.getClass)) return false
      val that = o.asInstanceOf[PodCIDRToNodeMapping.NetworkAddress]
      networkAddress == that.getValue
    }

    override def hashCode: Int = networkAddress.hashCode
  }

  /*
   * For debugging purpose.
   */
  @throws[ParseException]
  def main(args: Array[String]) {

    val options = new Options
    val nameOption = new Option("n", true, "Name to resolve")
    nameOption.setRequired(true)
    options.addOption(nameOption)

    val parser = new BasicParser
    val cmd = parser.parse(options, args)
    BasicConfigurator.configure()

    Logger.getRootLogger.setLevel(Level.DEBUG)

    val plugin = new PodCIDRToNodeMapping(new Configuration())
    val conf = new Configuration
    plugin.setConf(conf)

    val nameToResolve = cmd.getOptionValue(nameOption.getOpt)
    val networkPathDirs = plugin.resolve(List(nameToResolve))
    log.info("Resolved " + nameToResolve + " to " + networkPathDirs)

  }

}

class PodCIDRToNodeMapping(conf: Configuration) extends AbstractDNSToSwitchMapping {

  @GuardedBy("this")
  @Nullable private var kubernetesClient: KubernetesClient = null
  @GuardedBy("this")
  @Nullable private var podCIDRLookup: PodCIDRToNodeMapping.PodCIDRLookup = null

  def resolve(names: java.util.List[String]): java.util.List[String] = {
    
    val networkPathDirList = mutable.ListBuffer.empty[String]

    for (name <- names) {
      val networkPathDir: String = resolveName(name)
      networkPathDirList += networkPathDir
    }

    if (PodCIDRToNodeMapping.log.isDebugEnabled) PodCIDRToNodeMapping.log.debug("Resolved " + names + " to " + networkPathDirList)
    networkPathDirList.toList

  }

  def reloadCachedMappings() {
    // Do nothing.
  }

  def reloadCachedMappings(list: java.util.List[String]) {
    // Do nothing.
  }

  private def resolveName(name: String): String = {
    val networkPathDir: String = resolveClusterNode(name)
    if (!PodCIDRToNodeMapping.DEFAULT_NETWORK_LOCATION.equals(networkPathDir)) return networkPathDir
    resolvePodIP(name)
  }

  private def resolveClusterNode(clusterNodeName: String): String = {
    if (InetAddresses.isInetAddress(clusterNodeName)) return PodCIDRToNodeMapping.DEFAULT_NETWORK_LOCATION
    val hostName: String = clusterNodeName.split("\\.")(0)
    val lookup: PodCIDRToNodeMapping.PodCIDRLookup = getOrFetchPodCIDR
    if (lookup.containsNode(clusterNodeName) || lookup.containsNode(hostName)) return PodCIDRToNodeMapping.getNetworkPathDir(hostName)
    PodCIDRToNodeMapping.DEFAULT_NETWORK_LOCATION
  }

  private def resolvePodIP(podIP: String): String = {
    if (!InetAddresses.isInetAddress(podIP)) return PodCIDRToNodeMapping.DEFAULT_NETWORK_LOCATION
    val lookup: PodCIDRToNodeMapping.PodCIDRLookup = getOrFetchPodCIDR
    val nodeName: String = lookup.findNodeByPodIP(podIP)
    if (nodeName.length > 0) return PodCIDRToNodeMapping.getNetworkPathDir(nodeName)
    PodCIDRToNodeMapping.DEFAULT_NETWORK_LOCATION
  }

  private def getOrFetchPodCIDR: PodCIDRToNodeMapping.PodCIDRLookup = {
    if (podCIDRLookup != null) {
      // TODO. Support refresh.
      return podCIDRLookup
    }
    podCIDRLookup = PodCIDRToNodeMapping.PodCIDRLookup.fetchPodCIDR(getOrCreateKubernetesClient)
    if (PodCIDRToNodeMapping.log.isDebugEnabled) PodCIDRToNodeMapping.log.debug("Fetched pod CIDR per node and built a lookup" + podCIDRLookup)
    podCIDRLookup
  }

  private def getOrCreateKubernetesClient: KubernetesClient = {
    if (kubernetesClient != null) return kubernetesClient
    // Disable the ping thread that is not daemon, in order to allow the main thread to shut down
    // upon errors. Otherwise, the namenode will hang indefinitely.
    val config: Config = new ConfigBuilder().withWebsocketPingInterval(0).build
    // Use a Dispatcher with a custom executor service that creates daemon threads. The default
    // executor service used by Dispatcher creates non-daemon threads.
    val httpClient: OkHttpClient = HttpClientUtils.createHttpClient(config).newBuilder.dispatcher(new Dispatcher(Executors.newCachedThreadPool(new ThreadFactoryBuilder().setDaemon(true).setNameFormat("k8s-topology-plugin-%d").build))).build
    kubernetesClient = new DefaultKubernetesClient(httpClient, config)
    kubernetesClient
  }

}
