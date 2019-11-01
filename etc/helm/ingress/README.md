[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Nginx Ingress Helm Chart

+ [Ingress Nginx](https://kubernetes.github.io/ingress-nginx).
+ [Ingress Nginx Deploy](https://kubernetes.github.io/ingress-nginx/deploy).

+ [Nginx Ingress Helm Chart](https://github.com/helm/charts/tree/master/stable/nginx-ingress).
+ [Ingress Nginx Help Deploy](https://kubernetes.github.io/ingress-nginx/deploy/#using-helm).

+ [Cloud Provider AWS](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#aws).
+ [aws.go](https://github.com/kubernetes/cloud-provider-aws/blob/master/pkg/cloudprovider/providers/aws/aws.go).
+ [Resuse existing ELB?](https://github.com/kubernetes/ingress-nginx/issues/3777).
+ [Services of type LoadBalancer and Multiple Ingress Controllers](https://docs.giantswarm.io/guides/services-of-type-loadbalancer-and-multiple-ingress-controllers).

```bash
#  --set controller.scope.namespace=nginx-ingress
helm install stable/nginx-ingress \
  --name k8s-nginx \
  --set controller.stats.enabled=true \
  --set controller.scope.namespace=ingress-nginx
```

```bash
NAME:   k8s-nginx
LAST DEPLOYED: Sun Dec 31 17:49:01 2017
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME                                DATA  AGE
k8s-nginx-nginx-ingress-controller  1     1s

==> v1/Service
NAME                                        TYPE          CLUSTER-IP      EXTERNAL-IP  PORT(S)                     AGE
k8s-nginx-nginx-ingress-controller-metrics  ClusterIP     10.105.203.178  <none>       9913/TCP                    1s
k8s-nginx-nginx-ingress-controller          LoadBalancer  10.99.170.231   <pending>    80:32686/TCP,443:32271/TCP  1s
k8s-nginx-nginx-ingress-controller-stats    ClusterIP     10.109.250.74   <none>       18080/TCP                   1s
k8s-nginx-nginx-ingress-default-backend     ClusterIP     10.97.66.223    <none>       80/TCP                      1s

==> v1beta1/Deployment
NAME                                     DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
k8s-nginx-nginx-ingress-controller       1        1        1           0          1s
k8s-nginx-nginx-ingress-default-backend  1        1        1           0          1s

==> v1/Pod(related)
NAME                                                      READY  STATUS             RESTARTS  AGE
k8s-nginx-nginx-ingress-controller-5d4979dd7-4fzdg        0/2    ContainerCreating  0         1s
k8s-nginx-nginx-ingress-default-backend-868998f7c6-dhqqb  0/1    ContainerCreating  0         1s

NOTES:
The nginx-ingress controller has been installed.
It may take a few minutes for the LoadBalancer IP to be available.
You can watch the status by running 'kubectl --namespace default get services -o wide -w k8s-nginx-nginx-ingress-controller'
```

An example Ingress that makes use of the controller:

```yaml
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: nginx
    name: example
    namespace: foo
  spec:
    rules:
      - host: www.example.com
        http:
          paths:
            - backend:
                serviceName: exampleService
                servicePort: 80
              path: /
    # This section is only required if TLS is to be enabled for the Ingress.
    tls:
        - hosts:
            - www.example.com
          secretName: example-tls
```

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

```yaml
W  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls
```

```bash
kubectl get pods --all-namespaces -l app=nginx-ingress --watch
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-8dcfb95b9-kvm9g   1/1       Running   0          7m
```

```bash
POD_NAMESPACE=default
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app=nginx-ingress -o jsonpath={.items[0].metadata.name})
kubectl exec -it $POD_NAME -n $POD_NAMESPACE --container nginx-ingress-controller -- /nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:    0.9.0
  Build:      git-6816630
  Repository: https://github.com/kubernetes/ingress-nginx
-------------------------------------------------------------------------------
```

## Nginx Ingress Helm Chart

https://github.com/helm/charts/tree/master/stable/nginx-ingress

[nginx-ingress](https://github.com/kubernetes/ingress-nginx) is an Ingress controller that uses ConfigMap to store the nginx configuration.

To use, add the `kubernetes.io/ingress.class: nginx` annotation to your Ingress resources.

```console
helm install stable/nginx-ingress
```

## Introduction

This chart bootstraps an nginx-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites
  - Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/nginx-ingress
```

The command deploys nginx-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the nginx-ingress chart and their default values.

Parameter | Description | Default
--- | --- | ---
`controller.name` | name of the controller component | `controller`
`controller.image.repository` | controller container image repository | `quay.io/kubernetes-ingress-controller/nginx-ingress-controller`
`controller.image.tag` | controller container image tag | `0.10.2`
`controller.image.pullPolicy` | controller container image pull policy | `IfNotPresent`
`controller.config` | nginx ConfigMap entries | none
`controller.hostNetwork` | If the nginx deployment / daemonset should run on the host's network namespace. Do not set this when `controller.service.externalIPs` is set and `kube-proxy` is used as there will be a port-conflict for port `80` | false
`controller.defaultBackendService` | default 404 backend service; required only if `defaultBackend.enabled = false` | `""`
`controller.electionID` | election ID to use for the status update | `ingress-controller-leader`
`controller.extraEnvs` | any additional environment variables to set in the pods | `{}`
`controller.ingressClass` | name of the ingress class to route through this controller | `nginx`
`controller.scope.enabled` | limit the scope of the ingress controller | `false` (watch all namespaces)
`controller.scope.namespace` | namespace to watch for ingress | `""` (use the release namespace)
`controller.extraArgs` | Additional controller container arguments | `{}`
`controller.kind` | install as Deployment or DaemonSet | `Deployment`
`controller.tolerations` | node taints to tolerate (requires Kubernetes >=1.6) | `[]`
`controller.affinity` | node/pod affinities (requires Kubernetes >=1.6) | `{}`
`controller.minReadySeconds` | how many seconds a pod needs to be ready before killing the next, during update | `0`
`controller.nodeSelector` | node labels for pod assignment | `{}`
`controller.podAnnotations` | annotations to be added to pods | `{}`
`controller.replicaCount` | desired number of controller pods | `1`
`controller.minAvailable` | minimum number of available controller pods for PodDisruptionBudget | `1`
`controller.resources` | controller pod resource requests & limits | `{}`
`controller.lifecycle` | controller pod lifecycle hooks | `{}`
`controller.service.annotations` | annotations for controller service | `{}`
`controller.publishService.enabled` | if true, the controller will set the endpoint records on the ingress objects to reflect those on the service | `false`
`controller.publishService.pathOverride` | override of the default publish-service name | `""`
`controller.service.clusterIP` | internal controller cluster service IP | `""`
`controller.service.externalIPs` | controller service external IP addresses. Do not set this when `controller.hostNetwork` is set to `true` and `kube-proxy` is used as there will be a port-conflict for port `80` | `[]`
`controller.service.externalTrafficPolicy` | If `controller.service.type` is `NodePort` or `LoadBalancer`, set this to `Local` to enable [source IP preservation](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport) | `"Cluster"`
`controller.service.healthCheckNodePort` | If `controller.service.type` is `NodePort` or `LoadBalancer` and `controller.service.externalTrafficPolicy` is set to `Local`, set this to [the managed health-check port the kube-proxy will expose](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport). If blank, a random port in the `NodePort` range will be assigned | `""`
`controller.service.loadBalancerIP` | IP address to assign to load balancer (if supported) | `""`
`controller.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported) | `[]`
`controller.service.targetPorts.http` | Sets the targetPort that maps to the Ingress' port 80 | `80`
`controller.service.targetPorts.https` | Sets the targetPort that maps to the Ingress' port 443 | `443`
`controller.service.type` | type of controller service to create | `LoadBalancer`
`controller.service.nodePorts.http` | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 80 | `""`
`controller.service.nodePorts.https` | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 443 | `""`
`controller.livenessProbe.initialDelaySeconds` | Delay before liveness probe is initiated | 10
`controller.livenessProbe.periodSeconds` | How often to perform the probe | 10
`controller.livenessProbe.timeoutSeconds` | When the probe times out | 5
`controller.livenessProbe.successThreshold` | Minimum consecutive successes for the probe to be considered successful after having failed. | 1
`controller.livenessProbe.failureThreshold` | Minimum consecutive failures for the probe to be considered failed after having succeeded. | 3
`controller.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated | 10
`controller.readinessProbe.periodSeconds` | How often to perform the probe | 10
`controller.readinessProbe.timeoutSeconds` | When the probe times out | 1
`controller.readinessProbe.successThreshold` | Minimum consecutive successes for the probe to be considered successful after having failed. | 1
`controller.readinessProbe.failureThreshold` | Minimum consecutive failures for the probe to be considered failed after having succeeded. | 3
`controller.stats.enabled` | if true, enable "vts-status" page & Prometheus metrics | `false`
`controller.stats.service.annotations` | annotations for controller stats service | `{}`
`controller.stats.service.clusterIP` | internal controller stats cluster service IP | `""`
`controller.stats.service.externalIPs` | controller service stats external IP addresses | `[]`
`controller.stats.service.loadBalancerIP` | IP address to assign to load balancer (if supported) | `""`
`controller.stats.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported) | `[]`
`controller.stats.service.type` | type of controller stats service to create | `ClusterIP`
`controller.customTemplate.configMapName` | configMap containing a custom nginx template | `""`
`controller.customTemplate.configMapKey` | configMap key containing the nginx template | `""`
`controller.headers` | configMap key:value pairs containing the [custom headers](https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers) for Nginx | `{}`
`controller.updateStrategy` | allows setting of RollingUpdate strategy | `{}`
`defaultBackend.name` | name of the default backend component | `default-backend`
`defaultBackend.image.repository` | default backend container image repository | `k8s.gcr.io/defaultbackend`
`defaultBackend.image.tag` | default backend container image tag | `1.3`
`defaultBackend.image.pullPolicy` | default backend container image pull policy | `IfNotPresent`
`defaultBackend.extraArgs` | Additional default backend container arguments | `{}`
`defaultBackend.tolerations` | node taints to tolerate (requires Kubernetes >=1.6) | `[]`
`defaultBackend.affinity` | node/pod affinities (requires Kubernetes >=1.6) | `{}`
`defaultBackend.nodeSelector` | node labels for pod assignment | `{}`
`defaultBackend.podAnnotations` | annotations to be added to pods | `{}`
`defaultBackend.replicaCount` | desired number of default backend pods | `1`
`defaultBackend.minAvailable` | minimum number of available default backend pods for PodDisruptionBudget | `1`
`defaultBackend.resources` | default backend pod resource requests & limits | `{}`
`defaultBackend.service.annotations` | annotations for default backend service | `{}`
`defaultBackend.service.clusterIP` | internal default backend cluster service IP | `""`
`defaultBackend.service.externalIPs` | default backend service external IP addresses | `[]`
`defaultBackend.service.loadBalancerIP` | IP address to assign to load balancer (if supported) | `""`
`defaultBackend.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported) | `[]`
`defaultBackend.service.type` | type of default backend service to create | `ClusterIP`
`rbac.create` | If true, create & use RBAC resources | `false`
`rbac.serviceAccountName` | ServiceAccount to be used (ignored if rbac.create=true) | `default`
`revisionHistoryLimit` | The number of old history to retain to allow rollback. | `10`
`statsExporter.name` | name of the Prometheus metrics exporter component | `stats-exporter`
`statsExporter.image.repository` | Prometheus metrics exporter container image repository | `sophos/nginx-vts-exporter`
`statsExporter.image.tag` | Prometheus metrics exporter image tag | `v0.6`
`statsExporter.image.pullPolicy` | Prometheus metrics exporter image pull policy | `IfNotPresent`
`statsExporter.endpoint` | path at which Prometheus metrics are exposed | `/metrics`
`statsExporter.extraArgs` | Additional Prometheus metrics exporter container arguments | `{}`
`statsExporter.metricsNamespace` | namespace used for metrics labeling | `nginx`
`statsExporter.statusPage` | URL of "vts-stats" page exposed by controller | `http://localhost:18080/nginx_status/format/json`
`statsExporter.resources` | Prometheus metrics exporter resource requests & limits | `{}`
`statsExporter.service.annotations` | annotations for Prometheus metrics exporter service | `{}`
`statsExporter.service.clusterIP` | cluster IP address to assign to service | `""`
`statsExporter.service.externalIPs` | Prometheus metrics exporter service external IP addresses | `[]`
`statsExporter.service.loadBalancerIP` | IP address to assign to load balancer (if supported) | `""`
`statsExporter.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported) | `[]`
`statsExporter.service.servicePort` | Prometheus metrics exporter service port | `9913`
`statsExporter.service.targetPort` | Prometheus metrics exporter target port | `9913`
`statsExporter.service.type` | type of Prometheus metrics exporter service to create | `ClusterIP`
`tcp` | TCP service key:value pairs | `{}`
`udp` | UDP service key:value pairs | `{}`

```console
$ helm install stable/nginx-ingress --name my-release \
    --set controller.stats.enabled=true
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/nginx-ingress --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
