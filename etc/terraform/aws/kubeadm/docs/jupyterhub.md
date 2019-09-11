# JupyterHub

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
  https:
    enabled: true
    type: offload
    hosts:
      - HOSTNAME
  service:
    labels:
      dns: 'route53'
    targetPorts:
      http: tcp
      https: ssl
    annotations:
      nginx.ingress.kubernetes.io/ssl-redirect: 'true'
      nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
      nginx.ingress.kubernetes.io/proxy-read-timeout: '3600'
      nginx.ingress.kubernetes.io/proxy-send-timeout: '3600'
      service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:ap-northeast-2:AWS_ACCOUNT_ID:certificate/CERTIFICATE_ID
      service.beta.kubernetes.io/aws-load-balancer-backend-protocol: 'tcp'
      service.beta.kubernetes.io/aws-load-balancer-ssl-ports: '443'
      service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'
      domainName: 'HOSTNAME'
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
singleuser:
  image:
    name: jupyter/scipy-notebook
    tag: 82d1d0bf0867
  serviceAccountName: default
  cloudMetadata:
    enabled: true
  extraAnnotations:
    iam.amazonaws.com/role: kubeadm_role
  profileList:
    - display_name: 'Big Data environment.'
      description: 'If you want the additional bells and whistles'.
      image: datalayer/sparklab:0.0.1
      kubespawner_override:
#        service_account: 'default'
        cpu_limit: 3
        cpu_guarantee: 1
        mem_limit: '2G'
        mem_guarantee: '512M'
        extra_resource_limits: {}
    - display_name: 'Minimal environment.'
      description: 'To avoid too much bells and whistles: Python.'
      default: true
      kubespawner_override:
        image: jupyter/scipy-notebook:82d1d0bf0867
        lifecycle_hooks:
          postStart:
            exec:
              command:
                - "sh"
                - "-c"
                - >
                  gitpuller https://github.com/data-8/materials-fa17
auth:
  type: dummy
  dummy:
    password: 'p123'
  whitelist:
    users:
      - u123
ingress:
  enabled: 'true'
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
  - HOSTNAME
""" > ./jupyterhub.yaml
helm upgrade \
  --install jupyterhub \
  jupyterhub/jupyterhub \
  --namespace jupyterhub \
  --timeout 99999 \
  --version 0.8.2 \
  --values jupyterhub.yaml
helm ls
k get pods -A
```
